const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/usuario'); // tu modelo Usuario
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('873135702363-2rt7j8aunns3ubbnkpb2dj3s9g41gfjp.apps.googleusercontent.com');

router.post('/google/token', async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: '873135702363-2rt7j8aunns3ubbnkpb2dj3s9g41gfjp.apps.googleusercontent.com'
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const nombre = payload.name;

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ email, nombre, password: 'google' });
    }

    const token = jwt.sign({ id: user.id }, 'tu_clave_secreta', { expiresIn: '1h' });
    res
      .cookie('auth_token', token, { httpOnly: true, sameSite: 'strict' })
      .cookie('XSRF-TOKEN', 'xsrf_token', { httpOnly: false, sameSite: 'strict' })
      .json({ success: true, user: { id: user.id, email, nombre } });
  } catch (error) {
    console.error('Error con Google Sign-In:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
});

// Ruta para iniciar login con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback que Google redirige después del login
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Aquí puedes crear el token y redirigir al frontend
    const token = jwt.sign({ id: req.user.id }, 'tu_clave_secreta', { expiresIn: '1h' });

    // Enviar token en cookies
    res
      .cookie('auth_token', token, { httpOnly: true, sameSite: 'strict' })
      .cookie('XSRF-TOKEN', 'xsrf_token', { httpOnly: false, sameSite: 'strict' })
      .redirect('http://localhost:5173'); // o alguna vista protegida
  });


// Registro local
router.post('/register', async (req, res) => {
  const { email, nombre, password } = req.body;

  if (!email || !nombre || !password) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  try {
    // Verificar si el usuario ya existe
    let existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    // Crear usuario nuevo (el password se hashea en el hook beforeCreate)
    const newUser = await User.create({ email, nombre, password });

    // Generar token JWT
    const token = jwt.sign({ id: newUser.id }, 'tu_clave_secreta', { expiresIn: '1h' });

    // Enviar cookies
    res
      .cookie('auth_token', token, { httpOnly: true, sameSite: 'strict' })
      .cookie('XSRF-TOKEN', 'xsrf_token', { httpOnly: false, sameSite: 'strict' })
      .status(201)
      .json({ success: true, user: { id: newUser.id, email: newUser.email, nombre: newUser.nombre } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;

// routes/usuarios.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

// Ruta protegida
router.get('/perfil',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ mensaje: 'Acceso autorizado', usuario: req.user });
  });

module.exports = router;

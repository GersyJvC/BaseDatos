const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csrf = require('csurf');
const passport = require('./config/passport');

const app = express();

// CORS antes que todo, con credentials para cookies y origin correcto
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

const csrfProtection = csrf({
  cookie: {
    httpOnly: false, // para que el frontend pueda leer la cookie si quiere
    sameSite: 'strict',
  }
});

// Ruta para obtener el token CSRF, con protección csrf para que cree el token y la cookie
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use(passport.initialize());

// Aquí aplica csrfProtection sólo en las rutas POST donde se requiere token
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuarios');

app.use('/api/auth/login', csrfProtection, authRoutes);
app.use('/api/auth/register', csrfProtection, authRoutes);
app.use('/api/usuarios', usuarioRoutes); // rutas protegidas con JWT, no necesitan csrf necesariamente

// Rutas de tu proyecto (sin csrf protection, o la añades si las necesitas)
const personaRoutes = require('./routes/persona');
const docenteRoutes = require('./routes/docente');
const estudanteRoutes = require('./routes/estudante');
const asignaturaRoutes = require('./routes/asignatura');
const inscripcionRoutes = require('./routes/inscripcion');
const contratoRoutes = require('./routes/contrato');

app.use('/api/personas', personaRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/estudantes', estudanteRoutes);
app.use('/api/asignaturas', asignaturaRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/contratos', contratoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

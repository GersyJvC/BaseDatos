const express = require('express');
const app = express();

const personaRoutes = require('./routes/persona');
const docenteRoutes = require('./routes/docente');
const estudanteRoutes = require('./routes/estudante');
const asignaturaRoutes = require('./routes/asignatura');
const inscripcionRoutes = require('./routes/inscripcion');
const contratoRoutes = require('./routes/contrato');

const cors = require('cors');
app.use(cors());

app.use(express.json());

const estudantesRouter = require('./routes/estudante')
app.use('/api/estudante', estudantesRouter)

// Rutas principales
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
const express = require('express');
const app = express();

const personaRoutes = require('./routes/persona');
const docenteRoutes = require('./routes/docente');
const estudanteRoutes = require('./routes/estudante');

app.use(express.json());

app.use('/api/personas', personaRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/estudantes', estudanteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

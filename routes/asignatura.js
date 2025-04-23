const express = require('express');
const router = express.Router();
const { Asignatura, Docente, Estudante } = require('../models');

// Obtener todas las asignaturas con docentes y estudiantes asociados
router.get('/', async (req, res) => {
  try {
    const asignaturas = await Asignatura.findAll({
      include: [
        { model: Docente, as: 'docentes' },  // Incluir docentes
        { model: Estudante, as: 'estudantes' }  // Incluir estudiantes
      ]
    });
    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener asignatura por ID con docentes y estudiantes asociados
router.get('/:id', async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.id, {
      include: [
        { model: Docente, as: 'docentes' },  // Incluir docentes
        { model: Estudante, as: 'estudantes' }  // Incluir estudiantes
      ]
    });

    asignatura
      ? res.json(asignatura)
      : res.status(404).json({ message: 'Asignatura no encontrada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar asignaturas por nombre
router.get('/buscar/nombre/:nombre', async (req, res) => {
  try {
    const asignaturas = await Asignatura.findAll({
      where: { nombre: req.params.nombre },
      include: [
        { model: Docente, as: 'docentes' },  // Incluir docentes
        { model: Estudante, as: 'estudantes' }  // Incluir estudiantes
      ]
    });
    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nueva asignatura
router.post('/', async (req, res) => {
  try {
    const nuevaAsignatura = await Asignatura.create(req.body);
    res.status(201).json(nuevaAsignatura);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Editar asignatura
router.put('/:id', async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.id);
    if (asignatura) {
      await asignatura.update(req.body);
      res.json(asignatura);
    } else {
      res.status(404).json({ message: 'Asignatura no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar asignatura
router.delete('/:id', async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.id);
    if (asignatura) {
      await asignatura.destroy();
      res.json({ message: 'Asignatura eliminada' });
    } else {
      res.status(404).json({ message: 'Asignatura no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener estudiantes inscritos en una asignatura
router.get('/:id/estudantes', async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.id, {
      include: { model: Estudante, as: 'estudantes' }  // Incluir estudiantes
    });

    if (!asignatura) {
      return res.status(404).json({ message: 'Asignatura no encontrada' });
    }

    res.json(asignatura.estudantes);  // Devolver solo los estudiantes
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener docentes que imparten una asignatura
router.get('/:id/docentes', async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.id, {
      include: { model: Docente, as: 'docentes' }  // Incluir docentes
    });

    if (!asignatura) {
      return res.status(404).json({ message: 'Asignatura no encontrada' });
    }

    res.json(asignatura.docentes);  // Devolver solo los docentes
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/asignaturas/:asignaturaId/estudantes/:estudanteId
router.delete('/:asignaturaId/estudantes/:estudanteId', async (req, res) => {
  const { asignaturaId, estudanteId } = req.params;
  try {
    const asignatura = await Asignatura.findByPk(asignaturaId);
    if (!asignatura) return res.status(404).json({ message: 'Asignatura no encontrada' });

    await asignatura.removeEstudante(estudanteId); // Sequelize crea este método por la relación belongsToMany
    res.json({ message: 'Estudiante eliminado de la asignatura' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/asignaturas/:asignaturaId/docentes/:docenteId
router.delete('/:asignaturaId/docentes/:docenteId', async (req, res) => {
  const { asignaturaId, docenteId } = req.params;
  try {
    const asignatura = await Asignatura.findByPk(asignaturaId);
    if (!asignatura) return res.status(404).json({ message: 'Asignatura no encontrada' });

    await asignatura.removeDocente(docenteId); // Sequelize genera este método automáticamente por belongsToMany
    res.json({ message: 'Docente eliminado de la asignatura' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un estudiante a una asignatura
router.post('/:asignaturaId/estudantes/:estudanteId', async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.asignaturaId);
    if (!asignatura) return res.status(404).json({ message: 'Asignatura no encontrada' });

    await asignatura.addEstudante(req.params.estudanteId);
    res.json({ message: 'Estudiante agregado a la asignatura' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un docente a una asignatura
router.post('/:asignaturaId/docentes/:docenteId', async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.asignaturaId);
    if (!asignatura) return res.status(404).json({ message: 'Asignatura no encontrada' });

    await asignatura.addDocente(req.params.docenteId);
    res.json({ message: 'Docente agregado a la asignatura' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

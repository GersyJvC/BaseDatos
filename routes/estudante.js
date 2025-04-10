const express = require('express');
const router = express.Router();
const { Estudante } = require('../models');

// Obtener todos
router.get('/', async (req, res) => {
  try {
    const estudantes = await Estudante.findAll();
    res.json(estudantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener por ID
router.get('/:id', async (req, res) => {
  try {
    const estudante = await Estudante.findByPk(req.params.id);
    estudante ? res.json(estudante) : res.status(404).json({ message: 'Estudante no encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar por nombre
router.get('/buscar/nombre/:nombre', async (req, res) => {
  try {
    const estudiantes = await Estudante.findAll({ where: { Nombre: req.params.nombre } });
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear
router.post('/', async (req, res) => {
  try {
    const nuevoEstudante = await Estudante.create(req.body);
    res.status(201).json(nuevoEstudante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Editar
router.put('/:id', async (req, res) => {
  try {
    const estudante = await Estudante.findByPk(req.params.id);
    if (estudante) {
      await estudante.update(req.body);
      res.json(estudante);
    } else {
      res.status(404).json({ message: 'Estudante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    const estudante = await Estudante.findByPk(req.params.id);
    if (estudante) {
      await estudante.destroy();
      res.json({ message: 'Estudante eliminado' });
    } else {
      res.status(404).json({ message: 'Estudante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

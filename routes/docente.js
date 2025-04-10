const express = require('express');
const router = express.Router();
const { Docente } = require('../models');

// Obtener todos los docentes
router.get('/', async (req, res) => {
  try {
    const docentes = await Docente.findAll();
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener docente por ID
router.get('/:id', async (req, res) => {
  try {
    const docente = await Docente.findByPk(req.params.id);
    docente ? res.json(docente) : res.status(404).json({ message: 'Docente no encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar por nombre
router.get('/buscar/nombre/:nombre', async (req, res) => {
  try {
    const docentes = await Docente.findAll({ where: { nombre: req.params.nombre } });
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear
router.post('/', async (req, res) => {
  try {
    const nuevoDocente = await Docente.create(req.body);
    res.status(201).json(nuevoDocente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Editar
router.put('/:id', async (req, res) => {
  try {
    const docente = await Docente.findByPk(req.params.id);
    if (docente) {
      await docente.update(req.body);
      res.json(docente);
    } else {
      res.status(404).json({ message: 'Docente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    const docente = await Docente.findByPk(req.params.id);
    if (docente) {
      await docente.destroy();
      res.json({ message: 'Docente eliminado' });
    } else {
      res.status(404).json({ message: 'Docente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

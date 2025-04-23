const express = require('express');
const router = express.Router();
const { Estudante, Asignatura, Inscripcion, Docente } = require('../models');

// Obtener todos los estudiantes
router.get('/', async (req, res) => {
  try {
    const estudiantes = await Estudante.findAll({
      include: [{
        model: Inscripcion,
        as: 'inscripciones',
        include: [{
          model: Asignatura,
          as: 'asignatura'
        }]
      }],
      logging: console.log // Para ver la consulta SQL
    });
    res.json(estudiantes); // <- esta línea era el problema
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      stack: error.stack
    });
  }
});


// Obtener estudiante por ID con asignaturas y docentes
router.get('/:id', async (req, res) => {
  try {
    const estudiante = await Estudante.findByPk(req.params.id, {
      include: {
        association: 'asignaturas',
        include: {
          association: 'docentes'
        }
      }
    });

    if (!estudiante) {
      return res.status(404).json({ message: 'Estudante no encontrado' });
    }

    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear estudiante con asignaturas
router.post('/', async (req, res) => {
  const { asignaturas, ...estudanteData } = req.body;

  try {
    const nuevoEstudante = await Estudante.create(estudanteData);

    if (asignaturas && asignaturas.length > 0) {
      await nuevoEstudante.setAsignaturas(asignaturas); // Array de IDs
    }

    const estudianteConAsignaturas = await Estudante.findByPk(nuevoEstudante.id, {
      include: { association: 'asignaturas' }
    });

    res.status(201).json(estudianteConAsignaturas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Editar estudiante
router.put('/:id', async (req, res) => {
  try {
    const estudiante = await Estudante.findByPk(req.params.id);
    if (estudiante) {
      await estudiante.update(req.body);
      res.json(estudiante);
    } else {
      res.status(404).json({ message: 'Estudante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar estudiante
router.delete('/:id', async (req, res) => {
  try {
    const estudiante = await Estudante.findByPk(req.params.id);
    if (estudiante) {
      await estudiante.destroy();
      res.json({ message: 'Estudante eliminado' });
    } else {
      res.status(404).json({ message: 'Estudante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/estudantes/:id/docentes
router.get('/:id/docentes', async (req, res) => {
  try {
    const estudiante = await Estudante.findByPk(req.params.id, {
      include: {
        model: Asignatura,
        as: 'asignaturas',
        include: {
          model: Docente,
          as: 'docentes',
          through: { attributes: [] } // No mostrar la tabla intermedia Contrato
        },
        through: { attributes: [] } // No mostrar la tabla intermedia Inscripcion
      }
    });

    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }

    // Extraer los docentes únicos
    const docentes = [];
    const idsAgregados = new Set();

    for (const asignatura of estudiante.asignaturas) {
      for (const docente of asignatura.docentes) {
        if (!idsAgregados.has(docente.id)) {
          docentes.push(docente);
          idsAgregados.add(docente.id);
        }
      }
    }

    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/estudantes/:id/asignaturas-simples
router.get('/:id/asignaturas', async (req, res) => {
  try {
    const estudiante = await Estudante.findByPk(req.params.id, {
      include: {
        model: Asignatura,
        as: 'asignaturas',
        through: { attributes: [] } // Oculta la tabla intermedia Inscripcion
      }
    });

    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }

    res.json(estudiante.asignaturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;

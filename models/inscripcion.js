'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inscripcion extends Model {
    static associate(models) {
      // No es necesario definir asociaciones aquí porque ya las definiremos en los otros modelos
    }
  }
  Inscripcion.init({
    estudianteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Estudantes',
        key: 'id',
      }
    },
    asignaturaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Asignaturas',
        key: 'id',
      }
    },
    semestre: DataTypes.INTEGER,
    calificacion: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Inscripcion',
  });
  return Inscripcion;
};

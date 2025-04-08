'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoriaEmpleado extends Model {
    static associate(models) {
      this.hasMany(models.Docente, {
        foreignKey: 'categoriaEmpleadoId',
        as: 'docentes'
      });
    }
  }
  CategoriaEmpleado.init({
    nombre: DataTypes.STRING,
    clave: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CategoriaEmpleado',
  });
  return CategoriaEmpleado;
};

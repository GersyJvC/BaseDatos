'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Docente extends Model {
    static associate(models) {
      this.belongsTo(models.CategoriaEmpleado, {
        foreignKey: 'categoriaEmpleadoId',
        as: 'categoria'
      });
    }
  }
  Docente.init({
    numEmpleado: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    categoriaEmpleadoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Docente',
  });
  return Docente;
};

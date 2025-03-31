'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estudante.init({
    Matricula: { 
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Estudante',
  });
  return Estudante;
};
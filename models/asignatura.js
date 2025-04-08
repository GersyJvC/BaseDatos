'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asignatura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Estudante, {
        as: "estudante",
        through: models.Inscripcion,
        foreignKey: "asignaturaid",
    });
  }
  }
  Asignatura.init({
    clave: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    creditos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Asignatura',
  });
  return Asignatura;
};
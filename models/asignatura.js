'use strict';

module.exports = (Sequelize, DataTypes) => {
  const Asignatura = Sequelize.define('Asignatura', {
    clave: {  // Asegúrate de que aquí se use 'clave' en lugar de 'codigo'
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Otras propiedades si las tienes
  }, {
    tableName: 'Asignaturas', // No dejes que sequelize pluralice la tabla
    timestamps: false // Si no estás usando 'createdAt' o 'updatedAt'
  });

  Asignatura.associate = function(models) {
    Asignatura.hasMany(models.Inscripcion, { foreignKey: 'asignaturaId' });
    Asignatura.belongsToMany(models.Estudante, {
      through: 'Inscripcion',
      as: 'estudantes',
      foreignKey: 'asignaturaId',
      otherKey: 'estudianteId'
    });
    
    Asignatura.belongsToMany(models.Docente, {
      through: 'Contrato',
      as: 'docentes', // <- este alias es importante
      foreignKey: 'asignaturaId',
    });
    
  };

  return Asignatura;
};

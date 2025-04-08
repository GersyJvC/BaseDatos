'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Docentes', 'categoriaEmpleadoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'CategoriaEmpleados', // Asegúrate de que este nombre sea correcto
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Docentes', 'categoriaEmpleadoId');
  }
};

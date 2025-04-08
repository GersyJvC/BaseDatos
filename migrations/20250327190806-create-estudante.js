'use strict';

module.exports = {
async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Estudantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Matricula: {
        type: Sequelize.INTEGER,
        unique: true,
        nullable:false
      },
      Nombre: {
        type: Sequelize.STRING,
        nullable:false
      },
      Email: {
        type: Sequelize.STRING,
        toDefaultValue: 'notengoemail@gmail.com',
        nullable:false
      },
      imagen: {
        type: Sequelize.BLOB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Estudantes');
  }
};
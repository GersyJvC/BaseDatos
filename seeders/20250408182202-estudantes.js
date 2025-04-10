'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Personas', [
      {
        nombre: 'Ana Ramírez',
        email: 'ana.ramirez@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Luis Herrera',
        email: 'luis.herrera@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María López',
        email: 'maria.lopez@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Personas', null, {});
  }
};

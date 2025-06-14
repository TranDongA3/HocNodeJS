'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        code: 'ADMIN',
        value: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'USER',
        value: 'Regular User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'MOD',
        value: 'Moderator',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};

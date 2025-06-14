'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin01',
        email: 'admin@example.com',
        password: 'hashed-password-123', // Bạn nên hash password trong thực tế!
        avatar: 'https://example.com/avatar1.png',
        role: 'ADMIN',
        address: '123 Admin Street',
        phone: '0123456789',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user01',
        email: 'user@example.com',
        password: 'hashed-password-456',
        avatar: 'https://example.com/avatar2.png',
        role: 'USER',
        address: '456 User Road',
        phone: '0987654321',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

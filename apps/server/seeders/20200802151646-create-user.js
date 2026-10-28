'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Prevent duplicate key errors when re-seeding
    await queryInterface.bulkDelete('Users', { email: 'jack@mail.com' }, {});
    await queryInterface.bulkInsert('Users', [{
      username: 'Jack',
      email: 'jack@mail.com',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

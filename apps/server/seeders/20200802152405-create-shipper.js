'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Prevent duplicate entries when re-seeding
    await queryInterface.bulkDelete('Shippers', { company: 'JNE' }, {});
    await queryInterface.bulkInsert('Shippers', [{
      company: 'JNE',
      category: 'Original',
      price: 10000,
      time: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Shippers', null, {});
  }
};

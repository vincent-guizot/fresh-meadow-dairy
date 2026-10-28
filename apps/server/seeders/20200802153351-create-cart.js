'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Prevent duplicate entries when re-seeding
    await queryInterface.bulkDelete('Carts', { CustomerId: 1 }, {});
    await queryInterface.bulkInsert('Carts', [
      {
        ProductId: 1,
        CustomerId: 1,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date()  
      },
      {
        ProductId: 2,
        CustomerId: 1,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()  
      },
      {
        ProductId: 3,
        CustomerId: 1,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()  
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {});
  }
};

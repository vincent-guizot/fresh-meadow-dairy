'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Products');

    if (!tableInfo.volume) {
      await queryInterface.addColumn('Products', 'volume', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '1 Liter'
      });
    }

    if (!tableInfo.expiredDate) {
      await queryInterface.addColumn('Products', 'expiredDate', {
        type: Sequelize.DATEONLY,
        allowNull: true
      });
    }

    if (!tableInfo.storageTemp) {
      await queryInterface.addColumn('Products', 'storageTemp', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Chilled (2°C - 4°C)'
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Products');

    if (tableInfo.volume) {
      await queryInterface.removeColumn('Products', 'volume');
    }
    if (tableInfo.expiredDate) {
      await queryInterface.removeColumn('Products', 'expiredDate');
    }
    if (tableInfo.storageTemp) {
      await queryInterface.removeColumn('Products', 'storageTemp');
    }
  }
};

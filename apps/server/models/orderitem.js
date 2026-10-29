'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      if (models.Order) {
        OrderItem.belongsTo(models.Order, { foreignKey: 'OrderId', as: 'order' });
      }
      if (models.Product) {
        OrderItem.belongsTo(models.Product, { foreignKey: 'ProductId', as: 'product' });
      }
    }
  }

  OrderItem.init({
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'OrderItem'
  });

  return OrderItem;
};

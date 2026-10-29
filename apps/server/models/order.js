'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      if (models.User) {
        Order.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
      }
      if (models.OrderItem) {
        Order.hasMany(models.OrderItem, { foreignKey: 'OrderId', as: 'items' });
      }
    }
  }

  Order.init({
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deliverySlot: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'morning'
    },
    isColdPacking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
      validate: {
        isIn: {
          args: [['Pending', 'Confirmed', 'Preparing', 'Shipped', 'Delivered', 'Cancelled']],
          msg: 'Invalid order status'
        }
      }
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Paid'
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'QRIS'
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    shippingFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    timeline: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Order'
  });

  return Order;
};

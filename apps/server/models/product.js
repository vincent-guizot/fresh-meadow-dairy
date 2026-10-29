'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User);
      if (models.Category) {
        Product.belongsTo(models.Category, { foreignKey: 'CategoryId', as: 'categoryDetail' });
      }
      if (models.OrderItem) {
        Product.hasMany(models.OrderItem, { foreignKey: 'ProductId' });
      }
      if (models.StockMovement) {
        Product.hasMany(models.StockMovement, { foreignKey: 'ProductId' });
      }
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product name is required'
        }
      }
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product description/info is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product category is required'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product price is required'
        },
        isInt: {
          msg: 'Price must be a valid integer'
        },
        min: {
          args: [0],
          msg: 'Price cannot be negative'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product stock is required'
        },
        isInt: {
          msg: 'Stock must be a valid integer'
        },
        min: {
          args: [0],
          msg: 'Stock cannot be negative'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product image is required'
        }
      }
    },
    volume: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '1 Liter'
    },
    expiredDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    storageTemp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Chilled (2°C - 4°C)'
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product'
  });

  return Product;
};

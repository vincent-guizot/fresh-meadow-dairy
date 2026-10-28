'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasOne(models.Transaction)
    }
  };
  Cart.init({
    ProductId: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty : {
          message : "ProductId must be filled! :)"
        }
      }
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty : {
          message : "CustomerId must be filled! :)"
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty : {
          message : "Quantity must be filled! :)"
        },
        isInt : {
          message : "Quantity must be Number!"
        },
        min : {
          args : 1,
          message : "Quantity must more than 1"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  Cart.beforeCreate((user) => {
    
  })
  return Cart;
};
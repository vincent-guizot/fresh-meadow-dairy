'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.hasMany(models.Transaction)
    }
  };
  Invoice.init({
    total: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty : {
          message : "Price must be filled! :)"
        },
      }
    },
    status : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          message : "Status is required!"
        }
      }
    },
    CustomerId : {
      type : DataTypes.INTEGER,
      validate : {
        notEmpty : {
          message : "CustomerId is required!"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  Invoice.beforeCreate((user) => {
    
  })
  return Invoice;
};
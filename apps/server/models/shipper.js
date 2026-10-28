'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shipper.belongsTo(models.Transaction)
      
    }
  };
  Shipper.init({
    company: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Username must be filled! :)"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Category must be filled! :)"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "Price must be filled! :)"
        },
        isInt : {
          message : "Price must be Number!"
        },
        min : {
          args : 1,
          message : "Price must more than 1"
        }
      }
    },
    time: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "Time must be filled! :)"
        },
        isInt : {
          message : "Time must be Number!"
        },
        min : {
          args : 1,
          message : "Time must more than 1"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Shipper',
  });
  Shipper.beforeCreate((user) => {

  })
  return Shipper;
};
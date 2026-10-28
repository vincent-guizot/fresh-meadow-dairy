'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Product, {through: models.Cart})
      Customer.hasMany(models.Transaction)
    }
  };
  Customer.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Username must be filled! :)"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Email must be filled! :)"
        },
        isEmail: {
          message: "Must Email format!"
        },
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Username must be filled! :)"
        }
      }
    },
    avatar: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      beforeCreate(){}
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};
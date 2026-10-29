'use strict';
const { encryptPwd } = require('../helpers/bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product);
      if (models.Order) {
        User.hasMany(models.Order, { foreignKey: 'UserId' });
      }
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'customer',
      validate: {
        isIn: {
          args: [['admin', 'staff', 'customer']],
          msg: 'Role must be admin, staff, or customer'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active'
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = encryptPwd(user.password);
        if (!user.name) {
          user.name = user.username;
        }
      },
      beforeUpdate(user) {
        if (user.changed('password')) {
          user.password = encryptPwd(user.password);
        }
      }
    },
    sequelize,
    modelName: 'User'
  });

  return User;
};

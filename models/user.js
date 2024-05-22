'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helper/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { as: "Profile", foreignKey: "UserId" })
      User.hasMany(models.ChatMessage, {
        as: "SentMessages",
        foreignKey: "SenderId",
      })
      User.hasMany(models.ChatMessage, {
        as: "ReceivedMessages",
        foreignKey: "ReceiverId"
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email must be unique"
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username must be Unique"
      },
      validate: {
        notEmpty: {
          msg: { msg: "Username is required" }
        },
        notNull: { msg: "Username is required" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required",
        },
        notNull: {
          msg: "Password is required",
        },
        len: {
          args: [6],
          msg: "Password length must be 6 or above",
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "phoneNumber must be Unique"
      }
    },
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};
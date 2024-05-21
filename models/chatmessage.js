'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    static associate(models) {
      ChatMessage.belongsTo(models.User, {
        as: "Sender",
        foreignKey: "SenderId"
      })
      ChatMessage.belongsTo(models.User, {
        as: "Receiver",
        foreignKey: "ReceiverId"
      })
    }
  }
  ChatMessage.init({
    SenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      validate: {
        notEmpty: { msg: "SenderId is required" },
        notNull: { msg: "SenderId is required" }
      }
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      validate: {
        notEmpty: { msg: "ReceiverId is required" },
        notNull: { msg: "ReceiverId is required" }
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Message is required" },
        notEmpty: { msg: "Message is required" }
      }
    }
  }, {
    sequelize,
    modelName: 'ChatMessage',
  });
  return ChatMessage;
};
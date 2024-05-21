'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { as: "User", foreignKey: "UserId" })
    }
  }
  Profile.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      validate: {
        notEmpty: { msg: "UserId is required" },
        notNull: { msg: "UserId is required" }
      }
    },
    fullname: DataTypes.STRING,
    profileImageUrl: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
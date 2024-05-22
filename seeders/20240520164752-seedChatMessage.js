'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/chatMessage.json").map((element) => {
      element.createdAt = element.updatedAt = new Date();
      return element
    })
    await queryInterface.bulkInsert("ChatMessages", data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ChatMessages", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/profiles.json").map((element) => {
      element.createdAt = element.updatedAt = new Date();
      return element
    })
    await queryInterface.bulkInsert("Profiles", data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  },
};

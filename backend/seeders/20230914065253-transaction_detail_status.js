"use strict";

const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Transaction_detail_statuses", [
      {
        id: 1,
        order_status: "Preparing",
        createdAt: sequelize.fn("NOW"),
        updatedAt: sequelize.fn("NOW"),
      },
      {
        id: 2,
        order_status: "Cooking",
        createdAt: sequelize.fn("NOW"),
        updatedAt: sequelize.fn("NOW"),
      },
      {
        id: 3,
        order_status: "Serving",
        createdAt: sequelize.fn("NOW"),
        updatedAt: sequelize.fn("NOW"),
      },
      {
        id: 4,
        order_status: "Done",
        createdAt: sequelize.fn("NOW"),
        updatedAt: sequelize.fn("NOW"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

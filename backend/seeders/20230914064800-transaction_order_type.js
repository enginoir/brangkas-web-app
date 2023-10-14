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
    await queryInterface.bulkInsert("Transaction_order_types", [
      {
        id: 1,
        order_type: "Dine In",
        createdAt: sequelize.fn("NOW"),
        updatedAt: sequelize.fn("NOW"),
      },
      {
        id: 2,
        order_type: "Take Away",
        createdAt: sequelize.fn("NOW"),
        updatedAt: sequelize.fn("NOW"),
      },
      {
        id: 3,
        order_type: "Catering",
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

"use strict";
const bcrypt = require("bcrypt");
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
    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        role: 1,
        username: "admin",
        email: null,
        password:
          "$2b$12$kw3WxwLEniVLifJIBk.q/edmvpn5ZlbbX7JaOXeqBZGVw9fhuVIim",
        phone: null,
        fullname: "admin",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-12 11:45:08",
        updatedAt: "2023-09-12 20:44:43",
        isActive: 1,
      },
      {
        id: 2,
        role: 2,
        username: "Cashier001",
        email: null,
        password:
          "$2b$12$IXj111lrVZLsUiRMltskXehqPVfr9..m0kD5TFwn.eo123kdnFddq",
        phone: null,
        fullname: "cashier001",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-12 11:45:08",
        updatedAt: "2023-09-13 18:06:13",
        isActive: 1,
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

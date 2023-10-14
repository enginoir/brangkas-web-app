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
    await queryInterface.bulkInsert("Products", [
      {
        id: 1,
        productName: "Cofee",
        imageName: "eventImage_2023-09-14-15-20-49.jpeg",
        desc: "Black",
        price: 16000,
        stock: 999,
        categoryId: 1,
        createdAt: sequelize.fn("NOW"),
        updatedAt: sequelize.fn("NOW"),
      },
      {
        id: 2,
        productName: "Tea",
        imageName: "eventImage_2023-09-15-13-08-25.jpeg",
        desc: "Hot",
        price: 30000,
        stock: 100,
        categoryId: 1,
        createdAt: "2023-09-15 13:08:25",
        updatedAt: "2023-09-15 13:08:25",
      },
      {
        id: 3,
        productName: "Mineral Water",
        imageName: "eventImage_2023-09-15-13-10-40.jpeg",
        desc: "",
        price: 55000,
        stock: 100,
        categoryId: 1,
        createdAt: "2023-09-15 13:10:40",
        updatedAt: "2023-09-15 13:10:40",
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

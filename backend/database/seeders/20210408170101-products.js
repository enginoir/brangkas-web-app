'use strict';

const models = require('../../models')
const Category = models.Category
const Product = models.Product

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const mainantrees = await Category.findOne({ where: { name:'MAIN ENTREES'} })
    const beverages = await Category.findOne({ where: { name:'BEVERAGES'} })

    await Product.bulkCreate([
      {
        name: 'LOBSTER VISTA',
        price: 120000,
        stock:  50,
        categoryId: mainantrees.id
      },
      {
        name: 'LOBSTER VISTA GRANDE',
        price: 400000,
        stock:  20,
        categoryId: mainantrees.id
      },
      {
        name: 'COCA COLA 3LT',
        price: 100000,
        stock:  70,
        categoryId: beverages.id
      },
      {
        name: 'COCA COLA 1.5LT',
        price: 75000,
        stock:  70,
        categoryId: beverages.id
      },
      {
        name: 'MATCHA LATTE',
        price: 47000,
        stock:  70,
        categoryId: beverages.id
      },
      {
        name: 'DURIAN MOJITO',
        price: 80000,
        stock:  70,
        categoryId: beverages.id
      }
    ])

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     
     await queryInterface.bulkDelete('Products', null, {});
  }
};

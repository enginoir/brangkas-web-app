'use strict';

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
     await queryInterface.bulkInsert('Categories', [
      {
        name: 'BEVERAGES'
      },
      {
        name: 'MAIN ENTREES'
      },{
        name: 'APPETIZERS'
      },{
        name: 'PASTRY'
      },{
        name: 'DESSERTS'
      }
    ])

    await queryInterface.bulkInsert('Tables', [
      {
        name: 'PATIO 1'
      },
      {
        name: 'PATIO 2'
      },{
        name: 'PATIO 3'
      },{
        name: 'INTERIOR 1'
      },{
        name: 'INTERIOR 2'
      }
    ])

    await queryInterface.bulkInsert('Clients', [
      {
        name: 'Mang Jojon',
        address: 'Makaliwe, Jakarta Barat, DKI Jakarta',
        email: 'mjojon@example.com',
        phone: '999999999',
        memberid: '999999999'
      },
      {
        name: 'John Doe',
        address: 'Sunter, Jakarta Utara, DKI Jakarta',
        email: 'johndoe@example.com',
        phone: '3804123123',
        memberid: '40123123'
      },
    ])

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Categories',null, {})

     await queryInterface.bulkDelete('Tables',null, {})

     await queryInterface.bulkDelete('Clients',null, {})
  }
};

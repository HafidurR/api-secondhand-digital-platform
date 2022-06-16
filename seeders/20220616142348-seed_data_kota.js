'use strict';
const dataKota = require('../masterData/city.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    const insert = dataKota.map((eachKota) => {
      eachKota.createdAt = new Date();
      eachKota.updatedAt = new Date();
      return eachKota
    })
    await queryInterface.bulkInsert('Kota', dataKota)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kota', null)
  }
};

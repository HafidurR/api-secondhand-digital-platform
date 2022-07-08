'use strict';
const dataKategori = require('../masterData/kategori.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    const insert = dataKategori.map((eachKategori) => {
      eachKategori.createdAt = new Date();
      eachKategori.updatedAt = new Date();
      return eachKategori
    })
    await queryInterface.bulkInsert('Kategoris', dataKategori)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kategoris', null)
  }
};

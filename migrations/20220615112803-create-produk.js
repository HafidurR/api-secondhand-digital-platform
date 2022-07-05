'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Produks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_produk: {
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      harga: {
        type: Sequelize.STRING,
        defaultValue: 'Rp 0'
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {         // User belongsTo User id 1:1
          model: 'Users',
          key: 'id'
        }
      },
      kategoriId: {
        type: Sequelize.INTEGER,
        references: {         // User belongsTo Kategoris 1:1
          model: 'Kategoris',
          key: 'id'
        }
      },
      isPublish: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Produks');
  }
};
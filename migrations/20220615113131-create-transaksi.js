'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transaksis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // User belongsTo User id 1:1
          model: 'Users',
          key: 'id'
        }
      },
      buyerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // User belongsTo User id 1:1
          model: 'Users',
          key: 'id'
        }
      },
      produkId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      statusTransaksi: {
        type: Sequelize.ENUM,
        values: ['pending', 'accepted', 'finished', 'canceled']
      },
      hargaJual: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Transaksis');
  }
};
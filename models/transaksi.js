'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaksi.belongsTo(models.Produk, {
        foreignKey: `produkId`
      })
    }
  };
  Transaksi.init({
    sellerId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    produkId: DataTypes.INTEGER,
    statusTransaksi: DataTypes.STRING,
    hargaJual: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaksi',
  });
  return Transaksi;
};
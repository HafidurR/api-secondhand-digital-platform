'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produk.hasMany(models.Transaksi, {
        foreignKey: 'produkId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      Produk.belongsTo(models.Kategori, {
        foreignKey: 'kategoriId'
      })
      Produk.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  };
  Produk.init({
    namaProduk: DataTypes.STRING,
    gambar: DataTypes.ARRAY(DataTypes.STRING),
    harga: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    kategoriId: DataTypes.INTEGER,
    isPublish: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Produk',
  });
  return Produk;
};
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
      this.hasMany(models.Keranjang, {
        foreignKey: 'produkId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      this.hasMany(models.Transaksi, {
        foreignKey: 'produkId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      this.belongsTo(models.Kategori, {
        foreignKey: 'kategoriId'
      })
      this.hasMany(models.notifikasi, {
        foreignKey: 'produkId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  };
  Produk.init({
    nama_produk: DataTypes.STRING,
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
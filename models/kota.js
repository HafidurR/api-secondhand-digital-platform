'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.User, {
      //   foreignKey: 'kotaId'
      // })
      Kota.hasMany(models.User, {
        foreignKey: 'kotaId' 
      });
    }
  };
  Kota.init({
    namaKota: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kota',
  });
  return Kota;
};
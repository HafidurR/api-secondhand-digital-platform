'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    kotaId: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    no_telp: DataTypes.STRING,
    foto: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format",
        },
        notNull: {
          msg: "Email required",
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty",
        },
      },
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (User) => {
        User.password = bcrypt.hashSync(User.password, +process.env.SALT_ROUNDS);
        return User
      }
    }
  });
  return User;
};
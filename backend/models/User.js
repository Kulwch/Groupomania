'use strict';
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
      models.User.hasMany(models.Gif);
      models.User.hasMany(models.Comment);
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-z]+$/i,
        notEmpty: true,
        len: [2,25]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-z]+$/i,
        notEmpty: true,
        len: [2,25]
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        is: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};
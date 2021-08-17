'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        models.Gif.belongsTo(models.User, {
            foreignKey: {
            allowNull: false
            }
        });
        models.Gif.hasMany(models.Comment);
    }
  }
  Gif.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusText: {
      type: DataTypes.STRING,
      validate: {
        is: /^([\s\S]){2,255}([\s\.])/,
        len: [2, 255]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^([a-zA-Z]\:|\\\\[^\/\\:*?"<>|]+\\[^\/\\:*?"<>|]+)(\\[^\/\\:*?"<>|]+)+(\.[^\/\\:*?"<>|]+)$/,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Gif',
    paranoid: true
  });
  return Gif;
};
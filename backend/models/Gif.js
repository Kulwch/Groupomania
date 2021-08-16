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
    userId: DataTypes.INTEGER,
    statusText: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gif',
    paranoid: true
  });
  return Gif;
};
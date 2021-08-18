'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.belongsToMany(models.Gif, {
        through: models.Like,
        foreignKey: 'UserId',
        otherKey: 'GifId'
      });
      models.Gif.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'GifId',
        otherKey: 'UserId'
      });
      models.Like.belongsTo(models.User);
      models.Like.belongsTo(models.Gif);
    }
  }
  Like.init({
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
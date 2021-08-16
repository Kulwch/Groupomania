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
        foreignKey: 'userId',
        otherKey: 'gifId'
      });
      models.Gif.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'gifId',
        otherKey: 'userId'
      });
      models.Like.belongsToMany(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      models.Like.belongsToMany(models.Gif, {
        foreignKey: 'gifId',
        as: 'gif'
      });
    }
  }
  Like.init({
    gifId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
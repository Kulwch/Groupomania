'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Comment.belongsTo(models.Gif, {
        foreignKey: 'gifId',
        allowNull: false,
      });
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        allowNull: false
      })
    }
  }
  Comment.init({
    gifId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true
  });
  return Comment;
};
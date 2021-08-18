'use strict';
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Comment.belongsTo(models.User, {
				foreignKey: {
					allowNull: false
				}
			});
			models.Comment.belongsTo(
				models.Gif,
				{
					foreignKey: {
						allowNull: false
					}
				},
				{ onDelete: "cascade" }
			);
		}
	}
	Comment.init(
		{
    gifId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              notEmpty: true,
              is: /^([\s\S]){2,500}([\s\.])/,
              len: [2, 500]
            }
        }
  }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true
  });
  return Comment;
};
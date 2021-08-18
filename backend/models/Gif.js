'use strict';
const { timeStamp } = require("console");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Gif extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Gif.hasMany(
				models.Comment,
				{ foreignKey: "gifId" },
				{ onDelete: "cascade" }
			);

			models.Gif.belongsTo(models.User,
        { foreignKey: "userId",
          onDelete: "cascade"
        });
		}
	}
	Gif.init(
		{
      userId: {
      //foreignKey of gifs table
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusText: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^([\s\S]){2,255}([\s\.])/,
        len: [2, 255]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
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
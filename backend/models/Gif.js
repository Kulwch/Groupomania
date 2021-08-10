const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = require('../utils/database')

const Gif = sequelize.define('Gif', {
    gif_id: {          
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
    type: DataTypes.STRING,
    allowNull: false
    }, 
    statusText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
  paranoid: true,
});

module.exports = Gif;
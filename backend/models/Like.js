const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = require('../utils/database')

const Like = sequelize.define('Like', {
    gifId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Gif',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    disLikes: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    //other options
});

module.exports = Like;
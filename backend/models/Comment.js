const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./User');

const Comment = sequelize.define('Comment', {
    commentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    gifId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, 
    {
    paranoid: true,
    }
);

module.exports = Comment;

Comment.hasOne(User, {
    foreignKey: {
        name: 'userId', 
        allowNull: false
    }
})

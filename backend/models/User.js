const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database')

const User = sequelize.define('User', {
  // Model attributes are defined here
  user_id: {          
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  isAdmin: false
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;
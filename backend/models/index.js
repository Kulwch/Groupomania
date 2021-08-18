const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const db = {}

const sequelize = new Sequelize('mysql://root:root@localhost:3306/database_development_OC')

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
  
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    db[model.name] = model;
    
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

sequelize.sync();

module.exports = db;
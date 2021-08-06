const express = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require('./utils/database')
const User = require('./models/User');
const userRoutes = require('./routes/user');

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
sequelize.sync() 

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api/auth', userRoutes);

module.exports = app;
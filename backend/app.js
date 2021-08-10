const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize');
const sequelize = require('./utils/database')
const User = require('./models/User');
const  Gif = require('./models/Gif');
const userRoutes = require('./routes/user');
const gifRoutes = require('./routes/gifs')

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
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/gifs', gifRoutes);

module.exports = app;
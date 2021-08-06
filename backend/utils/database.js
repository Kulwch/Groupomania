const Sequelize = require('sequelize');
const sequelize = new Sequelize('oc_projects', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
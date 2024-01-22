const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Employee', 'root', 'Filmlover17', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.sync();

module.exports = sequelize;

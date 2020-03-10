const Sequelize = require('sequelize');

const sequelize = new Sequelize('learn-nodejs', 'root', 'test', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;
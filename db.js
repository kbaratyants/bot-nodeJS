const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    'telegaBot',
    'root',
    'root',
    {
        host: '95.213.211.18',
        port: '6432',
        dialect: 'postgres'
    }
)
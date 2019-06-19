const Sequelize = require('sequelize');
// const env = require('.env')

//env.config();
const sequelize = new Sequelize('shop', 'root', 'QXFY105729', {
    dialect: 'mysql',
    host: 'localhost',
    operatorsAliases: false
});

module.exports = sequelize;
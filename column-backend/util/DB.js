const Sequelize = require('sequelize');

const DB = new Sequelize.Sequelize({
    dialect : 'mysql',
    database : 'project_1',
    username : 'root',
    password : 'YourRootPassword',
    host : 'localhost'
});

module.exports = DB;
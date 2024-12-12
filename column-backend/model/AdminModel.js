const DB = require('../util/DB');
const {DataTypes} = require('sequelize');

const AdminModel = DB.define('admin', {
    adminId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

module.exports = AdminModel;
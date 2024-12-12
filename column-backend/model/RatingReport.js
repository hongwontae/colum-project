const DB = require('../util/DB');
const {DataTypes} = require('sequelize');

const RatingReport = DB.define('ratingReport', {
    rrId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    reportDate : {
        type : DataTypes.DATEONLY,
        allowNull : false,
    },
    oppenent : {
        type : DataTypes.STRING,
        allowNull : false
    },
    reportDescription : {
        type : DataTypes.TEXT,
        allowNull : false
    }
})

module.exports = RatingReport;
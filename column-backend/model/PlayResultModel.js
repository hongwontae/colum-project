const DB = require('../util/DB');
const {DataTypes} = require('sequelize');

const PlayResult = DB.define('playResult', {
    playId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    imagePath : {
        type : DataTypes.STRING,
        allowNull : false
    },
    matchTeam : {
        type : DataTypes.STRING,
        allowNull : false
    },
    playDescription : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    date : {
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    myScore : {
        type : DataTypes.STRING,
        allowNull : false
    },
    opponentScore : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

module.exports = PlayResult;
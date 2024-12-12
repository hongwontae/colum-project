const DB = require('../util/DB');
const {DataTypes} = require('sequelize');

const Player = DB.define('players', {
    pId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    playerName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    position : {
        type : DataTypes.STRING,
        allowNull : false
    },
    backNumber : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    start_bol : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    }
})

module.exports = Player;
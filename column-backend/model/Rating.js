const DB = require('../util/DB');
const {DataTypes} = require('sequelize');

// 관계 설정하기 위해 테이블 get
const Player = require('./Player');
const RatingReport = require('./RatingReport');

const Rating = DB.define('ratings', {
    rId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    rating : {
        type : DataTypes.DECIMAL(3,2),
        allowNull : false
    }
})

// 한 명의 선수가 여러 평점을 갖는다. 
Player.hasMany(Rating, {foreignKey : 'pId'});
Rating.belongsTo(Player, {foreignKey : 'pId'});
// 하나의 report에는 여러 개의 평점이 존재한다.
RatingReport.hasMany(Rating, {foreignKey : 'rrId', onDelete : 'CASCADE'});
Rating.belongsTo(RatingReport, {foreignKey : 'rrId', onDelete : 'CASCADE'});

module.exports = Rating;


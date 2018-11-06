var Sequelize = require('sequelize'); //sql語法 類似c＃ Linq
var model = require('../db.js'); //使用sql資料表

exports.findAll =async function findall(){
    var data = await model.suzi.findAll({ attributes: ['id', 'name'] });
    return data;
}
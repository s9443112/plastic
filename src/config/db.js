import { dirname } from 'path'

var Sequelize = require('sequelize')
var database = require('./auth')

const Op = Sequelize.Op;
const sequelize = new Sequelize(database.MySQL.database, database.MySQL.user, database.MySQL.password, {
    host: database.MySQL.host,
    dialect: 'mysql',
    timezone: database.MySQL.TIME_ZONE,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    pool: {
        max: 5,
        min: 0,
        idle: 1000
    },
    operatorsAliases: { $gte: Op.gte, $lte: Op.lte, $or: Op.or, $eq: Op.eq, $ne: Op.ne },
    logging() { },
})

const suzi = sequelize.import(__dirname + '/../model/suzi.js');
const components = sequelize.import(__dirname + '/../model/components.js');
const components_part = sequelize.import(__dirname + '/../model/components_part.js')
const picking_register = sequelize.import(__dirname + '/../model/picking_register.js');
const history = sequelize.import(__dirname + '/../model/history.js');

// 創建所有資料表
//.sync({ force: true })会删除并重建表
sequelize.sync({ force: false })

//suzi.hasOne(components_part, { foreignKey: 'suzi_id' });
export { sequelize }
export { suzi };
export { components };
export { components_part };
export { picking_register };
export { history };
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('history', {
        id: {
            type: DataTypes.MEDIUMINT(8),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: '流水號'
        },
        suzi_id: {
            type: DataTypes.MEDIUMINT(8),
            allowNull: false,
            autoIncrement: false,
            comment: '素子編號'
        },
        name: {
            type: DataTypes.CHAR(25),
            allowNull: false,
            comment: '物品名稱'
        },
        name_No: {
            type: DataTypes.CHAR(25),
            allowNull: true,
            comment: '物品料號',
        },
        amount: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: false,
            comment: '數量'
        },
        company: {
            type: DataTypes.CHAR(20),
            allowNull: true,
            comment: '公司'
        },
        price: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: false,
            comment: '價格'
        },
        currency: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            comment: '幣別',
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '備註',
        },
        date: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW,
            allowNull: false,
        }

    }, {
            freezeTableName: true,
            timestamps: false
        })
}
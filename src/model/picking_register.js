module.exports = function (sequelize, DataTypes) {
    return sequelize.define('picking_register', {
        id: {
            type: DataTypes.MEDIUMINT(8),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: '零件領料登記表'
        },
        suzi_id:{
            type:DataTypes.MEDIUMINT(8),
            allowNull:false,
            autoIncrement:false
        },
        name: {
            type: DataTypes.CHAR(25),
            allowNull: false,
        },
        name_No: {
            type: DataTypes.CHAR(25),
            allowNull: false,
        },
        get_amount: {
            type: DataTypes.INTEGER(8),
            allowNull: false,
            autoIncrement: false
        },
        get_date: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
            freezeTableName: true,
            timestamps: false
        })
}
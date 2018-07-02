module.exports = function (sequelize,DataTypes){
    return sequelize.define('suzi',{
        id:{
            type:DataTypes.MEDIUMINT(8),
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            comment:'素子'
        },
        name:{
            type:DataTypes.CHAR(25),
            allowNull:false,
        },
    },{
        freezeTableName:true,
        timestamps:false
    })
}
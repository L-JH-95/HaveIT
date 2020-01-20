module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('client',{
        serialNumber:{
            type:DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        name:{
            type:DataTypes.STRING(255),
            allowNull: false,
        },
        IP:{
            type:DataTypes.STRING(255),
            //unique: true,
        },
        Port:{
            type:DataTypes.STRING(255),
            allowNull: false,
        },
    })
}
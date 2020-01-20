module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('noti_icon',{
        picture:{
            type:DataTypes.STRING(255),
            allowNull: false,
        },
       
    })
}
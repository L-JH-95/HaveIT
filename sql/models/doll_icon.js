module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('doll_icon',{
        picture:{
            type:DataTypes.STRING(255),
            allowNull: false,
        },
       
    })
}
module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('notification',{
        week_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        time:{
            type:DataTypes.DATE,
            allowNull: false,
        },
       
    })
}
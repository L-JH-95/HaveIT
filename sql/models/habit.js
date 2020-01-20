module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('habit',{
        habit_name:{
            type:DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        created_at:{
            type:DataTypes.DATE,
            allowNull: false,
            defaultValue:sequelize.literal('now()'),
        }
    })
}
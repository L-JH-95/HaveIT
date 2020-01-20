module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('user',{
        userID:{
            type:DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        pwd:{
            type:DataTypes.STRING(255),
            allowNull: false,
        },
        email:{
            type:DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        NickName:{
            type:DataTypes.STRING(255),
            allowNull: false,
        },
        salt:{
            type:DataTypes.STRING(255),
        }

    });

}

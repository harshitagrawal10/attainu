'use strict'

module.exports = (sequelize,dataTypes) => {
    const User = sequelize.define('user',{
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: dataTypes.ENUM,
            values: ['ADMIN','STUDENT'],
            allowNull: false
        }
    })

    User.associate = function (models) {
        User.hasMany(models.post, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        })
    }
    return User
}
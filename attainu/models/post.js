'use strict'

module.exports = (sequelize,dataTypes) => {
    const Post = sequelize.define('post',{
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: dataTypes.STRING,
            allowNull: false
        }
    })

    Post.associate = function (models) {
        Post.belongsTo(models.user, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        })
    }
    return Post
}
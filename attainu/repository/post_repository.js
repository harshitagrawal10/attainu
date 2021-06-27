const { post } = require('../models')

const createPost = (postDetail) =>
    post.create(postDetail)

const updatePost = (id, message) =>
    post.update({ message },{
        where: { id }
    })

const deletePost = (id) =>
    post.destroy({
        where: { id }
    })

const getPost = (limit, offset) => {
    limit = (limit) ? parseInt(limit) : 10
    offset = (offset) ? parseInt(offset) : 0
    return post.findAll({
            offset: offset,
            limit: limit
        }
    )
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost
}
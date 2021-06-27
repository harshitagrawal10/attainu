const post_repository = require('../repository/post_repository')

const createPost = (postDetail) =>
    post_repository.createPost(postDetail)

const updatePost = (id, message) =>
    post_repository.updatePost(id, message)

const deletePost = (id) =>
    post_repository.deletePost(id)

const getPost = (limit, offset) =>
    post_repository.getPost(limit, offset)

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost
}
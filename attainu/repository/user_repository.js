const { user } = require('../models')

const createUser = (userDetail) =>
    user.create(userDetail)

module.exports = {
    createUser
}
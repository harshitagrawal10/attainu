const user_repository = require('../repository/user_repository')

const createUser = (userDetail) =>
    user_repository.createUser(userDetail)

module.exports = {
    createUser
}
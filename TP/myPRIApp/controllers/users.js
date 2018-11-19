var User = require('../models/users')

const Users = module.exports

Users.count = () => {
    return User
        .countDocuments()
        .exec()
}
var User = require('../models/user')

module.exports.getUser = uid => {
    return User
    .findOne({_id: uid})
    .exec()
}

module.exports.list = () => {
    return User
    .find()
    .sort({name: -1})
    .exec()
}

module.exports.insert = user =>{
    var newUser = {
        _id: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        userType: user.userType
    }
    return User.create(newUser)
}
var Users = require('../schemas/users');

exports.create = function (data) {
    return new Promise((resolve, reject) => {
        console.log(data)

        var users = new Users(data)
        users.save(function (err, user) {
            if (err) {
                reject(err);
            } else {
                console.log('createUser done: ' + user)
                resolve(user)
            }
        })
    })
}

exports.getAll = function () {
    return new Promise((resolve, reject) => {
        Users.find({})
            .sort({name:'desc'})
            .exec(function (err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getAll done: ' + user)
                resolve(user)
            })
    })
}

exports.getUserById = function (id) {
    return new Promise((resolve, reject) => {
        Users.findOne(
            {"_id": id},
            function (err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                console.log('getUserById done: ' + user)
                resolve(user)
            }
        )
    })
}

exports.getUserByName = function (name) {
    return new Promise((resolve, reject) => {
        Users.findOne(
            {"name": name},
            function (err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                console.log('getUserByName done: ' + user)
                resolve(user)
            }
        )
    })
}

exports.deleteUserById = function (id) {
    return new Promise((resolve, reject) => {
        Users.findByIdAndRemove(
            id,
            function (err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('deleteUserById done: ' + user)
                resolve(user)
            }
        )
    })
}

exports.deleteUserByName = function (name) {
    return new Promise((resolve, reject) => {
        Users.remove(
            {
                "name": name
            }, function (err, res) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve()
            });
    })
}

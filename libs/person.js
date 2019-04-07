var Person = require('../schemas/person');

exports.create = function (data) {
    return new Promise((resolve, reject) => {
        console.log(data)

        var person = new Person(data)
        person.save(function (err, user) {
            if (err) {
                reject(err);
            } else {
                console.log('createPerson done: ' + user)
                resolve(user)
            }
        })
    })
}

exports.getAll = function () {
    return new Promise((resolve, reject) => {
        Person.find({})
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

exports.getPersonById = function (id) {
    return new Promise((resolve, reject) => {
        Person.findOne(
            {"_id": id},
            function (err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                console.log('getPersonById done: ' + user)
                resolve(user)
            }
        )
    })
}

exports.getPersonByName = function (name) {
    return new Promise((resolve, reject) => {
        Person.findOne(
            {"name": name},
            function (err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                console.log('getPersonByName done: ' + user)
                resolve(user)
            }
        )
    })
}

exports.deletePersonById = function (id) {
    return new Promise((resolve, reject) => {
        Person.deleteOne(
            {"_id":id},
            function (err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(user)
            }
        )
    })
}

exports.deletePersonByName = function (name) {
    return new Promise((resolve, reject) => {
        Person.deleteOne(
            {"name": name}
            , function (err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(user)
            });
    })
}

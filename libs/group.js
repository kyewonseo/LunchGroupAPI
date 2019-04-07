var Group = require('../schemas/group');

exports.create = function (data) {
    return new Promise((resolve, reject) => {
        console.log(data)

        var group = new Group(data)
        group.save(function (err, persons) {
            if (err) {
                reject(err);
            } else {
                console.log('createGroup done: ' + persons)
                resolve(persons)
            }
        })
    })
}

exports.getAll = function () {
    return new Promise((resolve, reject) => {
        Group.find({})
            .sort({name:'desc'})
            .exec(function (err, persons) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getAll done: ' + persons)
                resolve(persons)
            })
    })
}

exports.getGroupById = function (id) {
    return new Promise((resolve, reject) => {
        Group.findOne(
            {"_id": id},
            function (err, persons) {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                console.log('getGroupById done: ' + persons)
                resolve(persons)
            }
        )
    })
}

exports.getGroupByName = function (name) {
    return new Promise((resolve, reject) => {
        Group.findOne(
            {"name": name},
            function (err, persons) {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                console.log('getGroupByName done: ' + persons)
                resolve(persons)
            }
        )
    })
}

exports.deleteGroupById = function (id) {
    return new Promise((resolve, reject) => {
        Group.deleteOne(
            {"_id":id},
            function (err, persons) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(persons)
            }
        )
    })
}

exports.deleteGroupByName = function (name) {
    return new Promise((resolve, reject) => {
        Group.deleteOne(
            {"name": name}
            , function (err, persons) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(persons)
            });
    })
}

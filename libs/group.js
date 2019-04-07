var Group = require('../schemas/group');

exports.create = function (data) {
    return new Promise((resolve, reject) => {
        console.log(data)


        var group = new Group(data)
        group.save(function (err, group) {
            if (err) {
                reject(err);
            } else {
                console.log('createGroup done: ' + group)
                resolve(group)
            }
        })
    })
}

exports.insertBulk = function (data) {
    return new Promise((resolve, reject) => {
        console.log(data)

        Group.insertMany(data)
            .then((result) => {
                console.log('result=>', result)
                resolve(result)
            })
            .catch(err => {
                console.log('err=>', err)
                reject(err)
            })
    })
}

exports.getAll = function () {
    return new Promise((resolve, reject) => {
        Group.find({})
            .sort({name:'desc'})
            .exec(function (err, group) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getAll done: ' + group)
                resolve(group)
            })
    })
}

exports.getGroupById = function (id) {
    return new Promise((resolve, reject) => {
        Group.findOne(
            {"_id": id},
            function (err, group) {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                console.log('getGroupById done: ' + group)
                resolve(group)
            }
        )
    })
}

exports.getGroupByName = function (name) {
    return new Promise((resolve, reject) => {
        Group.findOne(
            {"name": name},
            function (err, group) {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                console.log('getGroupByName done: ' + group)
                resolve(group)
            }
        )
    })
}

exports.deleteGroupById = function (id) {
    return new Promise((resolve, reject) => {
        Group.deleteOne(
            {"_id":id},
            function (err, group) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(group)
            }
        )
    })
}

exports.deleteGroupByName = function (name) {
    return new Promise((resolve, reject) => {
        Group.deleteOne(
            {"name": name}
            , function (err, group) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(group)
            });
    })
}

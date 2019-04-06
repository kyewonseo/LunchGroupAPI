var Promise = require('promise');
var mongoose = require('mongoose');
var config = require('../configs/dbConfig')
var MONGODB_URL = config.db.mongodb_url;
var DB_FILE = config.db.db_name;
var DB_USER = config.db.mongodb_user;
// var DB_URI = 'mongodb://' + DB_USER + MONGODB_URL + '/' + DB_FILE;
var DB_URI = 'mongodb://' + MONGODB_URL + '/' + DB_FILE;

mongoose.Promise = global.Promise;
mongoose.set('debug, true');

function connect () {
    console.log("url = " + DB_URI);
    return new Promise((resolve, reject) => {
        if (mongoose.connection.readyState) {
            console.log('reuse connection')
            resolve(mongoose.connection)
        } else {
            console.log('new connection')
            mongoose.connect(DB_URI, { useNewUrlParser: true })
                .then( (connection) => {
                    resolve(connection)
                })
                .catch( (err) => {
                    console.error(err)
                    reject(err)
                })
        }
    })
}

exports.connectDB = function () {
    return new Promise((resolve, reject) => {
        connect().then( function (connection) {
            resolve(connection)
        }).catch( function (error) {
            reject(error)
        })
    })
}

exports.close = function () {
    mongoose.connection.close()
}



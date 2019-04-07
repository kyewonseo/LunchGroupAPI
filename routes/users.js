var express = require('express');
var router = express.Router();
var ResCode = require('../utils/ResCode');
var SendRes = require('../utils/SendRes');
var db = require('../utils/db');
var Users = require('../libs/users');


router.get('/', function (req, res, next) {

    db.connectDB()
        .then(() => Users.getAll())
        .then((result) => {
            console.log('result=>', result);
            SendRes.send(res, ResCode.SUCCESS, {data: result});

        }).catch((err) => {
        SendRes.send(res, ResCode.INTERNALSERVERERROR, err);
    })
});

router.get('/id/:userId', function (req, res, next) {

    let userId = req.params.userId;

    db.connectDB()
        .then(() => Users.getUserById(userId))
        .then((result) => {
            SendRes.send(res, ResCode.SUCCESS, {data: result});

        }).catch((err) => {
        if (err.name == 'CastError') {
            console.log('in')
            let message = "Check user id!";
            SendRes.send(res, ResCode.FAIL, {message: message});
        } else {
            let message = err;
            SendRes.send(res, ResCode.INTERNALSERVERERROR, {message: message});
        }
    })

});

router.get('/name/:name', function (req, res, next) {

    let name = req.params.name;

    db.connectDB()
        .then(() => Users.getUserByName(name))
        .then((result) => {
            console.log('result=>', result);

            if (result == null) {
                let message = "Check user name!";
                SendRes.send(res, ResCode.FAIL, {message: message});
            } else {
                SendRes.send(res, ResCode.SUCCESS, {data: result});
            }

        }).catch((err) => {
        let message = err;
        SendRes.send(res, ResCode.INTERNALSERVERERROR, {message: message});
    })
});

router.post('/', function (req, res, next) {

    let data = req.body;

    db.connectDB()
        .then(() => Users.create(data))
        .then((result) => {
            console.log('result=>', result);
            SendRes.send(res, ResCode.SUCCESS, {data: result});
        }).catch((err) => {
        let message = err;
        SendRes.send(res, ResCode.INTERNALSERVERERROR, {message: message});
    })
});

router.delete('/id/:userId', function (req, res, next) {

    let userId = req.params.userId;

    db.connectDB()
        .then(() => Users.deleteUserById(userId))
        .then((result) => {
            console.log('result=>', result);

            if (result.deletedCount == 0) {
                let message = "can't find user";
                SendRes.send(res, ResCode.FAIL, {message: message});
            } else {
                SendRes.send(res, ResCode.SUCCESS, {data: result});
            }
        }).catch((err) => {
        let message = err;
        SendRes.send(res, ResCode.INTERNALSERVERERROR, {message: message});
    })
});

router.delete('/name/:name', function (req, res, next) {

    let name = req.params.name;

    db.connectDB()
        .then(() => Users.deleteUserByName(name))
        .then((result) => {
            console.log('result=>', result);

            if (result.deletedCount == 0) {
                let message = "can't find user";
                SendRes.send(res, ResCode.FAIL, {message: message});
            } else {
                SendRes.send(res, ResCode.SUCCESS, {data: result});
            }
        }).catch((err) => {
        let message = err;
        SendRes.send(res, ResCode.INTERNALSERVERERROR, {message: message});
    })
});

module.exports = router;

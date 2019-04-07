var express = require('express');
var router = express.Router();
var APIResponse = require('../utils/APIResponse');
var ResCode = require('../utils/ResCode');
var db = require('../utils/db');
var Users = require('../libs/users');


router.get('/', function (req, res, next) {

    db.connectDB()
        .then(() => Users.getAll())
        .then((result) => {
            console.log('result=>', result);
            APIResponse.code = ResCode.SUCCESS;
            APIResponse.data = result;
            res.send(APIResponse.create())

        }).catch((err) => {
        APIResponse.code = ResCode.INTERNALSERVERERROR;
        APIResponse.data = err;
        res.send(APIResponse.create())
    })
});

router.get('/id/:userId', function (req, res, next) {

    let userId = req.params.userId;

    db.connectDB()
        .then(() => Users.getUserById(userId))
        .then((result) => {
            APIResponse.code = ResCode.SUCCESS;
            APIResponse.data = result;
            res.send(APIResponse.create())

        }).catch((err) => {
        if (err.name == 'CastError') {
            APIResponse.code = ResCode.FAIL;
            APIResponse.message = "Check user id!";
            res.status(ResCode.FAIL).send(APIResponse.create())
        }
        APIResponse.code = ResCode.INTERNALSERVERERROR;
        APIResponse.data = err;
        res.send(APIResponse.create())
    })

});

router.get('/name/:name', function (req, res, next) {

    let name = req.params.name;

    db.connectDB()
        .then(() => Users.getUserByName(name))
        .then((result) => {
            console.log('result=>', result);

            if (result == null) {
                APIResponse.code = ResCode.FAIL;
                APIResponse.message = "Check user name!";
                res.status(ResCode.FAIL).send(APIResponse.create())
            } else {
                APIResponse.code = ResCode.SUCCESS;
                APIResponse.data = result;
                res.send(APIResponse.create())
            }

        }).catch((err) => {
        APIResponse.code = ResCode.INTERNALSERVERERROR;
        APIResponse.data = err;
        res.send(APIResponse.create())
    })
});

router.post('/', function (req, res, next) {

    let data = req.body;

    db.connectDB()
        .then(() => Users.create(data))
        .then((result) => {
            console.log('result=>', result);
            APIResponse.code = ResCode.SUCCESS;
            APIResponse.data = result;
            res.send(APIResponse.create())
        }).catch((err) => {
        APIResponse.code = ResCode.INTERNALSERVERERROR;
        APIResponse.data = err;
        res.send(APIResponse.create())
    })
});

router.delete('/id/:userId', function (req, res, next) {

    let userId = req.params.userId;

    db.connectDB()
        .then(() => Users.deleteUserById(userId))
        .then((result) => {
            console.log('result=>', result);

            if (result.deletedCount == 0) {
                APIResponse.code = ResCode.FAIL;
                APIResponse.message = "can't find user";
                res.status(ResCode.FAIL).send(APIResponse.create())
            } else {
                APIResponse.code = ResCode.SUCCESS;
                APIResponse.data = result;
                res.send(APIResponse.create())
            }
        }).catch((err) => {
        APIResponse.code = ResCode.INTERNALSERVERERROR;
        APIResponse.data = err;
        res.send(APIResponse.create())
    })
});

router.delete('/name/:name', function (req, res, next) {

    let name = req.params.name;

    db.connectDB()
        .then(() => Users.deleteUserByName(name))
        .then((result) => {
            console.log('result=>', result);

            if (result.deletedCount == 0) {
                APIResponse.code = ResCode.FAIL;
                APIResponse.message = "can't find user";
                res.status(ResCode.FAIL).send(APIResponse.create())
            } else {
                APIResponse.code = ResCode.SUCCESS;
                APIResponse.data = result;
                res.send(APIResponse.create())
            }
        }).catch((err) => {
        APIResponse.code = ResCode.INTERNALSERVERERROR;
        APIResponse.data = err;
        res.send(APIResponse.create())
    })
});

module.exports = router;

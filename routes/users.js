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
        APIResponse.code = ResCode.FAIL;
        APIResponse.data = err;
        res.send(APIResponse.create())
    })
});

router.get('/id/:userId', function (req, res, next) {

    let userId = req.params.userId;
    // if (userId == undefined) {
    //     APIResponse.code = ResCode.FAIL;
    //     APIResponse.data = "Check the userId!";
    //     res.send(APIResponse.create())
    //
    // }

    db.connectDB()
        .then(() => Users.getUserById(userId))
        .then((result) => {
            console.log('result=>', result);
            APIResponse.code = ResCode.SUCCESS;
            APIResponse.data = result;
            res.send(APIResponse.create())

        }).catch((err) => {
        APIResponse.code = ResCode.FAIL;
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
            APIResponse.code = ResCode.SUCCESS;
            APIResponse.data = result;
            res.send(APIResponse.create())

        }).catch((err) => {
        APIResponse.code = ResCode.FAIL;
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
        APIResponse.code = ResCode.FAIL;
        APIResponse.data = err;
        res.send(APIResponse.create())
    })
});


module.exports = router;

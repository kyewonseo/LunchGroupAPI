var express = require('express');
var router = express.Router();
var ResCode = require('../utils/ResCode');
var SendRes = require('../utils/SendRes');
var db = require('../utils/db');
var Person = require('../libs/person');


router.get('/', function (req, res, next) {

    db.connectDB()
        .then(() => Person.getAll())
        .then((result) => {
            console.log('result=>', result);
            SendRes.send(res, ResCode.SUCCESS, {data: result});

        }).catch((err) => {
        SendRes.send(res, ResCode.INTERNALSERVERERROR, err);
    })
});

router.get('/id/:personId', function (req, res, next) {

    let personId = req.params.personId;

    db.connectDB()
        .then(() => Person.getPersonById(personId))
        .then((result) => {
            SendRes.send(res, ResCode.SUCCESS, {data: result});

        }).catch((err) => {
        if (err.name == 'CastError') {
            let message = "Check person id!";
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
        .then(() => Person.getPersonByName(name))
        .then((result) => {
            console.log('result=>', result);

            if (result == null) {
                let message = "Check person name!";
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
    let userName = data.name;

    if ((userName.length < 3) || (userName.length > 12)) {

        let message = "User name must be between 3 and 12 characters."
        SendRes.send(res, ResCode.FAIL, {message: message})
    } else {
        db.connectDB()
            .then(() => Person.getPersonByName(userName))
            .then((result) => {

                if (result != null) {
                    let message = "The same name exists!"
                    SendRes.send(res, ResCode.FAIL, {message: message})
                } else {

                    Person.create(data)
                        .then((result) => {
                            console.log('result=>', result);
                            SendRes.send(res, ResCode.SUCCESS, {data: result});
                        })
                }
            }).catch((err) => {
            let message = err;
            SendRes.send(res, ResCode.INTERNALSERVERERROR, {message: message});
        })
    }
});

router.delete('/id/:personId', function (req, res, next) {

    let personId = req.params.personId;

    db.connectDB()
        .then(() => Person.deletePersonById(personId))
        .then((result) => {
            console.log('result=>', result);

            if (result.deletedCount == 0) {
                let message = "can't find person";
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
        .then(() => Person.deletePersonByName(name))
        .then((result) => {
            console.log('result=>', result);

            if (result.deletedCount == 0) {
                let message = "can't find person";
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

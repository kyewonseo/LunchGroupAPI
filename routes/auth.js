var express = require('express');
var router = express.Router();
let jwt = require("jsonwebtoken");
var dbConfig = require('../configs/dbConfig');
var ResCode = require('../utils/ResCode');
var SendRes = require('../utils/SendRes');
var db = require('../utils/db');
var Users = require('../libs/users');

router.post('/token', function (req, res, next) {

    let key = dbConfig.jwt.key;
    let secret = dbConfig.jwt.secret;
    let token = jwt.sign(
        {
            data: key,
        }, secret, { expiresIn: 60 * 60 } // 1hour
        );

    console.log('token =>', token);
    res.cookie("guest", token);

    SendRes.send(res, ResCode.SUCCESS, {data: token});

});

//테스트용
router.get('/token', function (req, res, next) {

    let key = dbConfig.jwt.key;
    let secret = dbConfig.jwt.secret;
    let token = jwt.sign(
        {
            data: key,
        }, secret, { expiresIn: 60 * 60 } // 1hour
    );

    console.log('token =>', token);
    res.cookie("guest", token);

    SendRes.send(res, ResCode.SUCCESS, {data: token});

});

module.exports = router;

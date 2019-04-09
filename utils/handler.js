let jwt = require("jsonwebtoken");
var dbConfig = require('../configs/dbConfig');
var ResCode = require('../utils/ResCode');
var SendRes = require('../utils/SendRes');

exports.token = (req, res, next) => {

    // 지금은 쿠키로 사용.
    // let token = req.headers['x-access-token'] || req.query.token;

    let guest = req.cookies.guest;

    if (!guest) {
        let message = "you need access token! use /v1/auths/token Post API";
        SendRes.send(res, ResCode.UNAUTHORIZED, {message: message});

    } else {

        let key = dbConfig.jwt.key;
        let secret = dbConfig.jwt.secret;

        try {
            let token = jwt.verify(guest, secret);

            if (token.data != key) {
                let message = "Check alright access token!";
                SendRes.send(res, ResCode.UNAUTHORIZED, {message: message});
            } else {
                next();
            }
        } catch (err) {
            let message = "Check alright access token! (jwt expired)";
            SendRes.send(res, ResCode.UNAUTHORIZED, {message: message});
        }


    }

};

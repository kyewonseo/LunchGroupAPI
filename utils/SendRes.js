var APIResponse = require('../utils/APIResponse');

exports.send = function (res, code, opt) {

    if (opt['data']) {
        APIResponse.code = code;
        APIResponse.data = opt.data;
        res.status(code).send(APIResponse.create())

    } else if (opt['message']) {
        APIResponse.code = code;
        APIResponse.message = opt.message;
        res.status(code).send(APIResponse.create())

    } else {
        APIResponse.code = code;
        res.status(code).send(APIResponse.create())
    }
}

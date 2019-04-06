var Response = require('../utils/Response');
var ResCode = require('../utils/ResCode');

class APIResponse {

    constructor(code, message, data) {
        this._code = code;
        this._message = message;
        this._data = data;
    }

    set code(codeNum) {
        if (codeNum) {
            this._code = codeNum;
        }
    }

    set message(codeCause) {
        if (codeCause != null ||
            codeCause != undefined) {
            this._message = codeCause;
        } else {
            this._message = '';
        }
    }

    set data(data) {
        this._data = data;
    }

    create() {
        return createMessage(this._code, this._message, this._data);
    }
}

function createMessage(codeNumber, codeCause, data) {
    var message = '';
    var cause = '';
    var responseData = {};
    var response = new Response();

    if (codeCause != null ||
        codeCause != undefined) {
        cause = ':' + codeCause;
    }

    if (responseData != null ||
        responseData != undefined) {
        responseData = data;
    }

    switch (codeNumber) {
        case ResCode.SUCCESS :
            message = "Success";
            response.responseStatus = codeNumber;
            response.responseMessage = message;
            response.data = responseData;
            return response;

        case ResCode.FAIL :
            message = "Bad Request" + cause;
            response.responseStatus = codeNumber;
            response.responseMessage = message;
            return response;

        case ResCode.UNAUTHORIZED :
            message = 'Unauthorized' + cause;
            response.responseStatus = codeNumber;
            response.responseMessage = message;
            return response;

        case ResCode.FORBIDDEN :
            message = 'Forbidden' + cause;
            response.responseStatus = codeNumber;
            response.responseMessage = message;
            return response;

        case ResCode.NOTFOUND :
            message = 'Not Found' + cause;
            response.responseStatus = codeNumber;
            response.responseMessage = message;
            return response;

        case ResCode.METHODNOTALLOWED :
            message = 'Method Not Allowed' + cause;
            response.responseStatus = codeNumber;
            response.responseMessage = message;
            return response;

        case ResCode.INTERNALSERVERERROR :
            message = 'Internal Server Error' + cause;
            response.responseStatus = codeNumber;
            response.responseMessage = message;
            return response;

        case ResCode.SERVICEUNAVAILABLE :
            message = 'Service Unavailable' + cause;
            response.responseStatus = codeNumber;
            response.responseMessage = message;
            return response;
    }
}

module.exports = new APIResponse;

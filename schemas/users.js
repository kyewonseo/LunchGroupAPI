var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var usersSchema = require('../models/users');

module.exports = mongoose.model('Users', usersSchema);

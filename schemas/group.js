var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var groupSchema = require('../models/group');

module.exports = mongoose.model('Group', groupSchema, 'Group');

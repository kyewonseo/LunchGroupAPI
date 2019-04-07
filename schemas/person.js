var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var personSchema = require('../models/person');

module.exports = mongoose.model('Person', personSchema, 'Person');

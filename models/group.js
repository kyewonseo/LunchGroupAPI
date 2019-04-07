var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var person = require('../models/person');

var groupSchema = new Schema({
    name: String,
    persons: [person]
});

module.exports = groupSchema;

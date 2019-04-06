var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name: String
});

module.exports = usersSchema;

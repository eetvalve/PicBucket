var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UutisetSchema = new Schema({
    title: String,
    text: {type: String, required: true},
    date: {type: String, required: true},
    created_at: Date,
    updated_at: Date
});

var Uutiset = mongoose.model('Uutiset', UutisetSchema);

module.exports = Uutiset;
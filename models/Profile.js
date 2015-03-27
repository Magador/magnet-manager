/**
 * Created by Magador on 25/03/2015.
 */

var mongoose = require('mongoose');

module.exports = mongoose.model('Profile', {
    _id: { type: String, required: true, index: { unique: true } },
    username: String,
    email: String,
    pass: String
});
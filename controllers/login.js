/**
 * Created by Magador on 07/04/2015.
 */

var Profile = require('../models/Profile'),
    crypto = require('crypto'),
    config = require('../config');

module.exports = {
    get: function(req, res) {
        var shasum = crypto.createHash('sha256').update(req.query.pass + config.salt);
        res.send(shasum.digest("hex"));
    },
    signIn: function(req, res) {
        //Profile.findOne({username: req.body.username, pass: shasum.digest()});
    },
    signOut: function(req, res) {

    },
    signUp: function(req, res) {

    }
};
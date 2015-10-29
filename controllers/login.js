/**
 * Created by Magador on 07/04/2015.
 */

var Profile = require('../models/Profile'),
    crypto = require('crypto'),
    config = require('../config');

var setProfile = function(req, res) {
    var profile = new Profile,
        _id = profile._id = require('mongoose').Types.ObjectId();
    profile.username = req.body.username;
    profile.email = req.body.email;
    profile.pass = crypto.createHash('sha256').update(req.body.pass + config.salt).digest("hex");
    profile.save(function(err) {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        req.session._id = _id;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({connected: true, username: req.body.username, email: req.body.email}));
    });
};

module.exports = {
    get: function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        if(req.session._id) {
            res.end(JSON.stringify({connected: true, user_id: req.session._id}));
        } else {
            res.end(JSON.stringify({connected: false}));
        }
    },
    signIn: function(req, res) {
        Profile.findOne({username: req.body.username, pass: crypto.createHash('sha256').update(req.body.pass + config.salt).digest("hex")})
            .exec(function(err, user) {
                if(err) return res.sendStatus(500);
                if(!user) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({connected: false, cause: "no such user"}));
                } else {
                    req.session._id = user._id;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({connected: true, user_id: req.session._id}));
                }
            });
    },
    signOut: function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({connected: false, data: require('mongoose').Types.ObjectId()}));
    },
    signUp: function(req, res) {
        if(req.session._id) {
            req.session.regenerate(function(err) {
                if(err) {
                    console.error(err);
                    return res.sendStatus(500);
                }
                setProfile(req, res);
            });
        } else {
            setProfile(req, res);
        }
    }
};
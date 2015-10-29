/**
 * Created by Magador on 29/03/2015.
 */

var mongoose = require('mongoose'),
    path = require('path'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    bodyParser = require('body-parser'),
    config = require('./config');
    mongooseAuth = require('./auth');

mongoose.connect(require('url').format(config.mongodb), {
    server: {
        socketOptions: {
            keepAlive: true
        }
    },
    user: mongooseAuth.user,
    pass: mongooseAuth.pass
});

module.exports = function(app) {
    app.set('x-powered-by', false);
    app.set('etag', 'strong');

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(require('express').static(path.join(__dirname, 'static'), {maxAge: '1d'}));

    app.use(session({
        secret: config.salt,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        name: "mmid",
        resave: false
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
};
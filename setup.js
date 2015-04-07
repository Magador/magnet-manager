/**
 * Created by Magador on 29/03/2015.
 */

var mongoose = require('mongoose'),
    serveStatic = require('serve-static'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    config = require('./config');

mongoose.connect('mongodb://'+ config.mongodb +'/magnet-manager', {
    server: {
        socketOptions: {
            keepAlive: true
        }
    }
});

module.exports = function(config, app) {
    app.set('x-powered-by', false);

    app.use(serveStatic('static'/*, {maxAge: '1d'}*/));

    app.use(session({
        secret: 'magnet-manager',
        saveUninitialized: true,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        name: "mmid",
        resave: false
    }));
};
/**
 * Created by Magador on 29/03/2015.
 */

var session = require('express-session'),
    MongoStore = require('connect-mongo')(session);

module.exports = function(config, app) {
    app.set('x-powered-by', false);

    app.use(session({
        store: new MongoStore(),
        name: "mmid"
    }));
};
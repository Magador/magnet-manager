/**
 * Created by Magador on 27/03/2015.
 */

var controllers = require('./controllers/load'),
    bodyParser = require('body-parser').json({});

module.exports = function (app) {
    app.use(function (req, res, next) {
        console.log("request arrived", req.headers.host+req.url);
        //res.send("OK");
        next();
    });

    app.get('/', controllers.index.getIndex);
    app.get('/login', bodyParser, controllers.login.get);

    //app.get('/search/:search', controllers.search.getSearch);

    //app.get('/show/:id', controllers.media.getShowById);
    //app.get('/movie/:id', controllers.media.getMovieById);
    //app.get('/media/:id', controllers.media.getMEdiaById);

    app.get('/recent', controllers.media.getRecent);
    app.get('/top', controllers.media.getTop);

    app.post('/signin', bodyParser, controllers.login.signIn);
    app.post('/signout', controllers.login.signOut);
    app.post('/signup', bodyParser, controllers.login.signUp);

};
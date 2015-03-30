/**
 * Created by Magador on 27/03/2015.
 */

var controllers = require('./controllers/load');

module.exports = function (app) {
    app.use(function(req, res, next) {

        next();
    });

    app.get('/', controllers.index.getIndex);

    app.get('/search/:search', controllers.search.getSearch);

    app.get('/show/:id', controllers.media.getShowById);
    app.get('/movie/:id', controllers.media.getMovieById);
    app.get('/media/:id', controllers.media.getMEdiaById);

};
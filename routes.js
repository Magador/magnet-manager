/**
 * Created by Magador on 27/03/2015.
 */

var controllers = require('./controllers/load');

module.exports = function (app) {
    app.get('/', controllers.index.getIndex);


};
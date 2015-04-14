/**
 * Created by Magador on 27/03/2015.
 */

var request = require('request');

module.exports = {
    getIndex: function(req, res) {
        request('https://yts.to/api/v2/list_movies.json', {json: true}, function(error, response, body) {
            if(error) {
                res.setHeader('content-type', 'application/json');
                res.status(500);
                res.end(JSON.stringify({"status":"error","status_message":"Query was unsuccessful"}));
            }
            if(response.statusCode == 200) {
                res.render('index', {movies: body.data.movies});
            }
        });
    }
};
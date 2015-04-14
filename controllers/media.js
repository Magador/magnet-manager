/**
 * Created by Magador on 14/04/2015.
 */

var request = require('request');

module.exports = {
    getRecent: function(req, res) {
        request('https://yts.to/api/v2/list_movies.json', {json: true}, function(error, response, body) {
            res.setHeader('content-type', 'application/json');
            if(error) {
                res.status(500);
                res.end(JSON.stringify({"status":"error","status_message":"Query was unsuccessful"}));
            }
            if(response.statusCode == 200) {
                res.json(body);
            }
        });
    },
    getTop: function(req, res) {
        request('https://yts.to/api/v2/list_movies.json?sort_by=download_count', {json: true}, function(error, response, body) {
            res.setHeader('content-type', 'application/json');
            if(error) {
                res.status(500);
                res.end(JSON.stringify({"status":"error","status_message":"Query was unsuccessful"}));
            }
            if(response.statusCode == 200) {
                res.json(body);
            }
        });
    }
};
/**
 * Created by Magador on 29/03/2015.
 */

var app = require('express')();


var config = require('./config.js');
// config
require('./setup.js')(config, app);
// routes
require('./routes.js')(app);

app.listen(config.port);
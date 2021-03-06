/**
 * Created by Magador on 27/03/2015.
 */

var fs = require('fs');

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'load.js')
    })
    .forEach(function(file) {
        module.exports[file.replace(/\.js$/, '')] = require('./' + file)
    });
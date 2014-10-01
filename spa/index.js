// ==== SPA
// Logger
var log = require('debug')('cody:spa');
module.exports = function () {
//Requirements
    var express = require('express');
    var path = require('path');
    var morgan = require('morgan');
    log('Init SPA Server');
    var spa = express();
    spa.disable('x-powered-by');
    spa.use(morgan('dev'));
    spa.use(express.static(path.join(__dirname, 'app')));
    spa.use(function (request, response, next) {
        response.header('X-Accept-Language', request.headers['accept-language']);
        next();
    });
    spa.all('/*', function (request, response) {
        response.sendFile(path.join(__dirname, 'app/index.html'));
    });
    if (process.env.NODE_ENV == 'development') {
        log('Setup LiveReload');
        var livereload = require('express-livereload');
        var livereloadconfig = {};
        livereloadconfig.watchDir = path.join(__dirname, 'app');
        livereload(spa, livereloadconfig);
    }
    return spa;
};
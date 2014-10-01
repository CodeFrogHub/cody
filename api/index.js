// ==== API
// Logger
var log = require('debug')('cody:api');
module.exports = function() {
// Requirements
    log('Load Requirements');
    var express = require('express');
    var expressJwt = require('express-jwt');
    var bodyParser = require('body-parser');
    var morgan = require('morgan');
    var conf = require('./config');
// Load Models
    log('Load API Models');
    require('./models');
// DatabaseService
    var databaseService = require('./services/Database');
    databaseService(conf, function (err) {
        if(err) {
            log(err);
        }

        log('After successed connect - try to create SuperAdmin');
        require('./services/SuperAdmin')();
    });
// App
    log('Init App');
    var api = express();
// Config
    log('Use JWT Middleware on /');
    api.use(expressJwt({secret: conf.api.security.secret})
        .unless({path: ['/api/token', '/api/register']}));
    log('Use JSON Bodyparser');
    api.use(bodyParser.json());
    log('Use UrlEnconded BodyParser');
    api.use(bodyParser.urlencoded({
        'extended': true
    }));
    log('Use Request Logger');
    api.use(morgan('dev'));
// Routes
    require('./routes')(api);
// catch 404 and forward to error handler
    api.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
// error handlers
// development error handler
// will print stacktrace
    if (api.get('env') === 'development') {
        api.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });
    }
// production error handler
// no stacktraces leaked to user
    api.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {}
        });
    });
    return api;
};
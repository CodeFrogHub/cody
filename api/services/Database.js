// Logger
var log = require('./Logger')('Database');

log('Load Requirements');
// Requirements
var mongoose = require('mongoose');

log('Setup Database Holder');
// Database holder
var database = null;

log('Setup Retry Counter');
// Counter for retries
var counter = 0;

var connectWithRetry = function(conf, cb) {
    database = mongoose.connect(conf.api.mongodb, function(err) {
        if (err) {
            log('[Try: '+counter+']Failed to connect to mongo on startup - retrying in 5 sec', err);
            counter++;
            if (counter > conf.api.mongodb_max_retries) {
                if(cb !== null) {
                    cb(err);
                }
            }
            setTimeout(function () {
                connectWithRetry(conf, cb);
            }, 5000);
        } else {
            log('Successfully connected to mongo');
            if(cb !== null) {
                cb(null);
            }
        }
    });
};

module.exports = function (conf, cb) {
    if (database === null) {
        log('Init Database');
        connectWithRetry(conf, cb);
    } else {
        log('Found Database Connection');
        if(cb !== null) {
            cb(null);
        }
        return database;
    }
};
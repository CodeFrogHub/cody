// Logger
var log = require('debug')('cody:Config');
// Requirements
log('Load Requirements');
var _ = require('lodash');
log('Get/Set Environment');
var env = process.env.NODE_ENV || 'development';
log('Environment is ' + env);
var config = _.merge( require('./env/all'), require('./env/'+env) || {});
module.exports = config;
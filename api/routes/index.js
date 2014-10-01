var log = require('../services/Logger')('Routes');
var Loader = require('../services/Loader');
var path = require('path');

var controller = Loader(path.join(__dirname, '../controller'));

module.exports = function (app) {
    app.use(require('./token'));
    app.use(require('./register'));
    app.use(require('./home'));
    // app.use('/', require('./projects'));
    // app.use('/', require('./project'));
};
var debug;
debug = require('debug');
module.exports = function(loggerName) {
    if (!loggerName) {
        loggerName = 'cody';
    }
    return debug('cody:' + loggerName);
};
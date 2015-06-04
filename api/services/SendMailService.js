var Email = require('machinepack-email');
var _ = require('lodash');

module.exports.send = function(senderConfig, mailParams, callback) {
    var options = senderConfig;
    options.mail = _.extend(sails.config.mailer.mail, mailParams);
    
    Email.send(options).exec({
        // An unexpected error occurred.
        error: function (err){
            callback(err);
        },
        
        // OK.
        success: function (results){
            callback(null, results);
        }, 
    });
};
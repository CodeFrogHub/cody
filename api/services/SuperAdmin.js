var log = require('./Logger')('SuperAdmin');
var mongoose = require('mongoose');
var generatePassword = require('password-generator');

log('Init SuperAdmin Service');
module.exports = function () {
    log('Trying to create SuperAdmin');

    var User = mongoose.model('User');
    var password = generatePassword(12, false, /\w/);
    User.create({
        name: 'SuperAdmin',
        username: 'SuperAdmin',
        email: 'info@devmexx.com',
        password: password
    }, function (err, superAdmin) {
        if (err) {
            if(err.code == 11000) {
                log('SuperAdmin already exists');
            } else {
                log(err);
            }
        } else {
            log('   SuperAdmin created');
            log('   name: '+superAdmin.name);
            log('   username: '+superAdmin.username);
            log('   email: '+superAdmin.email);
            log('   password: '+password);

            // TODO Send email to super admin with credentials
        }
    });
};
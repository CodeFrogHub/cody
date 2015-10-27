var Passwords = require('machinepack-passwords');

module.exports.encrypt = function(attrs, callback) {
    Passwords.encryptPassword({
      password: attrs.password
    }).exec({
       error: function (err) {
         callback(err);
       },
       success: function (result) {
         attrs.password = result;
         callback();
       }
    });
};

module.exports.check = function(password, encryptPassword, callback) {
    Passwords.checkPassword({
        passwordAttempt: password,
        encryptedPassword: encryptPassword
    }).exec({
        // An unexpected error occurred.
        error: function (err){
            callback(err);
        },
        
        // Password attempt does not match already-encrypted version
        incorrect: function (){
            callback(null, false);
        },
        
        // OK.
        
        success: function (){
            callback(null, true);
        }
    }); 
};
/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  
  types: {
    domain_is_from_codefrog: function(email) {
      return email.indexOf('codefrog.de') !== -1;
    }
  },

  attributes: {
    // USER INFOS
    firstName: 'string',
    lastName: 'string',
    birthday: 'date',
    
    // AUTH INFOS
    email: {
      type: 'email',
      unique: true,
      required: true,
      domain_is_from_codefrog: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8
    },
    
    // STATUS INFOS
    active: {
      type: 'boolean',
      default: false
    },
    
    
    // FORGET PASSWORD INFOS
    forgetPasswordKey: {
      type: 'string'
    },
    forgetPasswordTimestamp: {
      type: 'datetime'
    },
    
    // METHODS
    changePassword: function (newPassword, cb) {
      this.newPassword = newPassword;
      this.save(function (err, u) {
        return cb(err, u);
      });
    },

    validPassword: function (password, cb) {
      PasswordsService.check(password, this.password, cb);
    }
  },
  
  // LIFECYLCE ACTIONS
  beforeCreate: function (newUser, cb) {
    PasswordsService.encrypt(newUser, cb);
  },
  beforeUpdate: function (updatedUser, cb) {
    if (updatedUser.newPassword) {
      PasswordsService.encrypt(updatedUser, cb);
    } else {
      return cb();
    }
  }
};


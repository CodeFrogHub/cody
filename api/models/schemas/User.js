// Logger
var log = require('debug')('cody:api_model_user');
// Requirements
log('Load Requirements');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var conf = require('../../config');
log('Init Schema');
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        caseInsensitive : true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        caseInsensitive : true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: String,
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});
// Before Save we create a hash from Password
log('Setup Pre Save');
UserSchema.pre('save', function (next) {
    var user = this;
    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(conf.api.security.salt_factor, function (err, salt) {
        if(err) {
            return err;
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if(err) {
                return err;
            }
            user.password = hash;
            return next();
        });
    });
});
// Validate username
log('Validate Path for Username');
UserSchema.path('username').validate(function(value, done) {
    var regex = /^[a-zA-Z0-9]+$/;
    return done(regex.test(value));
}, 'Username can not contain special characters');

// Static Method to load a User by Id
log('Setup Static to Load by Id');
UserSchema.statics.loadById = function(id, cb) {
    this.findOne({_id: id}).exec(cb);
};
// Static Method to load a User by Email or Username
log('Setup Static to Load by Email or Username');
UserSchema.statics.loadByEmailOrUsername = function(login, cb) {
    this.loadByEmailOrUsernameWithPassword(login, cb, true);
};
// Static Method to load a User by Email with password
log('Setup Static to Load by Email with password');
UserSchema.statics.loadByEmailOrUsernameWithPassword = function(login, cb, noPass) {
    var regexForEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    var regex = new RegExp(["^",login,"$"].join(""),"i");
    var query = {};
    var pass = '';
    if(!noPass) {
        pass = '+password';
    }
    if(regexForEmail.test(login)) {
        query['email'] = regex;
    } else {
        query['username'] = regex;
    }
    this.findOne(query, pass).exec(cb);
};
// Model Methods
log('Setup Model Methods');
UserSchema.methods = {
    generateRandomToken: function() {
        var chars = '_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        var token = new Date().getTime() + '_';
        for(var x = 0; x <= 15; x++) {
            var i = Math.floor(Math.random() * 62);
            token += chars.charAt(i);
        }
        return token;
    },
    comparePassword: function (candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if(err) {
                return cb(err);
            }
            return cb(null, isMatch);
        });
    }
};
log('Export Model');
module.exports = UserSchema;
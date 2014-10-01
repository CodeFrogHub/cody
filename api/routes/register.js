// Logger
var log = require('debug')('cody:router_register');
// Requirements
log('Load Requirements');
var express = require('express');
var User = require('mongoose').model('User');
var conf = require('../config');
log('Init Router');
var router = express.Router();
log('Setup POST request on /register');
router.post('/register', function (req, res) {
    if(req.body.name == null
        || req.body.username == null
        || req.body.email == null
        || req.body.password == null) {
        return res.json(401, "missing credentials");
    } else {
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        user.save(function (err) {
            if(err) return res.json(401, {status: false, message: 'email already in use'});
            return res.json({status: true});
        });
    }
});
module.exports = router;


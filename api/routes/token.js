// Logger
var log = require('debug')('cody:router_token');
// Requirements
log('Load Requirements');
var express = require('express');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var User = require('mongoose').model('User');
var conf = require('../config');
log('Init Router');
var router = express.Router();
log('Setup POST request on /token');
router.post('/token', function (req, res) {
    if(req.body.login == null || req.body.password == null) {
        return res.json(401, "missing credentials");
    } else {
        User.loadByEmailOrUsernameWithPassword(req.body.login, function (err, user) {
            if (err || user == null) {
                return res.json(401, "wrong credentials");
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
// We are sending the profile inside the token
                    var duration_in_minutes = moment.duration(conf.api.security.token_duration_in_days, 'days').asMinutes();
                    log('Setup Token for ' +user.email+'. Expires in ' +duration_in_minutes);
                    var token = jwt.sign(
                        {_id: user._id, email: user.email, createdAt:user.createdAt},
                        conf.api.security.secret,
                        { expiresInMinutes: duration_in_minutes}
                    );
                    res.json({ token: token });
                });
            }
        });
    }
});
module.exports = router;
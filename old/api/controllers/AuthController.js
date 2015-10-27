/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var rand = require('random-key');
var moment = require('moment');

module.exports = {
  authenticate: function(req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password) {
      return res.json(401, {err: 'email and password required'});
    }

    User.findOneByEmail(email, function(err, user) {
      if (err) return res.json(500, {err: err});

      if (!user) {
        return res.json(401, {err: 'invalid email or password'});
      }

      user.validPassword(password, function(err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid email or password'});
        } else {
          res.json({user: user, token: TokenAuthService.issueToken(user.id)});
        }
      });
    })
  },

  register: function(req, res) {
    var email = req.param('email');
    var password = req.param('password');
    var password_confirm = req.param('password_confirm');
    
    var callbackurl  = req.param('callbackurl');

    if (!email || !password || !password_confirm) {
      return res.json(401, {err: 'email, password and password_confirm required'});
    }

    if (password !== password_confirm) {
      return res.json(401, {err: 'Password doesn\'t match'});
    }
    
    var activationKey = rand.generate();

    User.create({email: email, password: password, activationKey: activationKey}).exec(function(err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      if (user) {
        // Send Email
        SendMailService.send(sails.config.mailer.info, {
          from: sails.config.mailer.info.from,
          to: user.email,
          subject: 'Activate CodeFrog registration.',
          folder: 'registration',
          params: {
            user: user,
            callbackurl: callbackurl
          }
        }, function(err, results) {
          if(err) return res.json(500, {err: err});

          // Response 200 with message
          res.json({info: 'email with instructions sent.'});
          // res.json({user: user, token: TokenAuthService.issueToken(user.id)});
        });
      }
    });
  },
  
  resend_activation: function(req, res) {
    var email = req.param('email');
    var callbackurl  = req.param('callbackurl');
    
    if (!email) {
      return res.json(401, {err: 'email required'});
    }
    
    User.findOneByEmail(email, function(err, user) {
      if (err) return res.json(500, {err: err});
      if (!user) return res.json(401, {err: 'invalid email'});
      
      if(user.active) return res.json(401, {err: 'already active'});
      
      user.activationKey = rand.generate();
      
      user.save(function (err, updated){
         if (err) return res.json(500, {err: err});
         
         // SendMail
         SendMailService.send(sails.config.mailer.info, {
          from: sails.config.mailer.info.from,
          to: user.email,
          subject: 'Activate CodeFrog registration.',
          folder: 'registration',
          params: {
            user: user,
            callbackurl: callbackurl
          }
        }, function(err, results) {
          if(err) return res.json(500, {err: err});

          // Response 200 with message
          res.json({info: 'email with instructions sent.'});
          // res.json({user: user, token: TokenAuthService.issueToken(user.id)});
        });
      });
    });
  },
  
  activate: function(req, res) {
    var email = req.param('email');
    var key = req.param('key');

    if (!email || !key) {
      return res.json(401, {err: 'email and key required'});
    }
    
    User.findOneByEmail(email, function(err, user) {
      if (err) return res.json(500, {err: err});

      if (!user) return res.json(401, {err: 'invalid email'});

      if(user.active) return res.json(401, {err: 'already active'});
      
      if(user.activationKey != key) return res.json(401, {err: 'invalid key'});
      
      user.active = true;
      user.activationKey = null;
      user.save(function(err, u) {
        if (err) return res.json(500, {err: err});

        res.json({user: u, token: TokenAuthService.issueToken(user.id)});
      });
    });
  },

  forget_password: function(req, res) {
    var email = req.param('email');
    var callbackurl  = req.param('callbackurl');

    if (!email) {
      return res.json(401, {err: 'email required'});
    }

    User.findOneByEmail(email, function(err, user) {
      if (err) return res.json(500, {err: err});

      if (!user) return res.json(401, {err: 'invalid email'});

      // Generate ForgetPasswordKey
      user.forgetPasswordKey =  rand.generate();
      // Set TimeStamp
      user.forgetPasswordTimestamp = new Date();

      user.save(function(err, u) {
        // Send Email
        SendMailService.send(sails.config.mailer.info, {
          from: sails.config.mailer.info.from,
          to: u.email,
          subject: 'Forgot password? Verify to change your password.',
          folder: 'forgetpassword',
          params: {
            user: u,
            callbackurl: callbackurl
          }
        }, function(err, results) {
          if(err) return res.json(500, {err: err});

          // Response 200 with message
          res.json({info: 'email with instructions sent.'});
        });
      });
    });
  },

  verify_passwordkey: function(req, res) {
    var email = req.param('email');
    var key = req.param('key');

    if (!email || !key) {
      return res.json(401, {err: 'email and key required'});
    }

    User.findOneByEmail(email, function(err, user) {
      if (err) return res.json(500, {err: err});

      if (!user) return res.json(401, {err: 'invalid email'});

      var diff = moment().diff(user.forgetPasswordTimestamp, 'hours');

      if(diff >= 12) return res.json(401, {err: 'key expired'});

      if(user.forgetPasswordKey != key) return res.json(401, {err: 'invalid key'});

      user.forgetPasswordKey = null;
      user.forgetPasswordTimestamp = null;

      user.save(function(err, u) {
        if (err) return res.json(500, {err: err});

        res.json({user: u, token: TokenAuthService.issueToken(user.id)});
      });
    });
  }
};


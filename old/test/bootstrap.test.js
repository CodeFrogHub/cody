var Sails = require('sails')
  , sails;

before(function (done) {
  Sails.lift({
    // configuration for testing purposes
    port: process.env.PORT || 1338,
    log: {
      level: 'error'
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    },
    mailer: {
      info: {
        from: 'info@codefrog.de',
        service: 'Stub',
        customTransport: 'nodemailer-stub-transport',
        host: null,
        port: null,
        auth: null
      }
    }
  }, function (err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.
    // Load fixtures
    done(err, sails);
  });
});

after(function (done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});

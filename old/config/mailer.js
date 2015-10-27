var path = require("path");

module.exports.mailer = {
  info: {
    from: 'info@codefrog.de',
    service: 'SMTP',
    customTransport: 'nodemailer-smtp-transport',
    host: process.env.MAILER_AUTH_HOST,
    secureConnection: true,
    port: 465,
    auth: {
      user: process.env.MAILER_AUTH_USER,
      pass: process.env.MAILER_AUTH_PASS
    }
  },
  mail: {
    templatesDir: path.resolve(__dirname, '..', 'views', 'mails')
  }
};

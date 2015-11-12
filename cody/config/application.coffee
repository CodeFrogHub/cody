module.exports =
  ip: process.env.IP or ''
  port: process.env.PORT or 3000

  jwt:
    secret: process.env.JWT_SECRET or 'cody.jwt.secret'
    expire: 604800 # 7 days in seconds

  session:
    name: 'cody.sid'
    secret: process.env.SESSION_SECRET or 'cody.session.secret'
    resave: false
    saveUninitialized: true
    cookie:
      maxAge: 360000

  i18n:
    updateFiles: process.env.NODE_ENV isnt 'production'
    directory: "#{__dirname}/locales"
    locales: [
      'de'
    ]
    defaultLocale: 'de'
    cookie: 'cody.i18n'
    extension: '.coffee'

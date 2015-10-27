path = require 'path'

moment = require 'moment'

module.exports = 
  env: process.env.NODE_ENV or 'development'
  port: process.env.PORT or 3000
  ip: process.env.IP or ''
  
  express: require './express'
  waterline: require './waterline'
  bootstrap: require './bootstrap'
  
  secrets:
    api: process.env.API_SECRET_KEY or 'dev secret key'
    ui: process.env.UI_SECRET_KEY or 'dev secret key'
    
  session:
    secret: process.env.SECRET_KEY or 'dev secret key'
    resave: false
    saveUninitialized: true
    
  jwt:
    secret: process.env.JWT_SECRET_KEY or 'dev secret key'
    expire: process.env.JWT_EXPIRE or 604800 # in seconds (default 7 days)
    
  i18n:
    updateFiles: process.env.NODE_ENV isnt 'production'
    directory: path.resolve __dirname, 'locales'
    locales:['en', 'de']
    defaultLocale: 'en'
    cookie: process.env.I18N_COOKIE or 'cody.i18n'
    extension: '.json'
  
  mail:
    host: process.env.MAIL_HOST
    port: process.env.MAIL_PORT
    user: process.env.MAIL_USER
    pass: process.env.MAIL_PASS
    from: process.env.MAIL_FROM
  
  services:
    twitter: {}
    facebook:
      clientId: process.env.FACEBOOK_CLIENT_ID || ''
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ''
      callbackURL: ''
      enableProof: false
    github: {}
    google: {}
    bitbucket: {}
  
  models:
    connection: 'disk'
    
  database:
    adapters:
      disk: require 'sails-disk'
    connections:
      disk:
        adapter: 'disk'
    defaults:
        adapter: 'disk'
        migrate: 'alter'
        
  assets:
    mincer:
      root: path.resolve __dirname, '..'
      production: process.env.NODE_ENV is 'production'
      mountPoint: '/assets'
      manifestFile: path.resolve __dirname, '..', 'public/assets/manifest.json'
      paths: [
        'assets/styles'
        'assets/scripts'
        'assets/templates'
        'assets/vendor'
      ]
    precompile:
      files: [
        
        # images and fonts
        '*.eot',
        '*.svg',
        '*.ttf',
        '*.woff',
        '*.woff2',
        '*.png',
        '*.gif',
        '*.jpg',
        '*.ico',
        '**/*.eot',
        '**/*.svg',
        '**/*.ttf',
        '**/*.woff',
        '**/*.woff2',
        '**/*.png',
        '**/*.gif',
        '**/*.jpg',
        '**/*.ico',
      ]
    
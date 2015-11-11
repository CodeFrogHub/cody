global.App = require '..'
global.Matcher = require './matcher'
global.Factory = require './factory'
global.Request = require('supertest') global.App

before (done) ->
  global.App.bootstrap
    database:
      waterline:
        adapters:
          memory: require 'sails-memory'
        connections:
          memory:
            adapter: 'memory'
        defaults:
          migrate: 'drop'
    modelDefaults:
      connection: 'memory'
  , (err) ->
    App.log "Bootstrap Cody" unless err
    done err

after (done) ->
  App.stop done

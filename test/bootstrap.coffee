global.app = require '../cody'
global.Matcher = require './matcher'
global.Factory = require './factory'

global.request = require('supertest') app

before (done) ->
  app.bootstrap 
    port: 3000
    models:
      connection: 'memory'
    database:
      adapters:
        memory: require 'sails-memory'
      connections:
        memory:
          adapter: 'memory'
  , (err) ->
    console.log "App bootstrapped" unless err
    console.log "--------------------------------------------------------------"
    console.log()
    done err
    
beforeEach (done) ->
  done()
    
afterEach (done) ->
  done()
    
after (done) ->
  app.stop (err) ->
    console.log "--------------------------------------------------------------"
    console.log "Server closed (if were running)" unless err
    done err
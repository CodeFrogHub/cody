http = require 'http'

express = require 'express'
debug = require 'debug'
_ = require 'lodash'

# app
app = global.cody = express()
app.server = http.createServer app

# app log
app.log = debug 'cody'

# app config
app.config = require './config'

app.bootstrap = (config={}, done=(->)) ->
  _.merge app.config, config
  
  app.config.bootstrap app, (err) ->
    throw err if err
    routers = require './routers'
    routers app, (err) ->
      done err

app.start = (config={}, done=(->)) ->
  app.bootstrap config, (err) ->
    throw err if err
    
    app.log "Start Server"
    app.server.listen app.config.port, app.config.ip, (err) ->
      throw err if err
      console.log "Server running at port #{app.config.ip}:#{app.config.port}"
      done()
  
app.stop = (done=(->)) ->
  app.server.close done()
  
module.exports = app
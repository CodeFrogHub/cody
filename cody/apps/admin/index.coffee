express = require 'express'
debug = require 'debug'

app = express()

app.log = debug 'cody:admin'



app.on 'mount', (parent) ->
  app.parent = parent
  app.log "admin mounted on #{app.mountpath}"

module.exports = app

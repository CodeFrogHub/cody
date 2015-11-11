express = require 'express'
debug = require 'debug'

app = express()

app.log = debug 'cody:api'



app.on 'mount', (parent) ->
  app.parent = parent
  app.log "api mounted on #{app.mountpath}"

module.exports = app

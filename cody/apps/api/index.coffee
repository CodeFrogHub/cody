express = require 'express'
debug = require 'debug'

app = express()

app.root = __dirname

app.log = debug 'cody:api'


app.on 'mount', (parent) ->
  app.parent = parent
  app.log "api mounted on #{app.mountpath}"

module.exports = app

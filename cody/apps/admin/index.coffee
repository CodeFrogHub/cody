express = require 'express'
debug = require 'debug'

app = express()

app.root = __dirname

app.log = debug 'cody:admin'


app.on 'mount', (parent) ->
  app.parent = parent
  app.log "admin mounted on #{app.mountpath}"

module.exports = app

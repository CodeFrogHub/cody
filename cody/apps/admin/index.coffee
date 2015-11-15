path = require 'path'

express = require 'express'
debug = require 'debug'

app = express()

app.root = __dirname

app.log = debug 'cody:admin'

app.config = Utils.file.loadAndMerge path.resolve app.root, 'config'
app.controllers = Utils.file.loadAndMerge path.resolve app.root, 'controllers'

app.on 'mount', (parent) ->
  app.log "admin mounted on #{app.mountpath}"
  app.parent = parent
  app.parent.config.express.loadDefaults app
  app.config.routes app

module.exports = app

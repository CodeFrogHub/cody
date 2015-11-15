path = require 'path'

express = require 'express'
debug = require 'debug'

app = express()

app.root = __dirname

app.log = debug 'cody:api'

app.config = Utils.file.loadAndMerge path.resolve app.root, 'config'
app.controllers = Utils.file.loadAndMerge path.resolve(app.root, 'controllers'),
  onFileBasename: true

app.on 'mount', (parent) ->
  app.log "api mounted on #{app.mountpath}"
  app.parent = parent
  app.parent.config.express.loadDefaults app
  app.parent.config.loadMiddlewares app, (err) ->
    throw err if err
    app.config.routes app

module.exports = app

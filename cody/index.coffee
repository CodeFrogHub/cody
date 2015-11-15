http = require 'http'
path = require 'path'

express = require 'express'
debug = require 'debug'
lodash = require 'lodash'
async = require 'async'

global.Utils = require './utils'

#============================================================
app = express()
app.root = __dirname
app.manifest = require '../package.json'
app.server = http.createServer app

app._ = lodash
app.async = async
app.log = debug 'cody'

app.config = Utils.file.loadAndMerge path.resolve app.root, 'config'

#============================================================
app.bootstrap = (config={}, done=(->)) ->

  app.config.bootstrap app, config, done

app.start = (config={}, done=(->)) ->
  app.bootstrap config, (err) ->
    app.server.listen app.config.port, app.config.ip, done

app.stop = (done=(->)) ->
  app.server.close done

#============================================================
module.exports = app

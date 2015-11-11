http = require 'http'
path = require 'path'

express = require 'express'
debug = require 'debug'
lodash = require 'lodash'
async = require 'async'

utils = require './utils'

#============================================================
app = express()
app.server = http.createServer app

app._ = lodash
app.async = async
app.log = debug 'cody'

app.root = __dirname
app.env = app.get 'env'

app.config = {}
configFiles = utils.file.findInPath path.resolve app.root, 'config'
for configFilePath, configFile of configFiles
  app._.merge app.config, require configFilePath
app.utils = utils

#============================================================
app.bootstrap = (config={}, done=(->)) ->
  app._.merge app.config, config
  app.config.bootstrap app, done

app.start = (config={}, done=(->)) ->
  app.bootstrap config, (err) ->
    app.server.listen app.config.port, app.config.ip, done

app.stop = (done=(->)) ->
  app.server.close done

#============================================================
module.exports = app;

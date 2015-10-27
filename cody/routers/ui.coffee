express = require 'express'
Router = express.Router()

Router.get '/*', (req, res) ->
  res.render 'ui/index'

module.exports = Router
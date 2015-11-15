module.exports =
  index: (req, res) ->
    res.json
      info: 'cody'
      version: res.locals.manifest.version

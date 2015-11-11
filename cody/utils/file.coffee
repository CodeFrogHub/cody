fs = require "fs"
path = require "path"

_ = require "lodash"

log = require('debug') 'cody:utils:file'

module.exports.checkPath = (searchPath) ->
  fs.existsSync searchPath

module.exports.findManifest = (targetPath) ->
  manifestPath = path.resolve targetPath, "package.json"
  return require manifestPath if @checkPath targetPath
  return false

module.exports.findInPath = (searchPath, config={}, currentDepth=0) ->
  self = this
  foundFiles = {}

  return foundFiles unless @checkPath searchPath

  defaultConfig =
    recursive: false
    matcher: true
    depth: -1

  config = _.merge defaultConfig, config

  fs.readdirSync searchPath
  .forEach (file) ->
    filePath = path.resolve searchPath, file
    fileStats = fs.lstatSync filePath
    if fileStats.isDirectory() and config.recursive
      if config.depth is -1 or config.depth > currentDepth
        foundFiles[filePath] = self.findInPath filePath, config, currentDepth+1
    else
      matchResult = config.matcher || false
      if _.isFunction config.matcher
        matchResult = config.matcher file, filePath, fileStats

      if matchResult
        foundFiles[filePath] =
          name: file
          stats: fileStats
          basename: path.basename file, path.extname file
          extname: path.extname file

  return foundFiles

module.exports.write = (targetPath, data) ->
  fs.writeFileSync targetPath, str
  log '\x1b[36mcreate\x1b[0m ' + path.relative(process.cwd(), targetPath)

module.exports.isDirectory = (targetPath) ->
  return fs.lstatSync(targetPath).isDirectory() if @checkPath targetPath
  return false

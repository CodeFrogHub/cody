path = require 'path'

describe "Util File", ->
  context "checkPath", ->
    it "should detemine that a given path exists or not", ->
      Utils.file.checkPath(__dirname).should.be.ok
      Utils.file.checkPath("/dummypathxxxxyyyyyy").should.be.not.ok

  context "findManifest", ->
    it "should find manifest of this project", ->
      rootDir = path.resolve __dirname, '..', '..'
      Utils.file.findManifest(rootDir).should.be.ok

  context "findInPath", ->
    it "should find this file in this directory", ->
      files = Utils.file.findInPath __dirname
      files.should.have.property __filename

  context "write", ->
    it "should create a dummy file with given content"

  context "isDirectory", ->
    it "should return true for current directory", ->
      Utils.file.isDirectory(__dirname).should.be.ok

    it "should return false for current file", ->
      Utils.file.isDirectory(__filename).should.be.not.ok

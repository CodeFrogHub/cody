path = require 'path'
module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    watch:
      tests:
        files: ['test/**/*.coffee']
        tasks: ['mochacli:min']
        options:
          debounceDelay: 1000
          interval: 1000
    mochacli:
      options:
        files: ['test/bootstrap.coffee', 'test/**/*.coffee']
        reporter: 'spec'
        compilers: ['coffee:coffee-script/register']
        require: ['should']
        ui: 'bdd'
        quiet: false
        growl: false
        timeout: 5000
        env:
          NODE_ENV: 'test'
          # DEBUG: 'cody,cody:*'
      all: {}
      min:
        options:
          reporter: 'min'
      apps: ['test/bootstrap.coffee', 'test/apps/**/*.coffee']
      admin: ['test/bootstrap.coffee', 'test/apps/admin/**/*.coffee']
      api: ['test/bootstrap.coffee', 'test/apps/api/**/*.coffee']
      models: ['test/bootstrap.coffee', 'test/models/**/*.coffee']
      services: ['test/bootstrap.coffee', 'test/services/**/*.coffee']
      utils: ['test/bootstrap.coffee', 'test/utils/**/*.coffee']

  grunt.loadNpmTasks 'grunt-mocha-cli'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['watch:tests']

  grunt.registerTask 'test', ['mochacli:all']
  #grunt.registerTask 'test:apps', ['mochacli:apps']
  #grunt.registerTask 'test:admin', ['mochacli:admin']
  #grunt.registerTask 'test:api', ['mochacli:api']
  #grunt.registerTask 'test:models', ['mochacli:models']
  #grunt.registerTask 'test:services', ['mochacli:services']
  #grunt.registerTask 'test:utils', ['mochacli:utils']

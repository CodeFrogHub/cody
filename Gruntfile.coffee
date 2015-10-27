module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
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
          DEBUG: 'api:api:*'
      all:{}
      
  grunt.loadNpmTasks 'grunt-mocha-cli'
  grunt.registerTask 'test', ['mochacli:all']
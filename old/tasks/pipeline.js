/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'neon/js/jquery-ui/css/no-theme/jquery-ui-1.10.3.custom.min.css',
  'neon/css/font-icons/entypo/css/entypo.css',
  'neon/css/bootstrap.css',
  'neon/css/neon-core.css',
  'neon/css/neon-theme.css',
  'neon/css/neon-forms.css',
  'neon/css/skins/white.css',
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  
  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/underscore.js',
  'neon/js/jquery-1.11.0.min.js',
  'js/dependencies/angular.min.js',
  'js/dependencies/**/*.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  
  // Neon Theme
  'neon/js/gsap/main-gsap.js',
  'neon/js/jquery-ui/js/jquery-ui-1.10.3.minimal.min.js',
  'neon/js/bootstrap.js',
  'neon/js/joinable.js',
  'neon/js/resizeable.js',
  'neon/js/neon-api.js',
  'neon/js/jquery.validate.min.js',
  'neon/js/morris.min.js',
  'neon/js/toastr.js',
  'neon/js/neon-chat.js',
  'neon/js/neon-custom.js',
  'neon/js/neon-demo.js',
  
  // Application
  'js/application/main.js',
  'js/application/modules/auth/module.js',
  'js/application/modules/error/module.js',
  'js/application/modules/app/module.js',
  'js/application/**/module.js',
  'js/application/**/*.js',
  
  'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});

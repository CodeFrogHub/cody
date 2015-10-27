var path = require("path");

require("coffee-script/register");

var Mincer = require('mincer');
Mincer.logger.use(console);
var production = process.env.NODE_ENV === 'production';

var config = require(path.resolve(__dirname, '..', 'cody/config'));

var env = new Mincer.Environment(config.assets.mincer.root);
env.enable('source_maps');
//env.enable('autoprefixer');

for(var i in config.assets.mincer.paths) {
  env.appendPath(config.assets.mincer.paths[i]);
}

env.jsCompressor = 'uglify';
env.cssCompressor = 'csswring';

env.registerHelper('asset_path', function(name, opts) {
  var assetPath = null;
  var asset = env.findAsset(name, opts);
  if (!asset) throw new Error("File [" + name + "] not found");
  if (production) {
    assetPath = '/assets/' + asset.digestPath;
  } else {
    assetPath = '/assets/' + asset.logicalPath;
  }
  return assetPath;
});

var manifest = new Mincer.Manifest(env, path.resolve(__dirname, '..', 'api/public/assets'));
manifest.compile(config.assets.precompile.files,{
  compress: true,
  sourceMaps: true,
  embedMappingComments: true
}, function(err, data) {
  if(err) {
    console.error(err);
  } else {
    console.info('Finished precompile:');
    console.dir(data);
  }
});
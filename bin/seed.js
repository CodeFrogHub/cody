var path = require("path");
require("coffee-script/register");

var app = require(path.resolve(__dirname, '..', 'cody'));
app.bootstrap({}, function() {
  require(path.resolve(__dirname, '..', 'cody/seed'))(app, function(err) {
    process.exit(err?err.code: 0);
  });
});
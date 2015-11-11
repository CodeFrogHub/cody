var cody = require("./");
cody.start({}, function(error) {
  if(error) {
    console.error(error);
  } else {
    cody.log('Server running on ' + cody.config.host);
  }
});

process.on('exit', function() {
  cody.stop();
});

// Logger
var log = require('debug')('cody:api_models');
// Requirements
log('Load Requirements');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var thisFile = module.filename.slice(__filename.lastIndexOf(path.sep)+1, module.filename.length);
var schemaPath = path.join(__dirname, 'schemas');
var files = fs.readdirSync(schemaPath);
// Models
log('Load API Models');
for(var i = 0; i < files.length; i++) {
    var file = files[i];
    if(file !== thisFile) {
        if(path.extname(file) === '.js') {
            var modelName = path.basename(file, '.js');
            log('Load Model: ' + modelName);
            var schema = require(path.join(schemaPath, modelName));
            exports[modelName] = mongoose.model(modelName, schema);
        }
    }
}
log(Object.keys(exports).length + ' Models loaded');
log(Object.keys(exports));
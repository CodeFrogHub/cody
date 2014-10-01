var log = require('./Logger')('Loader');
log('Init Loader');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var lastLoads = {};
var defaultOptions = {
    excluded: [],
    recursive: true
}
module.exports = function(folderPath, options) {
    lastLoads = {};
    log('Load Folder: '+folderPath);
    options = _.merge(defaultOptions, options);
    log('Options');
    log(options);
    loader(folderPath, options);
    log('Loaded Files: '+(lastLoads.length?lastLoads.length:0));
    log(Object.keys(lastLoads));
    return lastLoads;
};
var loader = function(folderPath, options) {
    var files;
    return files = fs.readdirSync(folderPath).forEach(function(file) {
        var fileName, filePath, loadedFile, stat;
        filePath = folderPath + "/" + file;
        stat = fs.statSync(filePath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                if (path.extname(file) === ".js") {
                    log('Found: '+file);
                    if(options.excluded) {
                        if(!contains(options.excluded, file)) {
                            fileName = path.basename(file, ".js");
                            loadedFile = require(path.join(folderPath, fileName));
                            return lastLoads[fileName] = loadedFile;
                        }
                    } else {
                        fileName = path.basename(file, ".js");
                        loadedFile = require(path.join(folderPath, fileName));
                        return lastLoads[fileName] = loadedFile;
                    }
                }
            }
        } else {
            if(options.recursive) {
                return loadFiles(filePath, options);
            }
        }
    });
};
var contains = function(array, value) {
    return _.contains(array, value);
};
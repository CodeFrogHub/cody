// Logger
var log = require('debug')('cody:Sockets');
// Requirements
var socketIO = require('socket.io');
log('Init Socket.io');
module.exports = function(httpServer) {
    var io = socketIO(httpServer);
    io.on('connection', function (socket) {
        log('Incomming Connection');
        log(socket);
    });
};
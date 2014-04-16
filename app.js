/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 8100);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

var peopleNum = 0;
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
    socket.on('client', function (data) {
        console.log(data);
        peopleNum = peopleNum + 1;
        socket.emit("peopleNum", {num: peopleNum});
        console.log('在线人数:'+peopleNum)
    });
    socket.on('manager_info', function (data) {
        console.log(data);
        socket.broadcast.emit("server_info", data);

    });
    socket.on('manager_img', function (data) {
        console.log(data);
        socket.broadcast.emit("server_img", data);

    });
    socket.on('disconnect', function () {
        peopleNum = peopleNum - 1;
        socket.emit("peopleNum", {num: peopleNum});
        console.log('在线人数:'+peopleNum);
    })
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

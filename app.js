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
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

var NUM = {
        qc: 0,
        jc: 0,
        hy: 0,
        bbs: 0,
        zz: 0,
        fc: 0,
        tg: 0,
        hs:0,
        rc:0
    }
    , NumManager = {
        addNum: function (data) {
            NUM[data]++;

        },
        subNum: function (data) {
            NUM[data]--;

        },
        resetNum: function () {
            console.log('检查小于0')
            for (var i in NUM) {
                if (NUM[i] < 0) {
                    NUM[i] = 0;
                    console.log('小于0的有',i)
                }
            }
        }
    }
io.enable('browser client minification');
io.enable('browser client etag');
io.set('log level', 2);
io.set('heartbeat interval', '30');
io.sockets.on('connection', function (socket) {
    //NumManager.resetNum();
    socket.on('channel', function (data) {
        console.log('加入：' + data.msg);
        socket.room = data.msg;
        socket.join(data.msg);
        NumManager.addNum(data.msg);
        console.log(NUM)
        io.sockets.in('manager').emit("peopleNum", {msg: {obj: NUM} });
    });
    socket.on('manager_info', function (data) {
        console.log(data);
        if (data.room) {
            io.sockets.in(data.room).emit('server_info', data);
        } else {
            io.sockets.emit('server_info', data);
        }
    });
    socket.on('manager_img', function (data) {
        console.log(data);
        if (data.room) {
            io.sockets.in(data.room).emit('server_img', data);
        } else {
            io.sockets.emit('server_img', data);
        }
    });
    socket.on('disconnect', function () {
        if(typeof  socket.room!='undefined'){
            console.log('离开：' + socket.room);
            socket.leave(socket.room);
            NumManager.subNum(socket.room);
            console.log(NUM);
            io.sockets.in('manager').emit("peopleNum", {msg: {obj: NUM} });
        }

    })
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

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
var qc_ = 0, jc_ = 0, hy_ = 0, bbs_ = 0, zz_ = 0, total_ = 0, tg_ = 0, fc_ = 0;
io.enable('browser client minification');
io.enable('browser client etag');
io.set('log level', 3);
io.set('heartbeat interval', '40');
io.sockets.on('connection', function (socket) {

    socket.on('room', function (room) {
        console.log('加入：'+room);
        socket.room = room;
        socket.join(room);
    });

    socket.on('channel', function (data) {
        console.log('上线：' + data.msg);
        switch (data.msg) {
            case 'qc':
                qc_++;
                break;
            case 'fc':
                fc_++;
                break;
            case 'tg':
                tg_++;
                break;
            case 'jc':
                jc_++;
                break;
            case 'bbs':
                bbs_++;
                break;
            case 'hy':
                hy_++;
                break;
            case 'zz':
                zz_++;
                break;
            default :
                break;
        }
        total_ = total_ + 1;
        //socket.broadcast.emit("peopleNum", {msg: {qc: qc_, jc: jc_, hy: hy_, bbs: bbs_, zz: zz_, tg: tg_, total: total_, fc: fc_} });
        io.sockets.in('manager').emit("peopleNum", {msg: {qc: qc_, jc: jc_, hy: hy_, bbs: bbs_, zz: zz_, tg: tg_, total: total_, fc: fc_} });
    });

    socket.on('unchannel', function (data) {
        console.log('下线：' + data.msg);
        switch (data.msg) {
            case 'qc':
                qc_--;
                break;
            case 'tg':
                tg_--;
                break;
            case 'fc':
                fc_--;
                break;
            case 'jc':
                jc_--;
                break;
            case 'bbs':
                bbs_--;
                break;
            case 'hy':
                hy_--;
                break;
            case 'zz':
                zz_--;
                break;
            default :
                break;
        }
        total_ = total_ - 1;
        //socket.broadcast.emit("peopleNum", {msg: {qc: qc_, jc: jc_, hy: hy_, bbs: bbs_, zz: zz_, tg: tg_, total: total_, fc: fc_} });
        io.sockets.in('manager').emit("peopleNum", {msg: {qc: qc_, jc: jc_, hy: hy_, bbs: bbs_, zz: zz_, tg: tg_, total: total_, fc: fc_} });
    });

    socket.on('manager_info', function (data) {
        console.log(data);
        //socket.broadcast.emit("server_info", data);
        if (data.room) {
            io.sockets.in(data.room).emit('server_info', data);
        } else {
            io.sockets.emit('server_info', data);
        }


    });
    socket.on('manager_img', function (data) {
        console.log(data);
        //socket.broadcast.emit("server_img", data);
        if (data.room) {
            io.sockets.in(data.room).emit('server_img', data);
        } else {
            io.sockets.emit('server_img', data);
        }
    });

    socket.on('disconnect', function () {
        console.log('离开：' + socket.room);
        socket.leave(socket.room);
    })
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

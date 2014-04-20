
var socket = io.connect('http://sendmsg.0372.cn');

socket.emit('channel', { msg: 'rc' });
socket.emit('room', 'rc');
socket.on('server_info', function (data) {
    $.AdAlert({type: 'msg', msg: data.msg})
});
socket.on('server_img', function (data) {
    $.AdAlert({imgUrl: data.msg.url, link: data.msg.link,type:'img'})
});
window.onbeforeunload = function () {
    socket.emit('unchannel', { msg: 'rc' });
}
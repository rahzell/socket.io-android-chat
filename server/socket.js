

exports.newMessage=function (data) {
    socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
    });
    console.log(socket.username+': '+ data);
};
// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var sio = require('socket.io');
var io = sio.listen(server);

var port = process.env.PORT || 3000;
var ip = process.env.IP || "0.0.0.0";



server.listen(port,ip,function () {
  var adr = server.address();
  console.log('Server listening at '+ adr.address +':' +  adr.port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  socket.on('new message',function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
    console.log(socket.username+': '+ data);
  });

  socket.on('add user', function (username) {
    if (addedUser) return;
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    console.log(socket.username+' joined');

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
      console.log(socket.username+' left');
    }
  });
});

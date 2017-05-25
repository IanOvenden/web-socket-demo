var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
  socket.on('UPDATE_STAGE_TITLE', function(payload){
    console.log(payload);
    io.emit('UPDATE_STAGE_TITLE', payload);
  });
  socket.on('task-title', function(msg){
    console.log(msg);
    io.emit('task-title', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

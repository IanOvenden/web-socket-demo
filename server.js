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
  socket.on('RECEIVE_BOARDS', function(payload){
    console.log(payload);
    io.emit('RECEIVE_BOARDS', [
    {
        "id": 3,
        "name": "Project BADGERXX",
        "public": false,
        "role": "admin",
        "favourite": true,
        "theme": "blue",
        "archived": false,
        "created": "2015-08-05T08:40:51.620Z",
        "modified": "2017-01-09T08:40:51.620Z",
        "_links" : {
            "self": {"href":"/snapi/boards/3"},
            "createdBy": {"href":"/snapi/users/george"},
            "modifiedBy": {"href":"/snapi/users/ringo"} 
        }
    }, 
    {
        "id": 4,
        "name": "Project Z",
        "public": true,
        "role": "admin",
        "favourite": false,
        "theme": "blue",
        "archived": false,
        "created": "2016-01-03T09:45:00.120Z",
        "modified": "2017-01-06T12:12:34.111Z",
        "_links" : {
            "self": {"href":"/snapi/boards/4"},
            "createdBy": {"href":"/snapi/users/paul"},
            "modifiedBy": {"href":"/snapi/users/ringo"}
        }
    }, 
    {
        "id": 1,
        "name": "Project X",
        "description": "This board if for managing project X",
        "public": false,
        "role": "member",
        "favourite": false,
        "theme": "green",
        "archived": false,
        "created": "2013-04-22T16:23:09.920Z",
        "modified": "2017-01-03T18:02:27.223Z",
        "_links" : {
            "self": {"href":"/snapi/boards/1"},
            "createdBy": {"href":"/snapi/users/john"},
            "modifiedBy": {"href":"/snapi/users/ringo"}
        }
    }, 
    {
        "id": 2,
        "name": "Home",
        "public": false,
        "role": "member",
        "favourite": false,
        "theme": "post-it-notes",
        "archived": true,
        "created": "2014-06-12T13:12:16.320Z",
        "modified": "2017-01-01T11:56:16.727Z",
        "_links" : {
            "self": {"href":"/snapi/boards/2"},
            "createdBy": {"href":"/snapi/users/goerge"},
            "modifiedBy": {"href":"/snapi/users/paul"}
        }
    }
]);
  });
  socket.on('task-title', function(msg){
    console.log(msg);
    io.emit('task-title', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

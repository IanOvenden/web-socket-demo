
var http = require('http');
var express = require('express');
var cors = require('cors');
var WSS = require('ws').Server;

var app = express().use(express.static('public'));

app.use(cors());

var server = http.createServer(app);

app.listen(8090, 'web.sockets');

var wss = new WSS({ port: 8091 });

wss.on('connection', function(socket) {
  console.log('Opened Connection 🎉');

  socket.on('message', function(message) {
    console.log('Received: ' + message);

    wss.clients.forEach(function each(client) {
      var json = message;
      client.send(json);
      console.log('Sent: ' + json);
    });
  });

  socket.on('close', function() {
    console.log('Closed Connection 😱');
  });

});

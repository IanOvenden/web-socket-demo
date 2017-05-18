
var socket = new WebSocket('ws://localhost:8081/');
socket.onopen = function(event) {
  console.log('Opened connection 🎉');
}

socket.onerror = function(event) {
  console.log('Error: ' + JSON.stringify(event));
}

socket.onmessage = function (event) {
  console.log('Received: ' + event.data);
  var payload = JSON.parse(event.data);
  var newTitle = payload.message;
  log( 'message: ' + newTitle );
  document.querySelector('.list-header').value = newTitle;
}

socket.onclose = function(event) {
  log('Closed connection 😱');
}

document.querySelector('#close').addEventListener('click', function(event) {
  socket.close();
  log('Closed connection 😱');
});

document.querySelector('#send').addEventListener('click', function(event) {
  var json = JSON.stringify({ message: 'Hey there' });
  socket.send(json);
  log('Sent: ' + json);
});

document.querySelector('.list-header').addEventListener('change', function(event) {
  var val = document.querySelector('.list-header').value;
  var json = JSON.stringify({ message: val });
  socket.send(json);
  log('Sent: ' + json);
});

var log = function(text) {
  var li = document.createElement('li');
  li.innerHTML = text;
  document.getElementById('log').appendChild(li);
}

window.addEventListener('beforeunload', function() {
  socket.close();
});

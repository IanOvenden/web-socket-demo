
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

	switch(payload.type) {
		case 'list-title':
			document.querySelector('#list-title-' + payload.id).value = payload.message;
			break;
		case 'task-title':
			document.querySelector('#task-title-' + payload.id).value = payload.message;
			break;
	}
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

var listTitles = document.querySelectorAll('.list-header');

for (var i = 0; i < listTitles.length; i++) {
    listTitles[i].addEventListener('change', function(event) {
        var json = JSON.stringify({ 
			type: 'list-title',
			id: this.id.replace('list-title-',''),
			message: this.value 
		});
		socket.send(json);
		console.log('Sent: ' + json);
    });
}


var taskTitles = document.querySelectorAll('.task-title');

for (var i = 0; i < taskTitles.length; i++) {
    taskTitles[i].addEventListener('change', function(event) {
        var json = JSON.stringify({ 
			type: 'task-title',
			id: this.id.replace('task-title-',''),
			message: this.value 
		});
		socket.send(json);
		console.log('Sent: ' + json);
    });
}


var log = function(text) {
	var li = document.createElement('li');
	li.innerHTML = text;
	document.getElementById('log').appendChild(li);
}

window.addEventListener('beforeunload', function() {
	socket.close();
});

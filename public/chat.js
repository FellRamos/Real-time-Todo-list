
// Connecter au serveur
var socket = io.connect('http://localhost:8080');

// Query the DOM
// var button = document.getElementById('button')
// the same as 
var button = $('#button');
var message = $('tache');



var username = prompt("Quel est votre pseudo?");

socket.emit('user', username);


button.on('click', () => {
	socket.emit('new_todo', message.value );
})


//



// Listening events
socket.on('nick', (user) => {
	alert(`hello ${user}`!)
});

socket.on('new_todo', (user, data) => {
	$('#ol').append(data)
});

socket.on('test', () => {
	console.log('testing from client!')
})
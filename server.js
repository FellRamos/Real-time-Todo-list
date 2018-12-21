// Chargement des modules
var http = require('http'),
	express = require('express'),
	socket = require('socket.io');


// Creation du serveur en utilisant aussi express
var app = express();
var server = http.createServer(app);

// Utilization de Socket.IO (J'ai reste coince des heures, car j'avais cree socketIO avant du serveur!)
var socketIO = socket(server)

// Variables
var listeTaches = [];

// Middleware
app.use(express.static('public'));


// Routes

// Page principal /todo - Affiche la page HTML
app.get('/todo', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
	//console.log("In /todo route!")
});


// Redirection ver la page /todo
app.use('*', (req, res, next) => {
	res.redirect('/todo');
	next();
});


// Sockets
socketIO.on('connection', function(socket) {

	console.log('User connected');

	// Des que le user se connecte, le tableau listeTaches est envoye
	socket.emit('listeTaches', listeTaches);


	// Un client ajoute une tache, donc fait un emit du cote client.
	socket.on('newTask', (tache) => {
		listeTaches.push(tache);
		var index = listeTaches.length - 1;
		socketIO.emit('newTask', {tache: tache, index: index} );
		/*
		Il faut que ce soit socketIO
		(en dehors de ce socket) pour envoyer a tout le monde.. 
		ou alors on fait socket.emit + socket.broadcast.emit 
		*/
	});

	socket.on('deleteTask', (index) => {
		listeTaches.splice(index, 1);
		socketIO.emit('listeTaches', listeTaches);
	});
});


// Port du serveur
server.listen(8080);

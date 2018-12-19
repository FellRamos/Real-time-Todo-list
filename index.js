var express = require('express'),
    // morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieSession =  require('cookie-session'),
    socket = require('socket.io'),
    http = require('http');
    

// Creation de l'app puis du serveur
var app = express();
var server = http.createServer(app);

var urlencodedParser = bodyParser.urlencoded({extended: false});
var io = socket(server);


//app.use(morgan('combined'));
//app.use(cookieSession({secret: 'todosecret'}));

var taches = []; // Cree une liste pour ajouter des taches dans le serveur
//var connections = [];

app.use(express.static('public'));

/*
app.use( (req, res, next) => {
  if (typeof (req.session.taches) == 'undefined') {
    taches == [];
  }
  next();
});
*/



app.get('/todo', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


app.use('*', (req, res) => {
  res.redirect('/todo');
});



io.on('connection', (socket, username) => {

  console.log("User connected")

  socket.emit('test', 'testing from server')
  var socketID = socket.id;
  console.log('somebody connected' , socketID);
  connections.push(socket);
  console.log('Connections: %s sockets connected', connections.length );

  socket.on('user', (username) => {
    socket.username = username;
    user =socket.username;
    socket.emit('nick', user);
    socket.broadcast.emit('new_user', user);
  });

  socket.on('new_todo', (data) => {
    user = docket.username;
    io.emit('new_todo', user, data);
  });







});


server.listen(8000, () => {
  console.log("Listening on port 8000");
});
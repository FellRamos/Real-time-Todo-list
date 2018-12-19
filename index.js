var express = require('express'),
    // morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieSession =  require('cookie-session'),
    socket = require('socket.io'),
    http = require('http');
    


var app = express();
var server = app.listen(8080, () => {
  console.log('Listening on port 8080');
});

var urlencodedParser = bodyParser.urlencoded({extended: false});
var io = socket(server);


//app.use(morgan('combined'));
app.use(cookieSession({secret: 'todosecret'}));


var taches = [];
var users = [];
var connections = [];


app.use( (req, res, next) => {
  if (typeof (req.session.taches) == 'undefined') {
    taches == [];
  }
  next();
});


app.get('/todo', (req, res) => {
  res.render('page.ejs', {taches: taches});
});


app.post('/todo/ajouter', urlencodedParser ,(req, res) => {
  if (req.body.tache != '') {
    taches.push(req.body.tache);
  }
  res.redirect('/todo');
});

app.get('/todo/supprimer/:id', (req, res) => {
  if (req.params.id != '') {
    taches.splice(req.params.id, 1);
  }
  res.redirect('/todo');
})

app.use('*', (req, res) => {
  res.redirect('/todo');
})

io.on('connection', (socket, username) => {
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

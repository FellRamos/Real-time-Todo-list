var express = require('express'),
    socket = require('socket.io'),
    http = require('http');


var app = express();
var server = http.createServer(app);






server.listen(8080);

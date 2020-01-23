var express = require('express');
var socket = require('socket.io');


//App setup
var app = express();
var server = app.listen(1234, function(){ //listening at port 1234
    console.log('listening to requests on port 1234');
});
const path = require("path");

//Static files (what will be displayed on webpage)
app.use(express.static(path.join(__dirname,"public")));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    socket.on('move', function(data){
        //check if move is valid (need to know player's location)
        //move if valid
        //if moved, enemies go
    })
});
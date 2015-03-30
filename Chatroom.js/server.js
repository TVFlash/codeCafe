//This is express's way of creating a new app that listens over http
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//We want to set the default file for our homepage, in this case it's index.html
app.get('/',function(req, res){
      res.sendFile(__dirname + '/index.html');
});

//When our socket has a new connection (someone accesses the page)
io.on('connection', function(socket){
  //We want to emit a 'chat message' to all thoses connected to our socket
  socket.on('chat message', function(msg){
    if(msg != "") //We don't want to send empty messages
      io.emit('chat message', msg);
  });
});

//Listen for connections on port our IP, port 8888
http.listen(8888, function(){
  console.log('listening on localhost:8888');
});

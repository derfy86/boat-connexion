/* eslint-disable prefer-destructuring */
/*
 * Require
 */
const express = require('express');
const bodyParser = require('body-parser');

/*
 * Vars
 */
const app = express();
const port = 10111;
const http = require('http').Server(app);
const io = require('socket.io')(http);
/*
 * Express
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/*
 * Socket.io
 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('Client connected to the WebSocket');
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  
    socket.on('chat message', function(msg) {
      console.log("Received a chat message");
      io.emit('chat message', msg);
    });
})

http.listen(process.env.PORT || 10111, function() {
    console.log('App listening on port' + ' ' + port)
});





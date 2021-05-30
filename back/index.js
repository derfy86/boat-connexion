/* eslint-disable prefer-destructuring */
/*
 * Require
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require("socket.io");
const http = require('http');

/*
 * Vars
 */
const app = express();
const server = http.createServer(app);
console.log(`server`, server)
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 
}

/*
 * Express
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  // response.header('Access-Control-Allow-Credentials', true);
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(cors('*'));

/**
 * Socket / send infos to the front
 */

io.on("connection", (socket) => {
  console.log('>> socket.io - connected');
  socket.on('messages', function(data) {
    console.log(data);
 });
});

io.on("connection", function(socket) {
  console.log(socket.conn.remoteAddress);
});


/**
 * get the infos from multiplexer
 */
// const net = require('net');

// const client = new net.Socket();
// client.connect(3000, '127.0.0.1', function() {
//   console.log('Connected');
// });

// client.on('error', function(err) {
//   console.error('Connection error: ' + err);
//   console.error(new Error().stack);
// });

// client.on('data', function(data) {
//   console.log('Received: ' + data);
// });


/**
 * server listener
 */
server.listen(process.env.PORT || 3000, '127.0.0.1' , function() {
  console.log('App listening on port' + ' ' + port)
});
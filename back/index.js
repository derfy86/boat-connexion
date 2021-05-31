/* eslint-disable prefer-destructuring */
/*
 * Require
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require("socket.io");
const http = require('http');
const net = require('net');

/*
 * Vars
 */
const app = express();
const server = http.createServer(app);
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
 * get the infos from multiplexer
 */

const client = new net.Socket();

client.connect(10111, '127.0.0.1', function() {
  console.log('Connected data to back');
});

client.on('error', function(err) {
  console.error('Connection error: ' + err);
  console.error(new Error().stack);
});

// let myData = [];
client.on('data', function(data) {
  console.log('Received: ' + data);
  // myData.push(data);
  client.emit('test', {msg : data})
});



// app.get('/', (request, response) => {
//   console.log(`myData`, myData[myData.length - 1])
//   response.send('VMS server' + myData[myData.length - 1]);
// });

/**
 * Socket / send infos to the front
 */

// io.on("connection", (socket) => {
//   console.log('>> socket.io - connected');
//   console.log(`myData`, myData[myData.length - 1])
//   socket.on('data', (message) => {
//     io.emit('data', message);
//   });
// });

// io.on("connection", function(socket) {
//   console.log(socket.conn.remoteAddress);
// });

/**
 * server listener
 */
server.listen(process.env.PORT || 3000, '127.0.0.1' , function() {
  console.log('App listening on port' + ' ' + port)
});
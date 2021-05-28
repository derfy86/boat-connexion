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
const port = 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require("socket.io-redis");



/*
 * Express
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Socket
 */

var net = require('net');

var client = new net.Socket();
client.connect(10111, '127.0.0.1', function() {
console.log('Connected');
});

client.on('error', function(err) {
console.error('Connection error: ' + err);
console.error(new Error().stack);
});

client.on('data', function(data) {
console.log('Received: ' + data);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.PORT || 3000, function() {
  console.log('App listening on port' + ' ' + port)
});
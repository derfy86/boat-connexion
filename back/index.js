/*
 * Require
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require("socket.io");
const http = require('http');
const net = require('net');
const dateFormat = require("dateformat");
const convert = require('geo-coordinates-parser');
const formatcoords = require('formatcoords');
const GeoJSON = require('geojson');

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

let lastData = {};
client.on('data', function(data) {
  const raw = data.toString().split(','); //'$GPRMC,100803.76,A,3540.8323100,N,13946.1512988,E,16.3,25.3,020621,173.1,W,A,S*23'

  let converted; // convert to decimal
  let format; // beautify the coords
  let geoJsonIo
  try {
    const convertFully = raw[3] + raw[4] + ' ' + raw[5] + raw[6];
    converted = convert(convertFully);
    format = formatcoords(converted.decimalLatitude, converted.decimalLongitude).format();

    const geoLoc = [
      { name: 'Location A', category: 'home', street: 'Market', lat: converted.decimalLatitude, lng: converted.decimalLongitude },
    ];
    const geo = GeoJSON.parse(geoLoc, {Point: ['lat', 'lng']});
    geoJsonIo = JSON.stringify(geo); // to check on map by geojson.io
  }
  catch {
    console.log('bad getaway')
  }

  let mode; 
  switch(raw[12]){
    case 'A':
      mode = 'autonomous'
      break;
    case 'D':
      mode = 'differential'
      break;
    case 'E':
      mode = 'estimated'
      break;
    case 'M':
      mode = 'manual input'
      break;
    case 'S':
      mode = 'simulated'
      break;
    case 'N':
      mode = 'data not valid'
      break;
    case 'P':
      mode = 'precise'
      break;
    default:
      mode = 'none'
  }

  const magneticVariation = raw[10] && raw[11] !== undefined ? raw[10] + ',' + raw[11] : 'none';

  const dataParsed = {
    type: raw[0].substring(3,7),
    time: raw[1].substring(0,2) + ':' + raw[1].substring(2,4) + ':' + raw[1].substring(4,6),
    status: raw[2] === 'A' ? 'active' : 'void',
    coords: format,
    geoloc: geoJsonIo,
    speed: { knots: Number(raw[7]), Kmh: Number((raw[7]*1.852).toFixed(2)) },
    track: raw[8],
    date: raw[9].substring(0,2) + '.' + raw[9].substring(2,4) + '.' + raw[9].substring(4,6),
    magneticVariation: magneticVariation,
    mode: mode,
    ChecksumData: raw[13].substring(0,4),
  }
  lastData = dataParsed;
});

/**
 * Socket / send the last parsed data to the front
 */
io.on("connection", (socket) => {
  console.log('>> socket.io - connected');
  setInterval(() => {
    console.log(`lastData`, lastData);
    socket.emit('data', lastData);
  }, 1000);
});

io.on("connection", function(socket) {
  console.log(socket.conn.remoteAddress);
});

/**
 * server listener
 */
server.listen(process.env.PORT || 3000, '127.0.0.1' , function() {
  console.log('App listening on port' + ' ' + port)
});
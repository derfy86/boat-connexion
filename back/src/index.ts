import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import net from "net";

import parserService from "./modules/services/parser.service";
import { DataParsedRMC } from "./modules/services/parser.interface";

const init = () => {
  const app = express();
  const server = http.createServer(app);
  const port = Number(process.env.PORT) || 3001;

  const corsOptions = {
    origin: "http://localhost:8080",
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  /** Connection to the TCP port, the wifi module who send the data to the server
   *  payload comes by strings every each second
   *  this payload needs to be parsed befor rendering on front side
   *  '$GPRMC,100803.76,A,3540.8323100,N,13946.1512988,E,16.3,25.3,020621,173.1,W,A,S*23'
   */
  const client = new net.Socket();
  client.connect(10110, "127.0.0.1", function () {
    console.log("Connected data to back");
  });
  client.on("error", function (err) {
    console.error("Connection error: " + err);
    console.error(new Error().stack);
  });
  let dataParsedRMC: DataParsedRMC;
  client.on("data", function (data) {
    const raw = data.toString().split(",");
    if (raw[0] === "$GPRMC") {
      dataParsedRMC = parserService.parseToRMC(raw);
      return dataParsedRMC;
    }
  });

  /** Connection to front side
   *  server send the parsed payload every second
   */
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(">> socket.io - connected");
    setInterval(() => {
      console.log(`dataParsedRMC`, dataParsedRMC);
      socket.emit("data", dataParsedRMC);
    }, 1000);
  });
  io.on("connection", function (socket) {
    console.log(socket.conn.remoteAddress);
  });

  server.listen(port, "127.0.0.1", function () {
    console.log("App listening on port" + " " + port);
  });
};

init();

import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import net from "net";

import parserService from "./modules/services/parser.service";

const init = () => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
    },
  });
  const port = Number(process.env.PORT) || 3001;
  const corsOptions = {
    origin: "http://localhost:8080",
    optionsSuccessStatus: 200,
  };

  app.use((_, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Credentials");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    response.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
  });
  app.use(cors(corsOptions));

  const client = new net.Socket();

  client.connect(10110, "127.0.0.1", function () {
    console.log("Connected data to back");
  });

  client.on("error", function (err) {
    console.error("Connection error: " + err);
    console.error(new Error().stack);
  });

  let dataParsedRMC: any;
  client.on("data", function (data) {
    const raw = data.toString().split(","); //'$GPRMC,100803.76,A,3540.8323100,N,13946.1512988,E,16.3,25.3,020621,173.1,W,A,S*23'
    if (raw[0] === "$GPRMC") {
      dataParsedRMC = this.parserService.parseToRMC(raw);
      return dataParsedRMC;
    }
  });

  /**
   * Socket / send the last parsed data to the front
   */
  io.on("connection", (socket: any) => {
    console.log(">> socket.io - connected");
    setInterval(() => {
      console.log(`dataParsedRMC`, dataParsedRMC);
      socket.emit("data", dataParsedRMC);
    }, 1000);
  });

  io.on("connection", function (socket: any) {
    console.log(socket.conn.remoteAddress);
  });

  server.listen(port, "127.0.0.1", function () {
    console.log("App listening on port" + " " + port);
  });
};

init();

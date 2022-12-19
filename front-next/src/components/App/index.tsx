import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./style.scss";
import MessageData from "../MessageData";
import Mapping from "../Mapping";
import { DataParsedRMC } from "../../../../back/src/modules/services/parser.interface";

let socket: Socket;
const App = () => {
  const endPoint: string = "http://localhost:3001";

  const [data, setData] = useState({});

  useEffect(() => {
    socket = io(endPoint);
    socket.on("connect", () => {
      console.log("socket.connected", socket.connected);
    });
    socket.on("data", (data: DataParsedRMC) => {
      setData(data);
      // {type: "RMC", time: "13:46:54", status: "active", coords: "35° 40′ 54.33600″ N 139° 46′ 11.64000″ E", geoloc: "{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"F…cation A\",\"category\":\"home\",\"street\":\"Market\"}}]}", …}
    });
  }, []);

  return (
    <div className="app">
      <h1 className="app__title">Dashboard type = </h1>
      <MessageData data={data} />
      {/* <Mapping data={data} /> */}
      <div style={{ width: "100%", height: "800px" }} id="mapContainer" />
    </div>
  );
};

export default App;

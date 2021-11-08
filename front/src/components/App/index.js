// == Import npm
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// == Import
import './style.scss';

import MessageData from '../MessageData';
import Mapping from '../Mapping';

let socket;
// == Composant
const App = () => {
  const endPoint = 'http://localhost:3000';

  const [data, setData] = useState({});

  useEffect(() => {
    socket = io(endPoint);
    socket.on('connect', () => {
      console.log('socket.connected', socket.connected);
    });
    socket.on('data', (data) => {
      setData(data); // {type: "RMC", time: "13:46:54", status: "active", coords: "35° 40′ 54.33600″ N 139° 46′ 11.64000″ E", geoloc: "{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"F…cation A\",\"category\":\"home\",\"street\":\"Market\"}}]}", …}
    });
  }, []);

  return (
    <div className="app">
      <h1 className="app__title">Dashboard type = {data.type}</h1>
      <MessageData data={data} />
      {/* <Mapping data={data} /> */}
      <div style={{ width: '100%', height: '800px' }} id="mapContainer" />

    </div>
  );
};

// == Export
export default App;

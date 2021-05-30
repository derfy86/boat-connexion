// == Import npm
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

// == Import
import './style.scss';

import MessageData from '../../components/MessageData';

let socket;
// == Composant
const App = () => {
  
  const endPoint = 'http://localhost:3000'

  const [ data, setData ] = useState([])

  useEffect(() => {
    socket = io(endPoint);

    socket.on("connect", () => {
      console.log('>> socket.io - front - connected');
    });

    socket.on('send_message', (message) => {
      console.log('un message', message);
      setData([...data, message])
    });
  }, []);

  return (
  <div className="app">
    <h1>my dashbord</h1>
    <MessageData />
  </div>
);}

// == Export
export default App;

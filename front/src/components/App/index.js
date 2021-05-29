// == Import npm
import React from 'react';

// == Import
import './style.scss';

import MessageData from '../../components/MessageData';

// == Composant
const App = () => (
  <div className="app">
    <h1>my dashbord</h1>
    <MessageData />
  </div>
);

// == Export
export default App;

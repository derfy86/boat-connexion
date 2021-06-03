// == Import npm
import React from 'react';

// == Import
import './style.scss';

// == Composant
const MessageData = ({data}) => {
  console.log(`data`, data)
  return(
  <>
    <h1>data = {data.coords}</h1>
  </>
);}

// == Export
export default MessageData;

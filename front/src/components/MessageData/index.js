// == Import npm
import React, {useEffect} from 'react';
import axios from 'axios'

// == Import
import './style.scss';
import ReactSpeedometer from "react-d3-speedometer"

// == Composant
const MessageData = ({data}) => {
  console.log(`data`, data);
  let speed; 
  if(data.speed){
    speed = data.speed.knots;
  }
  useEffect(()=>{
  axios.get('https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=AIzaSyAZwZdeAzzPoFFWFQT1VcRErvxdODQlHFA')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });
  })
  return(
  <>
    <p>time = {data.time}</p>
    <p>date = {data.date}</p>
    <p>coords = {data.coords}</p>
    <p>mode = {data.mode}</p>
    <div style={{
      width: "500px",
      height: "300px",
      background: "#EFEFEF"
    }}>
  <ReactSpeedometer
    fluidWidth={true}
    minValue={0}
    maxValue={30}
    value={speed}
    currentValueText={'knots'}
    maxSegmentLabels={5}
    segments={1000}
  />
  </div>
  </>
);}

// == Export
export default MessageData;

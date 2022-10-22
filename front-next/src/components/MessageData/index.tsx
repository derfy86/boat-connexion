import { useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./style.scss";

const MessageData = ({ data }) => {
  let speed;
  if (data.speed) {
    speed = data.speed.knots;
  }
  // useEffect(() => {
  //   axios.get('https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=AIzaSyAZwZdeAzzPoFFWFQT1VcRErvxdODQlHFA')
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .then(() => {
  //     });
  // });
  return (
    <div className="data">
      <div className="data__content">
        <p className="data__text data__time">time UTC : {data.time}</p>
        <p className="data__text">date : {data.date}</p>
        <p className="data__text">coords : {data.coords}</p>
        <p className="data__text">status = {data.status}</p>
        <p className="data__text">mode = {data.mode}</p>
        <p className="data__text">geoJson = {data.geoloc}</p>
      </div>
      <div
        style={{
          width: "500px",
          height: "300px",
          background: "black",
        }}
      >
        {/* <ReactSpeedometer
          fluidWidth
          minValue={0}
          maxValue={30}
          value={speed}
          currentValueText="knots"
          maxSegmentLabels={5}
          segments={1000}
        /> */}
      </div>
    </div>
  );
};

MessageData.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MessageData;

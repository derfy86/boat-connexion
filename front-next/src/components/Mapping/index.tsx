// == Import npm
import React, { useEffect } from "react";
import PropTypes from "prop-types";

// == Import
import "./style.scss";

// == Composant
const Mapping = ({ data }) => {
  const coordForMap = data.coords;
  const loadMap = (coordForMap) => {
    console.log("coordForMap", coordForMap);
    document.getElementById("mapContainer").remove();
    const mapDiv = document.createElement("div");
    mapDiv.id = "mapContainer";
    mapDiv.style = "width: 100%; height: 800px";
    document.body.appendChild(mapDiv);
    const platform = new H.service.Platform({
      apikey: "8gDtuk65A_iFp9DRCBtHA37m4kEgDQpCwIAhh2YAZFs",
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(
      document.getElementById("mapContainer"),
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: { lat: 35.4, lng: 139.46 },
      }
    );
  };

  useEffect((coordForMap) => {
    loadMap();
    setInterval((coordForMap) => {
      loadMap(coordForMap);
    }, 7000);
  }, []);

  return (
    <div className="map">
      <p>MAP</p>
      <button onClick={loadMap} type="button">
        X
      </button>
    </div>
  );
};

Mapping.propTypes = {
  data: PropTypes.object.isRequired,
};

// == Export
export default Mapping;

// == Import npm
import React, { useEffect } from 'react';

// == Import
import './style.scss';

// == Composant
const Mapping = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://js.api.here.com/v3/3.1/mapsjs.bundle.js';
    script.type = 'module';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  //   /**
  //  * Moves the map to display over Berlin
  //  *
  //  * @param  {H.Map} map      A HERE Map instance within the application
  //  */
  //   function moveMapToBerlin(map) {
  //     map.setCenter({ lat: 52.5159, lng: 13.3777 });
  //     map.setZoom(14);
  //   }

  //   /**
  //  * Boilerplate map initialization code starts below:
  //  */

  //   // Step 1: initialize communication with the platform
  //   // In your own code, replace variable window.apikey with your own apikey
  //   const platform = new H.service.Platform({
  //     apikey: window.apikey,
  //   });
  //   const defaultLayers = platform.createDefaultLayers();

  //   // Step 2: initialize a map - this map is centered over Europe
  //   const map = new H.Map(document.getElementById('map'),
  //     defaultLayers.vector.normal.map, {
  //       center: { lat: 50, lng: 5 },
  //       zoom: 4,
  //       pixelRatio: window.devicePixelRatio || 1,
  //     });
  //   // add a resize listener to make sure that the map occupies the whole container
  //   window.addEventListener('resize', () => map.getViewPort().resize());

  //   // Step 3: make the map interactive
  //   // MapEvents enables the event system
  //   // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  //   const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  //   // Create the default UI components
  //   const ui = H.ui.UI.createDefault(map, defaultLayers);

  //   // Now use the map as required...
  //   window.onload = function () {
  //     moveMapToBerlin(map);
  //   };

  return (
    <div className="map">
      map
    </div>
  );
};

// == Export
export default Mapping;

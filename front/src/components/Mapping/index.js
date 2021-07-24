// == Import npm
import React, { useEffect } from 'react';

// == Import
import './style.scss';

// == Composant
const Mapping = () => {
  useEffect(() => {
    const scriptBundleMap = document.createElement('script');

    scriptBundleMap.src = 'https://js.api.here.com/v3/3.1/mapsjs.bundle.js';
    scriptBundleMap.type = 'module';
    scriptBundleMap.async = true;

    const scriptMapClassic = document.createElement('script');
    scriptMapClassic.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js';
    scriptMapClassic.type = 'text/javascript';
    scriptMapClassic.charset = 'utf8';

    const scriptMapClassicSecond = document.createElement('script');
    scriptMapClassicSecond.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js';
    scriptMapClassicSecond.type = 'text/javascript';
    scriptMapClassicSecond.charset = 'utf8';

    document.body.appendChild(scriptBundleMap);
    document.body.appendChild(scriptMapClassic);
    document.body.appendChild(scriptMapClassicSecond);

    return () => {
      document.body.removeChild(scriptBundleMap);
      document.body.removeChild(scriptMapClassic);
      document.body.removeChild(scriptMapClassicSecond);
    };
  }, []);

  /**
   * @param  {H.Map} map      A HERE Map instance within the application
   */
  function moveMapToBerlin(map) {
    map.setCenter({ lat: 52.5159, lng: 13.3777 });
    map.setZoom(14);
  }

  const platform = new H.service.Platform({
    apikey: window.apikey,
  });
  const defaultLayers = platform.createDefaultLayers();

  // const map = new H.Map(document.getElementById('map'),
  //   defaultLayers.vector.normal.map, {
  //     center: { lat: 50, lng: 5 },
  //     zoom: 4,
  //     pixelRatio: window.devicePixelRatio || 1,
  //   });
  // window.addEventListener('resize', () => map.getViewPort().resize());

  // const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // const ui = H.ui.UI.createDefault(map, defaultLayers);

  // window.onload = function () {
  //   moveMapToBerlin(map);
  // };

  return (
    <div className="map">
      map
    </div>
  );
};

// == Export
export default Mapping;

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import { useState } from "react";

const MapBox = () => {
  // get screenshot of map here

  // default viewport settings
  const [viewPort, setViewPort] = useState({
    width: "100 %",
    height: "100%",
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 6,
  });

  //  default marker location
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 28.6448,
    longitude: 77.216,
  });

  // onClick for geolocate
  const handleGeolocate = (position) => {
    setMarkerLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  return (
    <div className=" relative h-full w-full">
      <div className=" h-full w-full">
        <Map
          onMove={(evt) => setViewPort(evt.viewState)}
          {...viewPort}
          mapboxAccessToken={process.env.REACT_APP_MAP}
          mapStyle="mapbox://styles/ansh225/clkqvfw9600o201pbh3l0ht8q"
        >
          <Marker
            latitude={markerLocation.latitude}
            longitude={markerLocation.longitude}
          />

          <NavigationControl position="bottom-right" />
          <GeolocateControl
            position="top-left"
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showUserHeading={true}
            onGeolocate={handleGeolocate}
          />
        </Map>
      </div>
    </div>
  );
};

export default MapBox;

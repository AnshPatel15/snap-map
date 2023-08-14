import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import { useState } from "react";
import { useRef } from "react";
import { useScreenshotContext } from "../contexts/ScreenshotContext";

const MapBox = () => {
  // screenshot of map
  const ref = useRef(null);

  const [image, setImage] = useState(null);

  const { screenshot, setScreenshot } = useScreenshotContext();

  const handleScreenshot = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAP;
    const { latitude, longitude, zoom } = viewPort;
    const markerLatitude = markerLocation.latitude;
    const markerLongitude = markerLocation.longitude;
    const staticImageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s(${markerLongitude},${markerLatitude})/${longitude},${latitude},${zoom}/600x600?access_token=${mapboxAccessToken}`;
    setImage(staticImageUrl);
    setScreenshot(staticImageUrl);
  };

  const [viewPort, setViewPort] = useState({
    width: "100 %",
    height: "100%",
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 6,
  });

  const [markerLocation, setMarkerLocation] = useState({
    latitude: 28.6448,
    longitude: 77.216,
  });

  const handleGeolocate = (position) => {
    setMarkerLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  return (
    <div className=" relative h-full w-full">
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 border-2 border-rose-500 p-1 rounded-md bg-red-500 text-white">
        <button onClick={handleScreenshot}>Take Screenshot</button>
      </div>

      <div ref={ref} className=" h-full w-full">
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

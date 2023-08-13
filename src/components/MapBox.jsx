import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import { useState } from "react";
import { useRef } from "react";
import { useScreenshotContext } from "../contexts/ScreenshotContext";

const MapBox = () => {
  // screenshot of map
  const ref = useRef(null);
  const [image, setImage] = useState(null);

  const { setScreenshot } = useScreenshotContext();

  const handleScreenshot = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAP;
    const { latitude, longitude, zoom } = viewPort;
    const markerLatitude = markerLocation.latitude;
    const markerLongitude = markerLocation.longitude;
    const staticImageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s(${markerLongitude},${markerLatitude})/${longitude},${latitude},${zoom}/600x600?access_token=${mapboxAccessToken}`;
    setImage(staticImageUrl);
    setScreenshot(image);
  };

  console.log("image", setScreenshot);

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
    <div className=" h-full w-full">
      <button onClick={handleScreenshot}>Take screenshot</button>
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
      {image && <img src={image} alt="map screenshot" />}
    </div>
  );
};

export default MapBox;

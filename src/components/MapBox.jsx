import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import { useState } from "react";
import { useRef } from "react";
import { useScreenshotContext } from "../contexts/ScreenshotContext";

const MapBox = () => {
  // getting screenshot of map
  const ref = useRef(null);

  const { setScreenshot } = useScreenshotContext();

  // using mapbox api

  const handleApiSs = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAP;
    const { latitude, longitude, zoom } = viewPort;
    const markerLatitude = markerLocation.latitude;
    const markerLongitude = markerLocation.longitude;
    const staticImageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s(${markerLongitude},${markerLatitude})/${longitude},${latitude},${zoom}/400x400?access_token=${mapboxAccessToken}`;

    const image = new Image();
    image.src = staticImageUrl;
    image.onload = () => {
      setScreenshot(staticImageUrl);
    };
  };

  // locally handling screenshot

  const handleLocalSs = () => {
    const map = ref.current.getMap();

    // Take the screenshot
    const canvas = map.getCanvas();
    const dataUrl = canvas.toDataURL();
    setScreenshot(dataUrl);
  };

  // default viewport location

  const [viewPort, setViewPort] = useState({
    width: "100 %",
    height: "100%",
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 6,
  });

  // default marker location

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
      <div className="flex gap-2 absolute top-2 left-1/2 transform -translate-x-1/2 z-10 ">
        <button
          className="flex flex-row  border-2  border-rose-500 p-1 rounded-md bg-red-500 text-white"
          onClick={handleApiSs}
        >
          Take API Screenshot
        </button>
        <button
          className="flex flex-row border-2 border-rose-500 p-1 rounded-md bg-red-500 text-white"
          onClick={handleLocalSs}
        >
          Take Local Screenshot
        </button>
      </div>

      <div ref={ref} className=" h-full w-full">
        <Map
          onMove={(evt) => setViewPort(evt.viewState)}
          {...viewPort}
          mapboxAccessToken={process.env.REACT_APP_MAP}
          mapStyle="mapbox://styles/ansh225/clkqvfw9600o201pbh3l0ht8q"
          preserveDrawingBuffer={true}
          ref={ref}
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

import React from "react";

import BoxCreate from "./components/BoxCreate";
import MapBox from "./components/MapBox";
import { ScreenshotProvider } from "./contexts/ScreenshotContext";

function App() {
  return (
    <ScreenshotProvider>
      <div className=" text-center bg-gray-700 min-h-screen">
        <span className="">WELCOME</span>
        <div className="flex gap-2 justify-between p-5">
          <div className=" h-[500px] w-[1000px] border-4 rounded-md border-blue-800">
            <MapBox />
          </div>
          <div>
            <BoxCreate />
          </div>
        </div>
      </div>
    </ScreenshotProvider>
  );
}

export default App;

import React from "react";
import { motion } from "framer-motion";
import BoxCreate from "./components/BoxCreate";
import MapBox from "./components/MapBox";
import { ScreenshotProvider } from "./contexts/ScreenshotContext";

function App() {
  return (
    <ScreenshotProvider>
      <div className=" text-center bg-gray-700 min-h-screen">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 1, delay: 1.8 }}
        >
          <span className=" text-white text-3xl">Snap-Map Project</span>
        </motion.div>
        <div className="flex flex-col gap-3 justify-between p-5">
          <motion.div
            initial={{ x: -1800 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 1, delay: 1.8 }}
          >
            <div className=" h-64 sm:h-96 md:h-128 lg:h-160 xl:h-[90vh] w-full xl:w-[90vw]  xl:ml-[67px] self-center border-4 rounded-md border-blue-800">
              <MapBox />
            </div>
          </motion.div>
          <div className="hover:border-2 hover:border-blue-800 self-center">
            <BoxCreate />
          </div>
        </div>
      </div>
    </ScreenshotProvider>
  );
}

export default App;

import { createContext, useContext, useState } from "react";

const ScreenshotContext = createContext();

export const useScreenshotContext = () => useContext(ScreenshotContext);

export const ScreenshotProvider = ({ children }) => {
  const [screenshot, setScreenshot] = useState(null);

  return (
    <ScreenshotContext.Provider value={{ screenshot, setScreenshot }}>
      {children}
    </ScreenshotContext.Provider>
  );
};

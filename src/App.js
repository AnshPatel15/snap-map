import "./App.css";
import MapBox from "./components/MapBox";
import BoxCreate from "./components/BoxCreate";

function App() {
  return (
    <div className=" text-center bg-gray-700 min-h-screen">
      {" "}
      <span className=" text-white text-3xl">Snap-Map Project</span>
      <div className="flex flex-col gap-3 justify-between p-5">
        <div className=" h-64 sm:h-96 md:h-128 lg:h-160 xl:h-[90vh] w-full xl:w-[90vw]  xl:ml-[67px] self-center border-4 rounded-md border-blue-800">
          <MapBox />
        </div>
        <div className="hover:border-2 hover:border-blue-800 self-center">
          <BoxCreate />
        </div>
      </div>
    </div>
  );
}

export default App;

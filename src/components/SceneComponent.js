/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";

export default ({
  antialias,
  engineOptions,
  adaptToDeviceRatio,
  sceneOptions,
  onRender,
  onSceneReady,
  onCanvasMount,
  ...rest
}) => {
  const reactCanvas = useRef(null);
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  console.log("rerender of scene 1: ");

  const resize = () => {
    sceneRef.current.getEngine().resize();
  };

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    if (typeof onCanvasMount === "function") {
      onCanvasMount(canvas);
    }

    engineRef.current = new Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );
    sceneRef.current = new Scene(engineRef.current, sceneOptions);
    if (sceneRef.current.isReady()) {
      onSceneReady(sceneRef.current);
    } else {
      sceneRef.current.onReadyObservable.addOnce((scene) =>
        onSceneReady(scene)
      );
    }

    engineRef.current.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(sceneRef.current);
      sceneRef.current.render();
    });

    if (window) {
      window.addEventListener("resize", resize);
    }

    console.log("rerender of scene 2");

    return () => {
      sceneRef.current.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
      console.log("rerender of scene 3");
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    onCanvasMount,
  ]);

  return <canvas ref={reactCanvas} {...rest} />;
};

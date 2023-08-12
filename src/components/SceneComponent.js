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

  // setting up basic engine and scene (documentation)
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    if (typeof onCanvasMount === "function") {
      onCanvasMount(canvas);
    }

    const engine = new Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
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

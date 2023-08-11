import { useEffect, useState } from "react";
import SceneComponent from "./SceneComponent";

import {
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Texture,
  StandardMaterial,
  Vector4,
} from "@babylonjs/core";

const BoxCreate = () => {
  const [canvasMounted, setCanvasMounted] = useState(false);

  // getting the map screenshot from context

  const handleCanvasMount = (canvas) => {
    if (canvas) setCanvasMounted(true);
  };
  console.log("canvasMounted:", canvasMounted);

  // preventing page scroll on canvas zoom scroll
  useEffect(() => {
    if (!canvasMounted) return;
    console.log("useEffect is running");
    const canvas = document.getElementById("my-canvas-1");

    if (!canvas) return;

    const preventDefaultScroll = (event) => {
      event.preventDefault();
    };

    const enablePageScrolling = () => {
      console.log("enablePageScrolling called");
      window.removeEventListener("wheel", preventDefaultScroll);
      window.removeEventListener("touchmove", preventDefaultScroll);
    };

    const disablePageScrolling = () => {
      console.log("disablePageScrolling called");
      window.addEventListener("wheel", preventDefaultScroll, {
        passive: false,
      });
      window.addEventListener("touchmove", preventDefaultScroll, {
        passive: false,
      });
    };

    canvas.addEventListener("mouseenter", disablePageScrolling);
    canvas.addEventListener("mouseleave", enablePageScrolling);

    // Clean up event listeners when the component unmounts
    return () => {
      canvas.removeEventListener("mouseenter", disablePageScrolling);
      canvas.removeEventListener("mouseleave", enablePageScrolling);
      enablePageScrolling(); // In case the component unmounts while the mouse is inside the canvas
    };
  }, [canvasMounted]);

  const onSceneReady = (scene) => {
    const camera = new ArcRotateCamera(
      "Camera",
      0,
      0,
      10,
      new Vector3(0, 0, 0),
      scene
    );

    camera.setPosition(new Vector3(0, 0, 20));

    const canvas = scene.getEngine().getRenderingCanvas();

    camera.attachControl(canvas, true);

    const light1 = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    light1.intensity = 0.7;

    const light2 = new HemisphericLight("light", new Vector3(0, -1, 0), scene);
    light2.intensity = 0.7;

    const light3 = new HemisphericLight("light", new Vector3(0, 0, 0), scene);
    light3.intensity = 0.1;

    const boxDiffuseTexture = new Texture("logo512.png", scene);

    const faceUV = new Array(6);

    faceUV[0] = new Vector4(1, 1);
    faceUV[1] = new Vector4(-1, 0, 0, 1);
    faceUV[2] = new Vector4(0, 1, 1, 0);
    faceUV[3] = new Vector4(0, 0, 1, 1);

    const mat = new StandardMaterial("", scene);
    mat.diffuseTexture = boxDiffuseTexture;

    let box = MeshBuilder.CreateBox("box", { size: 10, faceUV: faceUV }, scene);
    box.material = mat;

    box.position.y = 1;
  };

  return (
    <div className="">
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        id={"my-canvas-1"}
        onCanvasMount={handleCanvasMount}
      />
    </div>
  );
};

export default BoxCreate;

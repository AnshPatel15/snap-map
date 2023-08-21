import React, { useEffect, useState, useRef, useCallback } from "react";
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
import { useScreenshotContext } from "../contexts/ScreenshotContext";

const BoxCreate = () => {
  const [canvasMounted, setCanvasMounted] = useState(false);

  // getting the map screenshot from context

  const { screenshot } = useScreenshotContext();

  const handleCanvasMount = useCallback((canvas) => {
    if (canvas) setCanvasMounted(true);
  }, []);
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

  // function to persist box and not recreate box every time screenshot changes

  const boxRef = useRef(null);

  const updateBoxTexture = useCallback(() => {
    if (!boxRef.current || !screenshot) return;

    const box = boxRef.current;
    const scene = box.getScene();

    if (box.material.diffuseTexture) {
      box.material.diffuseTexture.dispose();
    }

    const boxDiffuseTexture = new Texture(screenshot, scene);
    box.material.diffuseTexture = boxDiffuseTexture;

    // Calculate the aspect ratio of the image and the box
    const imageAspectRatio = 650 / 400;
    const boxAspectRatio = box.scaling.x / box.scaling.y;

    // Set the uScale and vScale properties of the texture
    if (imageAspectRatio > boxAspectRatio) {
      // Image is wider than the box
      boxDiffuseTexture.uScale = boxAspectRatio / imageAspectRatio;
      boxDiffuseTexture.vScale = 1;
    } else {
      // Image is taller than the box
      boxDiffuseTexture.uScale = 1;
      boxDiffuseTexture.vScale = imageAspectRatio / boxAspectRatio;
    }

    console.log("new texture");
  }, [screenshot]);

  useEffect(() => {
    updateBoxTexture();
  }, [updateBoxTexture]);

  const onSceneReady = useCallback((scene) => {
    console.log("recreated");
    console.log("1st", onSceneReady);

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

    const faceUV = new Array(6);

    faceUV[0] = new Vector4(1, 0, 0, -1);
    faceUV[1] = new Vector4(-1, 0, 0, 1);
    faceUV[2] = new Vector4(0, 1, 1, 0);
    faceUV[3] = new Vector4(0, 0, 1, 1);

    const mat = new StandardMaterial("", scene);

    let box = MeshBuilder.CreateBox("box", { size: 10, faceUV: faceUV }, scene);
    box.material = mat;

    box.position.y = 1;

    boxRef.current = box;
  }, []);

  // console.log("2nd", onSceneReady);

  return (
    <div className="">
      {screenshot && (
        <SceneComponent
          antialias
          onSceneReady={onSceneReady}
          id={"my-canvas-1"}
          onCanvasMount={handleCanvasMount}
        />
      )}
    </div>
  );
};

export default BoxCreate;

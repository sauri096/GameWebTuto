import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import urlMesh from "../assets/models/HVGirl.glb";
import urlRoad from "../assets/models/road__highway.glb";

let canvas;
let engine;

window.onload = () => {
  console.log("Hello World!");
  canvas = document.getElementById("renderCanvas");
  engine = new Engine(canvas, true);
  const scene = createScene();
  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });
};

const createScene = function () {
  const scene = new Scene(engine);
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // Load external mesh
  SceneLoader.ImportMesh("", "", urlMesh, scene, function (newMeshes) {
    // Set the target of the camera to the first imported mesh
    newMeshes[0].name="player";
    newMeshes[0].scaling=new Vector3(0.02,0.02,0.01);
    camera.target = newMeshes[0];
  });
    SceneLoader.ImportMesh("", "", urlRoad, scene, function (newMeshes) {
      // Set the target of the camera to the first imported mesh
      newMeshes[0].name = "road";
     // newMeshes[0].scaling = new Vector3(0.02, 0.02, 0.01);
      //camera.target = newMeshes[0];
    });

  // Show the inspector
  Inspector.Show(scene, {});

  return scene;
};

// function animateBox(box) {
//   engine.runRenderLoop(function () {
//     box.position.y += 0.002;
//   });
// }

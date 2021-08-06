import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  init();
  render();
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}

//////////////
// Variables
//////////////

// The <div> element to be added to the body of the html document
let container;

// Holds details about the camera
let camera;

// Holds all of the 3d elements of the scene (e.g. geometries, lighting, etc.)
let scene;

// Defines how to render things to the browser (takes camera and scene as inputs)
let renderer;

// let raycaster;

function init() {
  setupContainer();
  setupcamera();
  setupScene();
  setupRenderer();
}

function setupContainer() {}
function setupcamera() {}
function setupScene() {}
function setupRenderer() {}

function render() {}

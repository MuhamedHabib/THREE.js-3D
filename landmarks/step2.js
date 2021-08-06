import * as THREE from 'three'
import { WEBGL } from './webgl'

// The <div> element to be added to the body of the html document
let container;

// Holds details about the camera
let camera;

// Holds all of the 3d elements of the scene (e.g. geometries, lighting, etc.)
let scene;

// Defines how to render things to the browser (takes camera and scene as inputs)
let renderer;

// let raycaster;

if (WEBGL.isWebGLAvailable()) {
  init();
  render();
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}

function init() {
  setupContainer();
  setupScene();
  setupCamera();
  setupRenderer();

  container.appendChild( renderer.domElement );
}

function setupContainer() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
}

function setupCamera() {
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10 );
    camera.position.set( 0, 1.6, 3 );
}

function setupScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xff0000 );
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
}

function render() {
    renderer.render( scene, camera );
}

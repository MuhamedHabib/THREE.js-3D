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

    const cube = createCube(0.2, 0, 1, 0);
    scene.add( cube );

    // scene.add( new THREE.HemisphereLight( 'yellow', 'brown' ) );

    const light = createLight('yellow', 1, 0, 2, 2);
    scene.add( light );

    const ground = createGround(4);
    scene.add( ground );
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

function createCube(size, posX, posY, posZ) {
    // Create a quadrilateral. Since all sizes are equal you get a cube.
    const geometry = new THREE.BoxGeometry( size, size, size )

    // Defines material of the cube (e.g. colour)
    const material = new THREE.MeshStandardMaterial( {
        color: 'white',
        roughness: 0.7,
        metalness: 0.0
    } );
    const object = new THREE.Mesh( geometry, material );

    // Set the position of the cube
    object.position.x = posX;
    object.position.y = posY;
    object.position.z = posZ;

    // Set the rotation
    object.rotation.x = 0;
    object.rotation.y = 1;
    object.rotation.z = 1;

    object.castShadow = true;
    object.receiveShadow = true;

    return object;
}

function createLight(color='yellow', intensity=1, x, y, z) {
    const light = new THREE.DirectionalLight( color, intensity );
    light.position.set( x, y, z );

    // Turn on shadows
    light.castShadow = true;

    // Optional: Increase the quality of the shadow
    // light.shadow.mapSize.set( 4096, 4096 );

    return light;
}

function createGround(size, color=0xeeeeee) {
    const floorGeometry = new THREE.PlaneGeometry( size, size );
    const floorMaterial = new THREE.MeshStandardMaterial( {
        color: color,
        roughness: 1.0,
        metalness: 0.0
    } );
    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    return floor;
}
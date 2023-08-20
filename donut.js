import * as THREE from 'three';

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
const donut3dDiv = document.querySelector('.donut3d');
renderer.setSize(donut3dDiv.clientWidth, donut3dDiv.clientHeight);
donut3dDiv.appendChild(renderer.domElement);

const loader = new GLTFLoader();

// Load the donut model
loader.load("donut.glb", function (gltf) {
	// Get the loaded donut scene
	const donut = gltf.scene;

	// Scale and position the donut
	donut.scale.set(10, 10, 10);
	donut.position.set(0, 0, 0); // Adjust the position as needed

	// Add the donut to the scene
	scene.add(donut);

	// Call the animate function to start rendering
	animate();
});

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);

	// Update the donut's rotation
	if (scene.children.length > 0) {
		const donut = scene.children[0];
		donut.rotation.x += 0.01;
		donut.rotation.y += 0.01;
	}

	renderer.render(scene, camera);
}

animate();
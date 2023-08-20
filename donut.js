import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// GLTFLoader
let donut = null;
const scene = new THREE.Scene();

// camera config
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

camera.position.z = 5;
camera.position.set(2, 1,2); // Place the camera above the sce
camera.lookAt(0, 0, 0); // Look at the center of the scene

const renderer = new THREE.WebGLRenderer();
renderer.setSize(document.querySelector(".donut3d").clientWidth, document.querySelector(".donut3d").clientHeight);
document.querySelector(".donut3d").appendChild(renderer.domElement);

// add light
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(1, 0, 0);

const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(0, 0, 1);
scene.add(light1,light2);

// donut load and config
const loader = new GLTFLoader();
loader.load("donut.glb", function (gltf) {

	donut = gltf;
	donut.scene.scale.set(10, 10, 10);
	// camera.lookAt(0, 0, 0); // Look at the center of the scene


	// Coloring the parts of the donut
	donut.scene.traverse(function (child) {
        if (child.isMesh && child.name === "topping") {
            child.material.color.set("#FFFFFF"); 
        }
        else if (child.isMesh && child.name === "glaze") {
            child.material.color.set("#E4E5C0"); 
        }
        else if (child.isMesh && child.name === "donut") {
            child.material.color.set("#E9967A");
        }
    });

	scene.add(donut.scene);


});


function animate() {
	requestAnimationFrame(animate);

	// Rotate the donut
	if (donut) {
		donut.scene.rotation.y += 0.005; 
	}

	renderer.render(scene, camera);
}

animate();

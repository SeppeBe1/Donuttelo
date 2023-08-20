import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
 
// GLTFLoader
let donut = null;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
document.querySelector(".donut3d")
renderer.setSize(document.querySelector(".donut3d").clientWidth, document.querySelector(".donut3d").clientHeight);
document.querySelector(".donut3d").appendChild(renderer.domElement);

// add light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

// load donut.glb
const loader = new GLTFLoader();
loader.load("donut.glb", function (gltf) {
	// scale
	donut = gltf;
	donut.scene.scale.set(10, 10, 10);

	donut.scene.traverse(function (child) {
        if (child.isMesh && child.name === "topping") {
            // Change the color of the topping material
            child.material.color.set("#FFFFFF"); // Set to red color, change as needed
        }
    });

	donut.scene.traverse(function (child) {
        if (child.isMesh && child.name === "glaze") {
            // Change the color of the topping material
            child.material.color.set("#E4E5C0"); // Set to red color, change as needed
        }
    });

	donut.scene.traverse(function (child) {
        if (child.isMesh && child.name === "donut") {
            // Change the color of the topping material
            child.material.color.set("#E9967A"); // Set to red color, change as needed
        }
    });



	scene.add(donut.scene);
});

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}

animate();


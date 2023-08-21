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
camera.position.set(0, 1.7,3); // Place the camera above the sce
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

//background
const backgroundColor = new THREE.Color('#83d1e5'); // Change this color to your desired background color
scene.background = backgroundColor;

//-----------------------------------------------------------

// donut load and config
const loader = new GLTFLoader();

loader.load("donut.glb", function (gltf) {
    donut = gltf;
    donut.scene.scale.set(10, 10, 10);

	donut.scene.traverse(function (child) {
        if (child.isMesh && child.name === "topping") {
            child.material.color.set("#fffff"); 
        }
        else if (child.isMesh && child.name === "glaze") {
            child.material.color.set("#fc5a8d"); 
        }
        else if (child.isMesh && child.name === "donut") {
            child.material.color.set("#DCD8D4");
        }
    });


    const toppingChoice = document.getElementById('topping');
    const glazeChoice = document.getElementById('glaze');
    const doughChoice = document.getElementById('dough');

    toppingChoice.addEventListener('change', function() {
		console.log(toppingChoice.value)
        let selectedTopping = toppingChoice.value; 

        donut.scene.traverse(function (child) {
            switch(selectedTopping) {
                case 'strawberry':
					if (child.isMesh && child.name === "topping") {
						child.material.color.set("#fc5a8d"); 
					}
                    break;
                case 'twix':
					if (child.isMesh && child.name === "topping") {
						child.material.color.set("#84563c"); 
					}
                    break;
                case 'oreo':
					if (child.isMesh && child.name === "topping") {
						child.material.color.set("#361113"); 
					}
                    break;
            }
        });
    });

    glazeChoice.addEventListener('change', function() {
        let selectedGlaze = glazeChoice.value; // Rename the variable
        // ...

        donut.scene.traverse(function (child) {
            switch(selectedGlaze) {
				case 'strawberry':
					if (child.isMesh && child.name === "glaze") {
						child.material.color.set("#fc5a8d"); 
					}
                    break;
                case 'vanilla':
					if (child.isMesh && child.name === "glaze") {
						child.material.color.set("#cfbfa1"); 
					}
                    break;
                case 'chocolate':
					if (child.isMesh && child.name === "glaze") {
						child.material.color.set("#84563c"); 
					}
                    break;
            }
        });
    });

    doughChoice.addEventListener('change', function() {
        let selectedDough = doughChoice.value; 
		console.log(selectedDough)

        donut.scene.traverse(function (child) {
            switch(selectedDough) {
				case 'vanilla':
					if (child.isMesh && child.name === "donut") {
						child.material.color.set("#DCD8D4"); 
					}
                    break;
                case 'chocolate':
					if (child.isMesh && child.name === "donut") {
						child.material.color.set("#84563c"); 
					}
                    break;

            }
        });
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

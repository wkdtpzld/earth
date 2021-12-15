import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';

let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl');


scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 3;
scene.add(camera);

renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x00000, 0.0);

const controls = new OrbitControls(camera, renderer.domElement);

const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
    bumpMap: THREE.ImageUtils.loadTexture('texture/earthbump.jpg'),
    bumtScale: 0.3
});

const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);

const cloudMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
    transparent: true
});

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

const starGeometry = new THREE.SphereGeometry(80, 64, 64);

const starMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('texture/galaxy.png'),
    side: THREE.BackSide
});

const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

scene.add(earthMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1); 
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

const stats = Stats();
document.body.appendChild(stats.dom);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

// renderer.render(scene, camera);

const animate = () => {
    requestAnimationFrame(animate);
    earthMesh.rotation.y -= 0.0015;
    cloudMesh.rotation.y -= 0.001;
    starMesh.rotation.y -= 0.0002;
    controls.update();
    render();
    stats.update();
}

const render = () => {
    renderer.render(scene, camera);

}


animate();
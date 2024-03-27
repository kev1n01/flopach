import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const model = document.getElementById('model')

const w = window.innerWidth
const h = window.innerHeight
var obj

//render
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(1000, 700)
renderer.setClearColor(0x000000, 0)
model.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(15, w / h, 0.01, 1000)
camera.position.x = -6
camera.position.y = 3.4
camera.position.z = 15
scene.add(camera)


//add light 
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 15)
directionalLight.position.set(0, 1, 0)
scene.add(directionalLight)

//ad ambientlight blue
const ambientLight = new THREE.AmbientLight(0x404040, 5)
scene.add(ambientLight)



//display loading model...
const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
    document.getElementById('loading').classList.add('items-center', 'text-center')
    document.getElementById('loading').style.display = 'block'
};

manager.onLoad = function () {
    document.getElementById('loading').style.display = 'none'
};
manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    document.getElementById('loading').classList.add('items-center', 'text-center')
    document.getElementById('loading').style.display = 'block'
};


//load model 
const loader = new GLTFLoader(manager).setPath('assets/model/')

loader.load('scene.gltf',
    (gltf) => {
        const car = gltf.scene
        car.position.set(.5, 1, 0)
        car.scale.set(1.5, 1.5, 1.5)
        obj = car
        scene.add(car)
    },
    (xhr) => {
    }
    , (error) => {
        console.log('error', error)
    }
)


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enableZoom = false
controls.enablePan = false
controls.minDistance = 5
controls.maxDistance = 30
controls.minPolarAngle = 0.1
controls.maxPolarAngle = 1.5
controls.dampingFactor = 0.01;
controls.rotateSpeed = 1;
controls.target = new THREE.Vector3(0, 0, 0)
controls.update()

// animation
function animation() {
    requestAnimationFrame(animation)
    controls.update()
    obj.rotation.y += 0.001;
    obj.rotation.x += 0.000006;
    renderer.render(scene, camera)
}

animation()


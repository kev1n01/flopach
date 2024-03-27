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
const camera = new THREE.PerspectiveCamera(20, w / h, 0.1, 1000)
// camera.rotation.y = 45 / 180 * Math.PI
// camera.position.x = 40
// camera.position.y = 100
camera.position.z = 10
scene.add(camera)


//add light
const directionalLight = new THREE.DirectionalLight(0xffffff, 10)
directionalLight.position.set(0, 1, 0)
scene.add(directionalLight)

const light = new THREE.AmbientLight(0x404040)
scene.add(light)


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
        car.position.set(1, 0, -5)
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


// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = false
// controls.enableZoom = true
// controls.enablePan = false
// controls.minDistance = 5
// controls.maxDistance = 20
// controls.minPolarAngle = 0.5
// controls.maxPolarAngle = 1.5
// controls.target = new THREE.Vector3(0, 0, 0)
// controls.update()

// animation
function animation() {
    requestAnimationFrame(animation)
    // controls.update()
    obj.rotation.y += 0.002;
    obj.rotation.x += 0.00001;
    renderer.render(scene, camera)
}

animation()


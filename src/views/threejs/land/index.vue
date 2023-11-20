<template>
  <div ref="canvas">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { Water } from "three/examples/jsm/objects/Water";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const canvas = ref()

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
camera.position.set(-50,50,130)

scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2)

// 轨道控制器
const orbits = new OrbitControls(camera, renderer.domElement)

// 创建球形天空
let texture = new THREE.TextureLoader().load('/sky.jpg')
const skyGeometry = new THREE.SphereGeometry(1000, 60, 60)
const skyMaterial = new THREE.MeshBasicMaterial({
  map: texture
})
skyGeometry.scale(1, 1, -1)
const sky = new THREE.Mesh(skyGeometry, skyMaterial)

scene.add(sky)

// 创建动态天空
const video = document.createElement('video')
video.src = '/sky.mp4'
video.loop = true

// 创建水面
const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

const water = new Water(
  waterGeometry,
  {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load( '/Water_1_M_Normal.jpg', function ( texture ) {

      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    } ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined
  }
);
water.position.y = 3
water.rotation.x = -Math.PI / 2
scene.add(water)

// 添加小岛
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/gltf/')
loader.setDRACOLoader(dracoLoader)
loader.load('/model/island2.glb', (gltf) => {
  const sea = gltf.scene
  sea.scale.set(1, 1, 1)
  sea.position.set(0, 0, 0)
  scene.add(sea)
})

// 载入环境纹理hdr
const hdrLoader = new RGBELoader();
hdrLoader.loadAsync("/050.hdr").then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// 添加平行光
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(-100, 100, 10)
scene.add(light)

window.addEventListener('mousemove',() => {
  if(video.paused){
    video.play()
    texture = new THREE.VideoTexture(video)
    skyMaterial.map = texture
    skyMaterial.map.update()
  }
})

window.addEventListener('click', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2)
})

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

onMounted(() => {
  canvas.value.appendChild(renderer.domElement)
  scene.background = new THREE.Color('#ffffff')
  scene.environment = new THREE.Color('#ffffff')
  render()
})
</script>

<style lang="scss" scoped>

</style>
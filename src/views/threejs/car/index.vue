<template>
  <div class="home">
    <div ref="canvas"></div>
    <div class="box1">
      <span>选择车身颜色</span>
      <div class="info">
        <div class="color" v-for="(item, index) in colors" :key="index" @click="selectColor(item)" :style="{backgroundColor: item}"></div>
      </div>
    </div>
    <div class="box2">
      <span>选择贴膜材质</span>
      <div class="info">
        <div class="material" v-for="(item, index) in materials" :key="index" @click="selectMaterial(item)">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { ref, onMounted } from 'vue'

// 渲染的页面
const canvas = ref()

// 网格地面
const gridHelper = new THREE.GridHelper( 10, 10 );
gridHelper.material.opacity = 0.4
gridHelper.material.transparent = true

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0,2,6)

const wheels = []
let carBody = null,face  = null,engineer = null,glass = null

// 一大堆材质
const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 1.0,
  roughness: 0.5,
  refractionRatio: 0.9,
  clearcoat: 1,
  clearcoatRoughness: 0
})
const wheelsMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000,
  metalness: 0,
  roughness: 0.1,
})
const glassMaterial = new THREE.MeshStandardMaterial({
  color: 'black',
  metalness: 0,
  roughness: 0,
  transparent: true,
  opacity: 0.4
})

// 可选颜色和材质
let colors = ['green','red','blue','gray','purple','orange','pink']
let materials = [{name: '磨砂',value: 1},{name: '冰晶',value: 0},{name: '金属',value: 0.5}]

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2)

// 创建轨道控制器
const controls = new OrbitControls( camera, renderer.domElement );

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2)
})

// 渲染函数
const render = () => {
  renderer.render(scene,camera)
  controls && controls.update();
  requestAnimationFrame(render)
}

const selectColor = (color) => {
  bodyMaterial.color.set(color)
}

const selectMaterial = (material) => {
  bodyMaterial.roughness = material.value
}

onMounted(() => {
  canvas.value.appendChild(renderer.domElement)
  scene.background = new THREE.Color('#ffffff')
  scene.environment = new THREE.Color('#ffffff')
  render()
  // 添加网格线
  scene.add(gridHelper)
  // 添加汽车模型
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath("/draco/gltf/")
  loader.setDRACOLoader(dracoLoader)
  loader.load("/model/bmw01.glb",(gltf) => {
    const bmw = gltf.scene
    bmw.traverse((child) => {
      if (child.isMesh) {
        console.log(child.name)
      }
      if (child.isMesh && child.name.includes('轮毂')) {
        wheels.push(child)
        wheels.forEach((wheel) => {
          wheel.material = wheelsMaterial
        })
      }
      if (child.isMesh && child.name.includes('Mesh002')) {
        carBody = child
        carBody.material = bodyMaterial
      }
      if (child.isMesh && child.name.includes('前脸')) {
        face = child
        face.material = bodyMaterial
      }
      if (child.isMesh && child.name.includes('引擎盖_1')) {
        engineer = child
        engineer.material = bodyMaterial
      }
      if (child.isMesh && child.name.includes('挡风玻璃')) {
        glass = child
        glass.material = glassMaterial
      }
    })
    scene.add(bmw)
  })

  // 添加灯光
  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(0, 0, 10);
  scene.add(light1);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, 0, -10);
  scene.add(light2);
  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(10, 0, 0);
  scene.add(light3);
  const light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(-10, 0, 0);
  scene.add(light4);
  const light5 = new THREE.DirectionalLight(0xffffff, 1);
  light5.position.set(0, 10, 0);
  scene.add(light5);
  const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
  light6.position.set(5, 10, 0);
  scene.add(light6);
  const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
  light7.position.set(0, 10, 5);
  scene.add(light7);
  const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
  light8.position.set(0, 10, -5);
  scene.add(light8);
  const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
  light9.position.set(-5, 10, 0);
  scene.add(light9);
})
</script>

<style scoped lang="scss">
@import './index.scss'
</style>
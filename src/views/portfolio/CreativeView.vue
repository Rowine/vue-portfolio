<template>
  <div class="scene-container" ref="container">
    <div class="header-overlay">
      <h1 class="title">Little Tokyo</h1>
      <p class="description">
        An interactive 3D visualization of a Tokyo street scene, featuring detailed architecture 
        and animated elements. This piece showcases the blend of traditional Japanese architecture 
        with modern urban elements.
      </p>
      <div class="interaction-hint">
        <span>🖱️ Click and drag to rotate</span>
        <span>⚲ Scroll to zoom</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const container = ref(null)
let mixer
let clock
let scene, camera, renderer, controls

// Initialize the scene
const init = () => {
  clock = new THREE.Clock()

  // Create scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x111111)

  // Create camera
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.set(5, 2, 8)

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.shadowMap.enabled = true
  container.value.appendChild(renderer.domElement)

  // Add controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0.5, 0)
  controls.update()
  controls.enablePan = false
  controls.enableDamping = true

  // Add lights
  // Ambient light for overall scene brightness
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  // Hemisphere light for sky/ground reflection
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8)
  hemiLight.position.set(0, 20, 0)
  scene.add(hemiLight)

  // Main directional light (sun)
  const mainLight = new THREE.DirectionalLight(0xffffff, 1)
  mainLight.position.set(-3, 10, -10)
  mainLight.castShadow = true
  mainLight.shadow.camera.top = 2
  mainLight.shadow.camera.bottom = -2
  mainLight.shadow.camera.left = -2
  mainLight.shadow.camera.right = 2
  mainLight.shadow.camera.near = 0.1
  mainLight.shadow.camera.far = 40
  mainLight.shadow.bias = -0.001
  scene.add(mainLight)

  // Fill light from the opposite side
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.5)
  fillLight.position.set(5, 8, 5)
  scene.add(fillLight)

  // Rim light for edge highlighting
  const rimLight = new THREE.DirectionalLight(0x9ca1ff, 0.3)
  rimLight.position.set(0, 5, -10)
  scene.add(rimLight)

  // Ground reflection light
  const groundLight = new THREE.PointLight(0xffffff, 0.2)
  groundLight.position.set(0, -1, 0)
  scene.add(groundLight)

  // Set up DRACO loader
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')

  // Load model
  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)
  
  loader.load('/models/LittlestTokyo.glb', (gltf) => {
    const model = gltf.scene
    model.position.set(1, 1, 0)
    model.scale.set(0.01, 0.01, 0.01)
    scene.add(model)

    mixer = new THREE.AnimationMixer(model)
    mixer.clipAction(gltf.animations[0]).play()

    animate()
  })

  // Handle window resize
  window.addEventListener('resize', onWindowResize)
}

// Animation loop
const animate = () => {
  requestAnimationFrame(animate)

  const delta = clock.getDelta()

  if (mixer) {
    mixer.update(delta)
  }

  controls.update()
  renderer.render(scene, camera)
}

// Handle window resize
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Lifecycle hooks
onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  if (container.value) {
    container.value.removeChild(renderer.domElement)
  }
  scene.clear()
  renderer.dispose()
  controls.dispose()
})
</script>

<style scoped>
.scene-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background: #111111;
}

.header-overlay {
  position: absolute;
  top: 60px; /* Add space for the navbar */
  left: 0;
  padding: 2rem;
  max-width: 600px;
  z-index: 10;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  color: white;
  pointer-events: none; /* Allows clicking through to the 3D scene */
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: var(--font-heading);
  background: linear-gradient(120deg, #fff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.interaction-hint {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.interaction-hint span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .header-overlay {
    padding: 1.5rem;
    max-width: 100%;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .interaction-hint {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

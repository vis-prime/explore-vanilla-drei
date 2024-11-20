import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { PerspectiveCamera, Scene, WebGLRenderer, Vector2, Raycaster, Group } from 'three'

// Model and Env

import { BG_ENV } from './BG_ENV'
import { SplatLoader, Splat } from '@pmndrs/vanilla'
import { PolarGridHelper } from 'three'

let stats,
  renderer,
  raf,
  camera,
  scene,
  controls,
  gui,
  pointer = new Vector2()

const mainObjects = new Group()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let onEachFrame = () => {} // runs on every frame frame
let sceneGui, model

export async function SplatDemo(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder('Scene')
  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
  renderer.setSize(window.innerWidth, window.innerHeight)
  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(2, 2, 2)
  camera.name = 'Camera'
  // scene
  scene = new Scene()
  scene.add(mainObjects)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.minDistance = 0.1
  controls.maxDistance = 100
  controls.maxPolarAngle = Math.PI / 1.5
  controls.target.set(0, 0.5, 0)

  transformControls = new TransformControls(camera, renderer.domElement)
  transformControls.addEventListener('dragging-changed', (event) => {
    controls.enabled = !event.value
    if (!event.value) {
    }
  })

  transformControls.addEventListener('change', () => {
    if (transformControls.object) {
      if (transformControls.object.position.y < 0) {
        transformControls.object.position.y = 0
      }
    }
  })
  scene.add(transformControls.getHelper())

  window.addEventListener('resize', onWindowResize)
  document.addEventListener('pointermove', onPointerMove)

  let downTime = Date.now()
  app.addEventListener('pointerdown', () => {
    downTime = Date.now()
  })
  app.addEventListener('pointerup', (e) => {
    if (Date.now() - downTime < 200) {
      onPointerMove(e)
      raycast()
    }
  })

  sceneGui.add(transformControls, 'mode', ['translate', 'rotate', 'scale'])
  const bg_env = new BG_ENV(scene)
  bg_env.setBGType('Color')
  bg_env.bgColor.set('grey')
  bg_env.setEnvType('HDRI')
  bg_env.updateAll()
  bg_env.addGui(sceneGui)

  scene.add(new PolarGridHelper())

  setupSplats()
  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  onEachFrame()
  stats.update()
  // Update the inertia on the orbit controls
  controls.update()

  renderer.render(scene, camera)
}

function animate() {
  raf = requestAnimationFrame(animate)
  render()
}

function raycast() {
  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera)

  // calculate objects intersecting the picking ray
  raycaster.intersectObject(mainObjects, true, intersects)

  if (!intersects.length) {
    transformControls.detach()
    return
  }

  if (intersects[0].object.selectOnRaycast) {
    transformControls.attach(intersects[0].object.selectOnRaycast)
  } else {
    transformControls.attach(intersects[0].object)
  }

  intersects.length = 0
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}

async function setupSplats() {
  const cakewalk = 'https://huggingface.co/cakewalk/splat-data/resolve/main'
  // const dylanebert = 'https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/kitchen'

  const loader = new SplatLoader(renderer, 25000)
  const [dataS, dataK] = await Promise.all([
    new Promise((res) => loader.load(`${cakewalk}/nike.splat`, res)),
    // new Promise((res) => loader.load(`${dylanebert}/kitchen-7k.splat`, res)),
  ])

  const shoe1 = new Splat(dataS, camera, { alphaTest: 0.1 })
  shoe1.scale.setScalar(0.5)
  shoe1.position.set(0, 1.6, 2)
  scene.add(shoe1)

  const shoe2 = new Splat(dataS, camera, { alphaTest: 0.1 })
  shoe2.scale.setScalar(0.5)
  shoe2.position.set(0, 1.6, -1.5)
  shoe2.rotation.set(Math.PI, 0, Math.PI)
  scene.add(shoe2)

  transformControls.attach(shoe2)

  // const kittchen = new Splat(dataK, camera)
  // kittchen.position.set(0, 0.25, 0)
  // scene.add(kittchen)
}

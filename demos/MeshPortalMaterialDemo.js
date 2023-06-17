import * as THREE from 'three'
import {
  ACESFilmicToneMapping,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  WebGLRenderer,
  Vector2,
  Raycaster,
  Group,
  BoxGeometry,
  Color,
  TextureLoader,
  VSMShadowMap,
  CircleGeometry,
  Plane,
  Vector3,
  Matrix4,
  Vector4,
  WebGLRenderTarget,
  DepthTexture,
  DepthFormat,
  UnsignedShortType,
  LinearFilter,
  HalfFloatType,
  RepeatWrapping,
  MathUtils,
} from 'three'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { TEXTURES_LIST } from '../textures/TEXTURES_LIST'
import { Easing, Tween, update } from '@tweenjs/tween.js'
import { BG_ENV } from './BG_ENV'
import { MODEL_LIST } from '../models/MODEL_LIST'
import { MeshReflectorMaterial, BlurPass } from '@pmndrs/vanilla'
import { MeshPortalMaterial } from '../wip/MeshPortalMaterial'

let stats,
  /**
   * @type {WebGLRenderer}
   */
  renderer,
  raf,
  camera,
  camera1,
  /**
   * @type {Scene}
   */
  scene,
  /**
   * @type {Scene}
   */
  scene1,
  controls,
  gui,
  pointer = new Vector2()

const params = {
  printCam: () => {},
}
const mainObjects = new Group()
const textureLoader = new TextureLoader()

const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let useFrame = () => {}
let sceneGui
let portal
/**
 * @type {WebGLRenderTarget}
 */
let scene1RenderTarget

export async function meshPortalMaterialDemo(mainGui) {
  gui = mainGui

  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = VSMShadowMap
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping

  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(6, 3, 6)
  camera.name = 'Camera'

  camera1 = camera.clone()
  camera1.position.set(0, 0, 0)
  camera1.aspect = 1
  camera1.updateProjectionMatrix()
  camera.add(camera1)

  // scene
  scene = new Scene()
  scene1 = new Scene()

  scene.add(camera)

  scene1RenderTarget = new WebGLRenderTarget(1024, 1024, { colorSpace: SRGBColorSpace })

  //   scene.backgroundBlurriness = 0.8

  scene.add(mainObjects)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.minDistance = 0.1
  controls.maxDistance = 100
  controls.maxPolarAngle = Math.PI / 1.5
  controls.target.set(0, 0, 0)

  // transformControls = new TransformControls(camera, renderer.domElement)
  // transformControls.addEventListener('dragging-changed', (event) => {
  //   controls.enabled = !event.value
  //   if (!event.value) {
  //   }
  // })

  // transformControls.addEventListener('change', () => {
  //   if (transformControls.object) {
  //     if (transformControls.object.position.y < 0) {
  //       transformControls.object.position.y = 0
  //     }
  //   }
  // })
  // scene.add(transformControls)

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

  // sceneGui.add(transformControls, 'mode', ['translate', 'rotate', 'scale'])
  // sceneGui.add(scene, "backgroundBlurriness", 0, 1, 0.01)
  // sceneGui.addColor(params, "bgColor").onChange(() => {
  //   scene.background = params.bgColor
  // })

  // const light = new PointLight()
  // light.position.set(5, 5, 5)
  // scene.add(light)

  populateScene()
  populateScene1()

  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  stats.update()
  update() // tween
  // Update the inertia on the orbit controls
  controls.update()
  useFrame()

  renderer.setRenderTarget(scene1RenderTarget)
  renderer.render(scene1, camera1)
  renderer.setRenderTarget(null)
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
    // transformControls.detach()
    return
  }

  if (intersects[0].object.selectOnRaycast) {
    // transformControls.attach(intersects[0].object.selectOnRaycast)
  } else {
    // transformControls.attach(intersects[0].object)
  }

  intersects.length = 0
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}

async function loadModels() {
  // sphere
  const sphere = new Mesh(
    new SphereGeometry(0.5).translate(0, 0.5, 0),
    new MeshStandardMaterial({
      color: getRandomHexColor(),
      roughness: 0,
      metalness: 1,
    })
  )
  sphere.name = 'sphere'
  sphere.castShadow = true
  sphere.receiveShadow = true
  sphere.position.set(2, 0, -1.5)
  mainObjects.add(sphere)

  // cube
  const cube = new Mesh(
    new BoxGeometry(1, 1, 1).translate(0, 0.5, 0),
    new MeshStandardMaterial({
      color: getRandomHexColor(),
      roughness: 0,
      metalness: 1,
    })
  )
  cube.name = 'cube'
  cube.castShadow = true
  cube.receiveShadow = true
  cube.position.set(-2, 0, -1.5)
  mainObjects.add(cube)

  // car
  const gltf = await gltfLoader.loadAsync(MODEL_LIST.porsche_1975.url)
  const model = gltf.scene
  model.name = 'car'
  let carBody
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model

      if (child.name === 'body') carBody = child
    }
  })
  mainObjects.add(model)

  // wheel references
  const wheels = {
    FL: null,
    FR: null,
    R: null,
    steerL: null,
    steerR: null,
    steerVal: 0,
  }

  wheels.R = model.getObjectByName('wheels_rear')

  wheels.steerL = model.getObjectByName('wheel_L')
  wheels.steerR = model.getObjectByName('wheel_R')
  const steerLimit = MathUtils.degToRad(30)
  const tween = new Tween(wheels)
    .to({ steerVal: 1 }, 3000)
    .easing(Easing.Elastic.Out)
    .delay(3000)
    .repeatDelay(5000)
    .repeat(10000)
    .yoyo(true)
    .onUpdate(() => {
      const rotY = MathUtils.mapLinear(wheels.steerVal, 0, 1, -steerLimit, steerLimit)
      wheels.steerL.rotation.y = rotY
      wheels.steerR.rotation.y = rotY
    })
    .start()
}

const color = new Color()
function getRandomHexColor() {
  return '#' + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

function populateScene() {
  scene.background = new Color().set('#aabbcc')

  const axesHelpers = Array.from({ length: 4 }, () => new THREE.AxesHelper(0.1))
  axesHelpers[0].position.set(0.5, 0.5, 0)
  axesHelpers[1].position.set(-0.5, 0.5, 0)
  axesHelpers[2].position.set(0.5, -0.5, 0)
  axesHelpers[3].position.set(-0.5, -0.5, 0)

  scene.add(...axesHelpers)

  const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: scene1RenderTarget.texture })
  )

  scene.add(planeMesh)

  const fol = gui.addFolder('scene')
  fol.open()
  fol.addColor(scene, 'background')
}

function populateScene1() {
  scene1.background = new Color().set('#51c995')

  const geometry = new THREE.TorusKnotGeometry(1, 0.5, 150, 20)
  const material = new THREE.MeshStandardMaterial({
    metalness: 0,
    roughness: 0.2,
    color: 0xff0000,
  })

  const torusMesh = new THREE.Mesh(geometry, material)
  scene1.add(torusMesh)
  torusMesh.receiveShadow = true

  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.color.setHSL(0.1, 1, 0.95)
  dirLight.position.set(-1, 1.75, 1)
  dirLight.position.multiplyScalar(5)
  dirLight.castShadow = true

  dirLight.shadow.mapSize.width = 1024
  dirLight.shadow.mapSize.height = 1024

  const d = 5

  dirLight.shadow.camera.left = -d
  dirLight.shadow.camera.right = d
  dirLight.shadow.camera.top = d
  dirLight.shadow.camera.bottom = -d
  dirLight.shadow.bias = -0.0001

  scene1.add(dirLight)

  const fol = gui.addFolder('scene1')
  fol.open()
  fol.addColor(scene1, 'background')
}

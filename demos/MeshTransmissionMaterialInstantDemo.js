import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { MeshTransmissionMaterial, setupMeshTransmissionMaterial } from '../wip/MTMInstant'
import {
  ACESFilmicToneMapping,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
  Vector2,
  Raycaster,
  Group,
  VSMShadowMap,
  Clock,
  WebGLRenderTarget,
  LinearFilter,
  HalfFloatType,
  NoToneMapping,
  BackSide,
} from 'three'

// Model and Env
import { MODEL_LIST } from '../models/MODEL_LIST'
import { BG_ENV } from './BG_ENV'
import { Mesh } from 'three'
import { TorusKnotGeometry } from 'three'
import { MathUtils } from 'three'

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
let useFrame = () => {} // runs on every frame frame
let sceneGui
let mtmManager
export async function meshTransmissionMaterialInstant(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder('Scene')
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
  scene.add(transformControls)

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
  bg_env.setBGType('GroundProjection')
  bg_env.setEnvType('HDRI')
  bg_env.updateAll()
  bg_env.addGui(sceneGui)

  await setupScene()

  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
const clock = new Clock()
function render() {
  const time = clock.getElapsedTime()
  stats.update()
  // Update the inertia on the orbit controls
  controls.update()
  mtmManager.update(time)
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

async function setupScene() {
  const gltf = await gltfLoader.loadAsync(MODEL_LIST.monkey.url)
  const model = gltf.scene

  const meshes = []
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model
      meshes.push(child)
    }
  })
  mainObjects.add(model)

  // const geo = new TorusKnotGeometry(0.6, 0.3, 64, 64)
  // for (let index = 0; index < 5; index++) {
  //   const mesh = new Mesh(geo)
  //   mesh.position.set(MathUtils.randFloat(-5, 5), MathUtils.randFloat(0, 5), MathUtils.randFloat(-5, 5))
  //   mainObjects.add(mesh)
  //   meshes.push(mesh)
  // }

  mtmManager = setupMeshTransmissionMaterial(meshes, renderer, scene, camera)
  mtmManager.meshTransmissionMaterial
  console.log(mtmManager)
  addTransmissionGui(gui, mtmManager)
}

function addTransmissionGui(gui, mtmManager) {
  const mat = mtmManager.meshTransmissionMaterial
  const mtmParams = mtmManager.mtmParams
  const fol = gui.addFolder('Transmission Material')
  fol.open()
  fol.add(mtmParams, 'backside')
  fol.add(mtmParams, 'thickness', 0, 2)
  fol.add(mtmParams, 'backsideThickness', 0, 2)

  fol.addColor(mat, 'color')

  fol.add(mat, 'roughness', 0, 1)
  fol.add(mat, 'chromaticAberration', 0, 2)
  fol.add(mat, 'distortion', 0, 10)
  fol.add(mat, 'temporalDistortion', 0, 1)
  fol.add(mat, 'anisotropicBlur', 0, 10)
  fol.add(mat, 'reflectivity', 0, 1)

  fol.addColor(mat, 'attenuationColor')
  fol.add(mat, 'attenuationDistance', 0, 2)
}

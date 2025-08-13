import {
  ACESFilmicToneMapping,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
  Vector2,
  Raycaster,
  Group,
  Color,
  TextureLoader,
  DirectionalLight,
  AmbientLight,
  MathUtils,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

import { pcss } from '@pmndrs/vanilla'

import { Easing, Tween, update } from '@tweenjs/tween.js'
import { MODEL_LIST } from '../models/MODEL_LIST'

let stats,
  renderer,
  raf,
  camera,
  scene,
  controls,
  gui,
  pointer = new Vector2()

const params = {
  enabled: true,
  size: 25,
  focus: 0,
  samples: 10,
  animate: false,
}

const mainObjects = new Group()
const textureLoader = new TextureLoader()
const exrLoader = new EXRLoader()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = []
let sceneGui, sunLight

export default async function pcssDemo(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder('Scene')
  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping

  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(6, 3, 6)
  camera.name = 'Camera'
  camera.position.set(2.0404140991899564, 2.644387886134694, 3.8683136783076355)
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
  controls.target.set(0, 0, 0)
  controls.target.set(0, 0, 0)

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

  sunLight = new DirectionalLight(0xffffeb, 5)
  sunLight.name = 'Dir. Light'
  sunLight.castShadow = true
  sunLight.shadow.camera.near = 0.01
  sunLight.shadow.camera.far = 100
  const size = 4
  sunLight.shadow.camera.right = size
  sunLight.shadow.camera.left = -size
  sunLight.shadow.camera.top = size
  sunLight.shadow.camera.bottom = -size
  sunLight.shadow.mapSize.width = 2048
  sunLight.shadow.mapSize.height = 2048
  sunLight.shadow.bias = -0.001
  sunLight.position.set(2, 2, -3)
  scene.add(sunLight)

  transformControls.attach(sunLight)

  // scene.add(new DirectionalLightHelper(sunLight))
  // scene.add(new CameraHelper(sunLight.shadow.camera))

  const ambientLight = new AmbientLight()
  scene.add(ambientLight)

  updatePCSS()
  addPCSSGui(gui)
  await loadModels()
  animate()
}

function addPCSSGui(gui) {
  const folder = gui.addFolder('PCSS')
  folder.open()
  folder.onChange(() => {
    updatePCSS()
  })

  folder.add(params, 'enabled')
  folder.add(params, 'size', 1, 100, 1)
  folder.add(params, 'focus', 0, 2)
  folder.add(params, 'samples', 1, 20, 1)

  const def = gui.addFolder('Defaults')
  def.open()
  def.addColor(sunLight, 'color')
  def.add(sunLight, 'intensity', 0, 10)
  let tw
  def
    .add(params, 'animate')
    .name('Animate 💡')
    .onChange((v) => {
      if (!tw) {
        tw = new Tween(sunLight.position)
          .to({ x: MathUtils.randFloatSpread(5), y: MathUtils.randFloat(0.1, 5) })
          .duration(3000)
          .repeat(Infinity)
          .repeatDelay(1000)
          .easing(Easing.Quadratic.InOut)
          .onStart(() => {
            tw._valuesStart = { x: sunLight.position.x, y: sunLight.position.y }
            tw.to({ x: MathUtils.randFloatSpread(5), y: MathUtils.randFloat(0.1, 5) })
          })
          .onRepeat(() => {
            tw._onStartCallback() // run onStart again
          })
      }
      if (v) {
        transformControls.detach()
        tw.start()
      } else {
        transformControls.attach(sunLight)
        tw.stop()
      }
    })
}

let reset = null
async function updatePCSS() {
  // remove pcss
  if (reset) {
    reset(renderer, scene, camera)
    reset = null
  }

  // add pcss again with updated values
  if (params.enabled) {
    reset = pcss({
      size: params.size,
      focus: params.focus,
      samples: params.samples,
    })

    // dispose all materials to trigger re compile
    scene.traverse((object) => {
      if (object.material) {
        // renderer.properties.remove(object.material)
        object.material.dispose()
      }
    })
    // renderer.info.programs.length = 0
    // renderer.compile(scene, camera)
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  stats.update()
  update() //tween
  controls.update()
  renderer.render(scene, camera)
}

function animate() {
  raf = requestAnimationFrame(animate)
  render()
}

function raycast() {
  return
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

async function loadModels() {
  const gltf = await gltfLoader.loadAsync(MODEL_LIST.room.url)
  const model = gltf.scene
  model.name = 'room'

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model

      if (child?.material.name === 'lampshade') {
        child.castShadow = false
        child.receiveShadow = false
      }
    }
  })
  mainObjects.add(model)
}

const color = new Color()
function getRandomHexColor() {
  return '#' + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

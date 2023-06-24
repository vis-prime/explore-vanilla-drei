import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
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
  Color,
  Object3D,
} from 'three'

// Model and Env
import { MODEL_LIST, MODEL_LOADER } from '../models/MODEL_LIST'
import { BG_ENV } from './BG_ENV'
import { Caustics } from '../wip/Caustics'
import { update } from '@tweenjs/tween.js'
import { EffectComposer, RenderPass, BloomEffect, EffectPass } from 'postprocessing'

let stats,
  renderer,
  composer,
  raf,
  camera,
  scene,
  controls,
  gui,
  pointer = new Vector2()

const mainObjects = new Group()
let transformControls
const raycaster = new Raycaster()
const intersects = [] //raycast
let sceneGui

const CausticsModels = {
  Vase: MODEL_LIST.vase,
  Monkey: MODEL_LIST.monkey,
  Bunny: MODEL_LIST.bunny,
  // BunnyD: MODEL_LIST.bunnyDrei,
  Porsche: MODEL_LIST.porsche_1975,
}

const params = {
  model: CausticsModels.Porsche,
}

/**
 * @type {{[key: string]: Object3D }}
 */
const modelCache = {}

/**
 * @type {Object3D}
 */
let activeModel

export async function CausticsDemo(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder('Scene')
  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({ antialias: false, alpha: true })
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = VSMShadowMap
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.set(-5, 5, 5)
  camera.name = 'Camera'
  // scene
  scene = new Scene()
  scene.add(mainObjects)

  composer = new EffectComposer(renderer, { multisampling: 4 })
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new EffectPass(camera, new BloomEffect({ mipmapBlur: true, luminanceThreshold: 0.9 })))

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.minDistance = 0.1
  controls.maxDistance = 400
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
  bg_env.setBGType('Default')
  bg_env.setEnvType('HDRI')
  await bg_env.updateAll()
  bg_env.addGui(sceneGui)
  scene.backgroundBlurriness = 0.4
  scene.backgroundIntensity = 0.2

  await setupModel()
  setupCaustics()

  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  composer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  stats.update()
  update()
  controls.update()
  if (caustics) caustics.update()
  composer.render(scene, camera)
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

async function setupModel() {
  const loadModel = async () => {
    let gltf = modelCache[params.model.url]
    if (!gltf) {
      gltf = await MODEL_LOADER(params.model.url)
      modelCache[params.model.url] = gltf
    }

    gltf.scene.traverse((node) => {
      node.frustumCulled = false
    })

    let parent
    if (activeModel) {
      parent = activeModel.parent
      activeModel.removeFromParent()
    }
    if (parent) parent.add(gltf.scene)
    activeModel = gltf.scene
  }

  gui.add(params, 'model', CausticsModels).onChange(async (v) => {
    await loadModel()
  })

  await loadModel()

  gui
    .add(activeModel.scale, 'x', 0.0001, 3)
    .name('model scale')
    .onChange((v) => {
      activeModel.scale.setScalar(v)
    })
}

/**
 * @type {import('../wip/Caustics').CausticsType}
 */
let caustics
async function setupCaustics() {
  caustics = Caustics(renderer, { frames: Infinity, worldRadius: 0.01 })

  scene.add(caustics.group, caustics.helper)

  caustics.scene.add(activeModel)

  addCausticsGui()

  console.log(scene)
}

function addCausticsGui() {
  const folder = gui.addFolder('Caustics')
  folder.open()
  folder.addColor(caustics.params, 'color')
  folder.add(caustics.params, 'ior', 0, Math.PI)
  folder.add(caustics.params, 'far', 0, 5)

  folder.add(caustics.helper, 'visible').name('helper')

  folder.add(caustics.params, 'backside').onChange((v) => {
    if (!v) {
      // to prevent last frame from persisting
      caustics.causticsTargetB.dispose()
    }
  })
  folder.add(caustics.params, 'backsideIOR', 0, Math.PI)
  folder.add(caustics.params, 'worldRadius', 0, 0.05)
  folder.add(caustics.params, 'intensity', 0, 1)
  folder.add(caustics.params, 'causticsOnly')

  folder.add(caustics.params.lightSource, 'x', -1, 1)
  folder.add(caustics.params.lightSource, 'y', 0.1, 10)
  folder.add(caustics.params.lightSource, 'z', -1, 1)
}

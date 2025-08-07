import {
  ACESFilmicToneMapping,
  EquirectangularReflectionMapping,
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
  PlaneGeometry,
  DirectionalLight,
  MathUtils,
  Vector3,
  Timer,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { MODEL_LIST } from '../models/MODEL_LIST'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { Sparkles } from '@pmndrs/vanilla'

let stats,
  renderer,
  raf,
  camera,
  scene,
  controls,
  gui,
  pointer = new Vector2()

const params = {
  bgColor: new Color(),
  printCam: () => {},
}
const mainObjects = new Group()
const rgbeLoader = new RGBELoader()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
// draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/")
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast

let sceneGui

/**
 * @type {Sparkles[]}
 */
let allSparkles = []

export async function SparklesDemo(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder('Scene')
  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
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

  // scene
  scene = new Scene()

  rgbeLoader.load(HDRI_LIST.skidpan.hdr, (texture) => {
    texture.mapping = EquirectangularReflectionMapping
    scene.backgroundBlurriness = 0.1
    scene.background = texture
    scene.environment = texture
  })
  scene.add(mainObjects)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.minDistance = 0.1
  controls.maxDistance = 100
  controls.maxPolarAngle = Math.PI / 1.5
  controls.target.set(0, 1, 0)

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
  // scene.add(transformControls)

  window.addEventListener('resize', onWindowResize)
  document.addEventListener('pointermove', onPointerMove)

  let downTime = Date.now()
  document.addEventListener('pointerdown', () => {
    downTime = Date.now()
  })
  document.addEventListener('pointerup', (e) => {
    if (Date.now() - downTime < 200) {
      onPointerMove(e)
      raycast()
    }
  })

  sceneGui.add(transformControls, 'mode', ['translate', 'rotate', 'scale'])
  sceneGui.add(scene, 'backgroundBlurriness', 0, 1, 0.01)
  sceneGui.addColor(params, 'bgColor').onChange(() => {
    scene.background = params.bgColor
  })

  await loadModels()
  setupSparkles()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

const timer = new Timer()
function render() {
  timer.update()
  const elapsedTime = timer.getElapsed()
  stats.update()

  for (const sparkles of allSparkles) {
    // Update each sparkles instance
    sparkles.update(elapsedTime)
  }
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

  transformControls.attach(intersects[0].object)

  intersects.length = 0
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}
let cube, monkey
async function loadModels() {
  // cube
  cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshStandardMaterial({ color: 0xffffff * Math.random(), roughness: 0.3, metalness: 0 })
  )
  cube.name = 'cube'
  cube.castShadow = true
  cube.receiveShadow = true
  cube.position.set(0, 3, 0)
  mainObjects.add(cube)

  // monkey
  const gltf = await gltfLoader.loadAsync(MODEL_LIST.monkey.url)
  const model = gltf.scene
  model.name = 'suzanne'
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  mainObjects.add(model)
  monkey = model
  animate()
}

function setupSparkles() {
  setupSimpleSparkles()
  setupAdvancedSparkles()
}

function setupSimpleSparkles() {
  /**
   * @type {import('../wip/Sparkles').SparklesProps}
   */
  const sparkleParameters = {
    noise: 1,
    count: 100,
    speed: 1,
    opacity: 1,
    scale: 1,
    size: 3,
    color: new Color(0xffffff),
  }
  const sparkles = new Sparkles(sparkleParameters)
  sparkles.setPixelRatio(renderer.getPixelRatio())

  allSparkles.push(sparkles)

  cube.add(sparkles)

  console.log('Sparkles added to the scene', { sparkles })

  sparkles.update(0) // Initial update to set up the sparkles

  const sFol = gui.addFolder('Sparkles')
  sFol.add(sparkleParameters, 'count', 10, 1000, 1).onChange((v) => sparkles.rebuildAttributes(sparkleParameters))
  sFol.add(sparkleParameters, 'size', 0, 15, 0.01).onChange((v) => sparkles.rebuildAttributes(sparkleParameters))
  sFol.add(sparkleParameters, 'opacity', 0, 1, 0.01).onChange((v) => sparkles.rebuildAttributes(sparkleParameters))
  sFol.add(sparkleParameters, 'speed', 0, 15, 0.01).onChange((v) => sparkles.rebuildAttributes(sparkleParameters))
  sFol.add(sparkleParameters, 'noise', 0, 15, 0.01).onChange((v) => sparkles.rebuildAttributes(sparkleParameters))
  sFol.add(sparkleParameters, 'scale', 0, 15, 0.01).onChange((v) => sparkles.rebuildAttributes(sparkleParameters))
  sFol.addColor(sparkleParameters, 'color').onChange((v) => sparkles.rebuildAttributes(sparkleParameters))

  sFol.add(sparkles.material, 'pixelRatio', 0, 2, 0.1)
}

function setupAdvancedSparkles() {
  const count = 100

  /**
   * @type {import('../wip/Sparkles').SparklesProps}
   */
  const sparkleParameters = {
    count,
    noise: new Float32Array(count * 3),
    speed: new Float32Array(count),
    opacity: new Float32Array(count),
    scale: new Vector3(3, 2, 3),
    size: new Float32Array(count),
    color: new Float32Array(count * 3),
  }

  const randomParams = {
    minNoise: 0.3,
    maxNoise: 10,

    minSpeed: 0.3,
    maxSpeed: 10,

    minSize: 0.3,
    maxSize: 10,

    minColor: 0,
    maxColor: 1,
  }

  // fill the arrays with random values
  function randomiseValues() {
    const { noise, speed, size, opacity, color } = sparkleParameters
    const { minNoise, maxNoise, minSpeed, maxSpeed, minSize, maxSize, minColor, maxColor } = randomParams

    for (let i = 0; i < noise.length; i++) {
      noise[i] = MathUtils.randFloat(minNoise, maxNoise)
    }
    for (let i = 0; i < speed.length; i++) {
      speed[i] = MathUtils.randFloat(minSpeed, maxSpeed)
    }
    for (let i = 0; i < size.length; i++) {
      size[i] = MathUtils.randFloat(minSize, maxSize)
    }
    for (let i = 0; i < opacity.length; i++) {
      opacity[i] = MathUtils.randFloat(0.3, 1)
    }
    for (let i = 0; i < color.length; i++) {
      color[i] = MathUtils.randFloat(minColor, maxColor)
    }
  }

  randomiseValues()

  const advancedSparkles = new Sparkles(sparkleParameters)
  advancedSparkles.setPixelRatio(renderer.getPixelRatio())
  advancedSparkles.position.y = 0.5
  monkey.add(advancedSparkles)

  allSparkles.push(advancedSparkles)

  const updateSparkles = () => {
    randomiseValues(randomParams.minRandom, randomParams.maxRandom)
    advancedSparkles.rebuildAttributes(sparkleParameters)
  }
  const sFol = gui.addFolder('Advanced Sparkles')
  sFol.add(randomParams, 'minNoise', 0, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'maxNoise', 0, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'minSpeed', 0, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'maxSpeed', 0, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'minSize', 0.1, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'maxSize', 0, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'minColor', 0, 1, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'maxColor', 0, 1, 0.01).onChange(updateSparkles)
}

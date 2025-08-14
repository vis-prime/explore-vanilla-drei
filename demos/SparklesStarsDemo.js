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
  Color,
  MathUtils,
  Vector3,
  Timer,
  IcosahedronGeometry,
  MeshPhysicalMaterial,
  MeshBasicMaterial,
  ArrowHelper,
  Box3,
  OctahedronGeometry,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { MODEL_LIST } from '../models/MODEL_LIST'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { Sparkles, Stars, Trail } from '@pmndrs/vanilla'

let stats,
  renderer,
  raf,
  camera,
  scene,
  controls,
  gui,
  pointer = new Vector2()

const params = {
  bgColor: new Color(0x000011),
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
 * @type {Sparkles[] | Stars[]}
 */
let allSparklesStars = []

export default async function SparklesAndStarsDemo(mainGui) {
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
  scene.background = params.bgColor

  rgbeLoader.load(HDRI_LIST.skidpan.hdr, (texture) => {
    texture.mapping = EquirectangularReflectionMapping
    scene.backgroundBlurriness = 0.1
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

  // sceneGui.add(transformControls, 'mode', ['translate', 'rotate', 'scale'])
  // sceneGui.add(scene, 'backgroundBlurriness', 0, 1, 0.01)
  sceneGui.addColor(params, 'bgColor').onChange(() => {
    scene.background = params.bgColor
  })

  await loadModels()
  setupSparklesAndStars()
}
const allOnResizeFunctions = []
function onWindowResize() {
  const w = window.innerWidth
  const h = window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)

  const dpr = renderer.getPixelRatio()
  allOnResizeFunctions.forEach((fn) => fn(w * dpr, h * dpr))
}

const timer = new Timer()
function render() {
  timer.update()
  const elapsedTime = timer.getElapsed()
  const tick = timer.getDelta()
  stats.update()

  for (const sparkles of allSparklesStars) {
    // Update each sparkles instance
    sparkles.update(elapsedTime, tick)
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
let icoSph, monkey
async function loadModels() {
  // icoSph
  icoSph = new Mesh(
    new IcosahedronGeometry(0.5, 2),
    new MeshPhysicalMaterial({
      color: 0xffffff * Math.random(),
      roughness: 0.3,
      metalness: 1,
      flatShading: true,
      sheen: 1,
      sheenColor: 0xffffff * Math.random(),
      sheenRoughness: 0.5,
    })
  )
  icoSph.name = 'icoSph'
  icoSph.castShadow = true
  icoSph.receiveShadow = true
  icoSph.position.set(0, 3, 0)
  mainObjects.add(icoSph)

  // monkey
  const gltf = await gltfLoader.loadAsync(MODEL_LIST.monkey.url)
  const model = gltf.scene
  const box3 = new Box3().setFromObject(model, true)
  const center = box3.getCenter(new Vector3())
  console.log('Model center:', center)
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

function setupSparklesAndStars() {
  setupSimpleSparkles()
  setupAdvancedSparkles()
  setupStars()
  setupMonkeyTrails()
  setupSphereTrails()

  onWindowResize() // to ensure the trails are updated
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

  allSparklesStars.push(sparkles)

  icoSph.add(sparkles)

  console.log('Sparkles added to the scene', { sparkles })

  sparkles.update(0) // Initial update to set up the sparkles

  const sFol = gui.addFolder('Sparkles Simple (Sphere)')
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
    scale: new Vector3(3, 1, 3),
    size: new Float32Array(count),
    color: new Float32Array(count * 3),
  }

  const randomParams = {
    minNoise: 0.3,
    maxNoise: 10,

    minSpeed: 0.1,
    maxSpeed: 3,

    minSize: 0.3,
    maxSize: 20,

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
  advancedSparkles.position.y = 0.75
  monkey.add(advancedSparkles)

  allSparklesStars.push(advancedSparkles)

  const updateSparkles = () => {
    randomiseValues(randomParams.minRandom, randomParams.maxRandom)
    advancedSparkles.rebuildAttributes(sparkleParameters)
  }
  const sFol = gui.addFolder('Sparkles Advanced (Monkey)')
  sFol.add(randomParams, 'minNoise', 0, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'maxNoise', 0, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'minSpeed', 0, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'maxSpeed', 0, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'minSize', 0.1, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'maxSize', 0, 100, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'minColor', 0, 1, 0.01).onChange(updateSparkles)
  sFol.add(randomParams, 'maxColor', 0, 1, 0.01).onChange(updateSparkles)
}

function setupStars() {
  /**
   * @type {import('../wip/Stars').StarsProps}
   */
  const starParams = {
    radius: 50,
    depth: 25,
    count: 1000,
    fade: true,
    factor: 5,
    saturation: 1,
  }
  const stars = new Stars(starParams)

  scene.add(stars)
  allSparklesStars.push(stars)

  const updateStars = () => stars.rebuildAttributes(starParams)
  const folder = gui.addFolder('Stars')
  folder.add(starParams, 'count', 10, 10000, 10).onChange(updateStars)
  folder.add(starParams, 'factor', 0.5, 50, 0.1).onChange(updateStars)
}

function setupMonkeyTrails() {
  const pivot = new Group()
  pivot.position.set(0, 0.75, 0.07)
  const targetMesh = new Mesh(new SphereGeometry(0.1, 16, 16), new MeshBasicMaterial())
  targetMesh.material.color.setHSL(Math.random(), 1, 0.5)
  targetMesh.material.color.multiplyScalar(2)

  targetMesh.position.z = 1.5
  targetMesh.position.y = 0
  pivot.add(targetMesh)
  // pivot.add(new ArrowHelper())

  /**
   * @type {import('@pmndrs/vanilla').TrailProps}
   */
  const trailProps = {
    width: 4,
    length: 10,
    target: targetMesh,
    color: targetMesh.material.color,
    interval: 1,
  }

  const trailMesh = new Trail(trailProps)
  mainObjects.add(pivot)
  scene.add(trailMesh)

  const onTrailResize = (w, h) => trailMesh.updateSize(w, h)
  allOnResizeFunctions.push(onTrailResize)

  const randomSpeed = MathUtils.randFloat(1, 2)
  const rotateFunction = (elapsedTime, tick) => {
    pivot.position.y = 0.75 + 0.75 * Math.sin(elapsedTime * randomSpeed)
    pivot.rotation.y += tick * 5
  }

  const temp = {
    update: (elapsedTime, tick) => {
      rotateFunction(elapsedTime, tick)
      trailMesh.update()
    },
  }
  allSparklesStars.push(temp)

  trailMesh.name = `Trail Line (Monkey)`
  addTrailGui(trailProps, trailMesh)
}

function setupSphereTrails() {
  const pivot = new Group()
  pivot.position.set(0, 3, 0)
  const targetMesh = new Mesh(new IcosahedronGeometry(0.1), new MeshStandardMaterial({ flatShading: true }))
  targetMesh.material.color.setHSL(Math.random(), 1, 0.5)
  targetMesh.material.color.multiplyScalar(2)

  targetMesh.position.z = 0.8
  targetMesh.position.y = 0
  pivot.add(targetMesh)
  // pivot.add(new ArrowHelper())

  /**
   * @type {import('@pmndrs/vanilla').TrailProps}
   */
  const trailProps = {
    width: 1,
    length: 10,
    target: targetMesh,
    color: targetMesh.material.color,
    interval: 1,
  }

  trailProps.geometry = new OctahedronGeometry(0.1)
  trailProps.material = new MeshStandardMaterial({
    color: targetMesh.material.color,
  })
  trailProps.instanceCount = 10 * 2

  const trailMesh = new Trail(trailProps)
  mainObjects.add(pivot)
  scene.add(trailMesh)

  // on resize not needed as we are using custom geometry
  // const onTrailResize = (w, h) => trailMesh.updateSize(w, h)
  // allOnResizeFunctions.push(onTrailResize)

  const rotateFunction = (elapsedTime, tick) => {
    pivot.position.y = 3 + 0.5 * Math.sin(elapsedTime * 2)
    pivot.rotation.y += tick * 2
  }

  const temp = {
    update: (elapsedTime, tick) => {
      rotateFunction(elapsedTime, tick)
      trailMesh.update()
    },
  }
  allSparklesStars.push(temp)

  trailMesh.name = `Trail Instanced (Sphere)`
  addTrailGui(trailProps, trailMesh)
}

/**
 * Adds a GUI for controlling the trail properties.
 * @param {import('@pmndrs/vanilla').TrailProps} trailProps
 * @param {import('@pmndrs/vanilla').Trail} trailMesh
 */
function addTrailGui(trailProps, trailMesh) {
  const fol = gui.addFolder(trailMesh.name)
  fol.onChange(() => trailMesh.rebuildTrail(trailProps))
  fol.addColor(trailProps, 'color').name('Trail Color')
  fol.add(trailProps, 'length', 1, 50, 0.1).name('Trail Length')
  fol.add(trailProps, 'width', 0, 20, 0.1).name('Trail Width')
  // fol.add(trailProps, 'decay', 0, 1, 0.01).name('Trail Decay')
  // fol.add(trailProps, 'stride', 0, 1, 0.01).name('Trail Stride')
  // fol.add(trailProps, 'local').name('Local Space')
  fol.add(trailProps, 'interval', 1, 60, 1).name('Trail Interval')
  if (trailMesh.trailData.isUsingCustomGeometry) {
    fol.add(trailProps, 'instanceCount', 1, 1000, 1).name('Instance Count')
  }
}

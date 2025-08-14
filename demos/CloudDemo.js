import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import {
  NeutralToneMapping,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
  Vector2,
  Raycaster,
  Group,
  VSMShadowMap,
  TextureLoader,
  Clock,
  AmbientLight,
  SpotLight,
  SpotLightHelper,
  MathUtils,
} from 'three'
import { Easing, Tween, Group as TweenGroup } from '@tweenjs/tween.js'
// Model and Env
import { BG_ENV } from './BG_ENV'
import { Clouds, CLOUD_URL, Cloud } from '@pmndrs/vanilla'
const TWEEN_GROUP = new TweenGroup()
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
const textureLoader = new TextureLoader()
let transformControls
draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let useFrame = () => {} // runs on every frame frame
let sceneGui

export default async function CloudDemo(mainGui) {
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
  renderer.toneMapping = NeutralToneMapping
  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(5, 5, 5)
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
  bg_env.setBGType('Default')
  bg_env.setEnvType('HDRI')
  bg_env.updateAll()
  bg_env.addGui(sceneGui)

  await setupCloud()
  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  stats.update()
  TWEEN_GROUP.update()
  // Update the inertia on the orbit controls
  controls.update()
  useFrame()
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

async function setupCloud() {
  const ambientLight = new AmbientLight()
  ambientLight.intensity = Math.PI / 1.5
  scene.add(ambientLight)
  gui.add(ambientLight, 'intensity', 0, 100).name('AmbientLight int')

  const helpers = []

  {
    const spotLight = new SpotLight()
    spotLight.intensity = 30
    spotLight.position.fromArray([0, 40, 0])
    spotLight.distance = 45
    spotLight.decay = 0
    spotLight.penumbra = 1
    spotLight.intensity = 100
    scene.add(spotLight)
    const helper = new SpotLightHelper(spotLight)
    gui.add(spotLight, 'intensity', 0, 100).name('SpotLight 1 int')
    helper.visible = false
    helpers.push(helper)
    scene.add(helper)
  }
  {
    const spotLight = new SpotLight('red')
    spotLight.intensity = 30
    spotLight.position.fromArray([-20, 0, 10])
    spotLight.angle = 0.15
    spotLight.decay = 0
    spotLight.penumbra = -1
    spotLight.intensity = 30
    gui.add(spotLight, 'intensity', 0, 100).name('SpotLight 2 int')

    scene.add(spotLight)
    const helper = new SpotLightHelper(spotLight)
    helper.visible = false
    helpers.push(helper)
    scene.add(helper)
  }
  {
    const spotLight = new SpotLight('green')
    spotLight.intensity = 30
    spotLight.position.fromArray([20, -10, 10])
    spotLight.angle = 0.2
    spotLight.decay = 0
    spotLight.penumbra = -1
    spotLight.intensity = 20
    gui.add(spotLight, 'intensity', 0, 100).name('SpotLight 3 int')

    scene.add(spotLight)
    const helper = new SpotLightHelper(spotLight)
    helper.visible = false
    helpers.push(helper)
    scene.add(helper)
  }

  const texture = await textureLoader.loadAsync(CLOUD_URL)

  const clouds = new Clouds({ texture, limit: 1000, frustumCulled: false })
  scene.add(clouds)

  function addCloud(posArray) {
    const cl = new Cloud()
    if (posArray) {
      cl.position.fromArray(posArray)
    } else {
      cl.position.random().multiplyScalar(20)
      cl.bounds.set(MathUtils.randInt(1, 8), MathUtils.randInt(1, 4), MathUtils.randInt(1, 4))
      cl.color.setHSL(Math.random(), Math.random(), Math.random())
      cl.updateCloud()
    }

    clouds.ref.add(cl.ref)
    // clouds.clouds.push(...cl.cloudStateArray)
    addCloudGui(cl)
    console.warn({ [cl.name]: cl })

    const t = new Tween(controls.target, TWEEN_GROUP).to(cl.position, 500).easing(Easing.Quadratic.InOut).start()
  }
  gui
    .add({ visible: false }, 'visible')
    .name('Helper visible')
    .onChange((v) => helpers.forEach((h) => (h.visible = v)))

  gui.add({ addCloud }, 'addCloud').name('Add new Cloud')

  addCloud([0, 0, 0])

  const clock = new Clock()
  useFrame = () => {
    clouds.update(camera, clock.getElapsedTime(), clock.getDelta())
  }
}

/**
 * Gui
 * @param {Cloud} cloud
 */
function addCloudGui(cloud) {
  const fol = gui.addFolder('Edit: ' + cloud.name)

  // during runtime call "cloud.updateCloud()" after changing any cloud property
  fol.onChange(() => cloud.updateCloud())

  fol.addColor(cloud, 'color')
  fol.add(cloud, 'seed', 0, 100, 1)
  fol.add(cloud, 'segments', 1, 80, 1)
  fol.add(cloud, 'volume', 0, 100, 0.1)
  fol.add(cloud, 'opacity', 0, 1, 0.01)
  fol.add(cloud, 'fade', 0, 400, 1)
  fol.add(cloud, 'growth', 0, 20, 1)
  fol.add(cloud, 'speed', 0, 1, 0.01)
  fol.add(cloud, 'removeFromParent').onChange(() => {
    fol.destroy()
  })

  const bFol = fol.addFolder('bounds').close()
  bFol.add(cloud.bounds, 'x', 0, 25, 0.5)
  bFol.add(cloud.bounds, 'y', 0, 25, 0.5)
  bFol.add(cloud.bounds, 'z', 0, 25, 0.5)

  const pFol = fol.addFolder('position').close()
  pFol.add(cloud.position, 'x', -10, 10, 0.1)
  pFol.add(cloud.position, 'y', -10, 10, 0.1)
  pFol.add(cloud.position, 'z', -10, 10, 0.1)
}

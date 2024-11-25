import {
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Vector2,
  Raycaster,
  Group,
  Color,
  TextureLoader,
  VSMShadowMap,
  WebGLRenderTarget,
  MathUtils,
  TorusKnotGeometry,
  PlaneGeometry,
  DirectionalLight,
  Plane,
  Vector3,
  CircleGeometry,
  EquirectangularReflectionMapping,
  LineDashedMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  Line,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox'
import { Easing, Tween, update } from '@tweenjs/tween.js'
import { MODEL_LIST, MODEL_LOADER } from '../models/MODEL_LIST'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { MeshPortalMaterial } from '@pmndrs/vanilla'

let stats,
  /**
   * @type {WebGLRenderer}
   */
  renderer,
  raf,
  camera,
  /**
   * @type {Scene}
   */
  scene,
  /**
   * @type {Scene}
   */
  portalScene,
  controls,
  gui,
  pointer = new Vector2()

const mainObjects = new Group()
const textureLoader = new TextureLoader()

const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let portalMesh
let size = new Vector2()
/**
 * @type {WebGLRenderTarget}
 */
const portalSceneRenderTarget = new WebGLRenderTarget(1, 1, { samples: 2 })

let car, carPortal

const params = {
  cameraFov: 50,
  renderOnlyPortal: false,
  portalResolution: 1,
}

const wheels = {
  R: null,
  steerL: null,
  steerR: null,
  steerVal: 0,
}

const wheelsPortal = {
  R: null,
  steerL: null,
  steerR: null,
  steerVal: 0,
}
let carPosSet = () => {}

export async function meshPortalMaterialDemo(mainGui) {
  gui = mainGui

  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({ antialias: true })
  // renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = VSMShadowMap
  renderer.localClippingEnabled = true

  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(params.cameraFov, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(-1, 0.25, 2)
  camera.name = 'Camera'

  gui.add(params, 'cameraFov', 10, 120, 1).onChange((v) => {
    camera.fov = v
    camera.updateProjectionMatrix()
  })

  // scene
  scene = new Scene()
  portalScene = new Scene()

  renderer.getSize(size)

  scene.add(mainObjects)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.minDistance = 0.1
  controls.maxDistance = 100
  controls.target.set(0, -0.5, -1)
  controls.enabled = false

  transformControls = new TransformControls(camera, renderer.domElement)
  transformControls.addEventListener('dragging-changed', (event) => {
    controls.enabled = !event.value
  })
  transformControls.showX = false
  transformControls.showY = false

  transformControls.addEventListener('change', () => {
    if (transformControls.object) {
      carPosSet()
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

  onWindowResize()
  populateScene()
  populatePortal()

  const exrLoader = new EXRLoader()
  exrLoader.load(HDRI_LIST.old_hall.exr, (tex) => {
    tex.mapping = EquirectangularReflectionMapping
    scene.environment = tex
    portalScene.environment = tex
    const gBox = new GroundedSkybox(tex, 5, 10)
    portalScene.add(gBox)
  })

  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.getSize(size)
  portalSceneRenderTarget.setSize(size.x * params.portalResolution, size.y * params.portalResolution)
}

function render() {
  stats.update()
  controls.update()
  update() // tween
  if (params.renderOnlyPortal) {
    renderer.render(portalScene, camera)
  } else {
    renderer.setRenderTarget(portalSceneRenderTarget)
    renderer.render(portalScene, camera)
    renderer.setRenderTarget(null)

    renderer.render(scene, camera)
  }
}

function animate() {
  raf = requestAnimationFrame(animate)
  render()
}

function raycast() {
  intersects.length = 0
  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera)

  // calculate objects intersecting the picking ray
  raycaster.intersectObject(car, true, intersects)
  // console.log(intersects)

  if (!intersects.length) {
    transformControls.detach()
    return
  }

  if (intersects[0].object.selectOnRaycast) {
    // console.log('raycast select', intersects[0])
    transformControls.attach(intersects[0].object.selectOnRaycast)
  }
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function populateScene() {
  scene.background = new Color().setHSL(Math.random(), 0.3, 0.5)

  renderer.getSize(size)

  portalMesh = new Mesh(
    new PlaneGeometry(),
    new MeshPortalMaterial({
      map: portalSceneRenderTarget.texture,
      resolution: size,
    })
  )
  portalMesh.castShadow = true
  portalMesh.scale.set(0, 0, 1)
  scene.add(portalMesh)

  const geometry = new BufferGeometry()
  const position = []

  const s = 0.5
  position.push(-s, -s, 0, -s, s, 0, s, s, 0, s, -s, 0)

  geometry.setAttribute('position', new Float32BufferAttribute(position, 3))

  const lineSegments = new Line(geometry, new LineDashedMaterial({ color: 0xffaa00, dashSize: 0.03, gapSize: 0.01 }))
  lineSegments.computeLineDistances()
  portalMesh.add(lineSegments)

  const fol = gui.addFolder('scene')
  fol.open()
  fol.addColor(scene, 'background')

  // fol.add(portalMesh.material, 'blur', 0, 1)
}

async function populatePortal() {
  portalScene.background = new Color().set('#51c995')

  // car
  const gltf = await MODEL_LOADER(MODEL_LIST.porsche_1975.url)
  const model = gltf.scene
  model.scale.setScalar(0.3)
  model.position.y = -0.5
  model.position.z = -1
  model.name = 'car'
  model.traverse((child) => {
    child.positionBackup = child.position.clone()
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model
    }
  })

  const localPlane = new Plane(new Vector3(0, 0, 1), 0)
  gui.add(localPlane, 'constant', 0, 5).name('Clipping plane constant')

  car = model
  carPortal = model.clone()

  car.traverse((child) => {
    if (child.isMesh) {
      child.selectOnRaycast = car
      child.material = child.material.clone()
      child.material.clippingPlanes = [localPlane]
      child.material.clipShadows = true
    }
  })

  scene.add(car)
  portalScene.add(carPortal)

  wheels.R = car.getObjectByName('wheels_rear')
  wheels.steerL = car.getObjectByName('wheel_L')
  wheels.steerR = car.getObjectByName('wheel_R')

  wheelsPortal.R = carPortal.getObjectByName('wheels_rear')
  wheelsPortal.steerL = carPortal.getObjectByName('wheel_L')
  wheelsPortal.steerR = carPortal.getObjectByName('wheel_R')

  carPosSet = () => {
    car.position.z = MathUtils.clamp(car.position.z, -1, 1)

    carPortal.position.copy(car.position)

    const rot = car.position.z * (Math.PI * 4)

    for (const key in wheels) {
      const w = wheels[key]
      const wp = wheelsPortal[key]
      if (w) w.rotation.x = rot
      if (w) wp.rotation.x = rot
    }
  }
  const carReverse = new Tween(car.position)
    .onStart(() => {})
    .to({ z: 0 })
    .duration(3000)
    .onUpdate((o, e) => {
      carPosSet()
    })
    .easing(Easing.Quadratic.InOut)

  const camRestore = new Tween(controls.target)
    .to({ x: 0, y: 0, z: 0 })
    .delay(500)
    .duration(500)
    .onUpdate(() => {})
    .easing(Easing.Quadratic.InOut)
    .onComplete(() => {
      controls.enabled = true

      setTimeout(() => {
        if (!transformControls.object) {
          carReverse.startFromCurrentValues()
        }
      }, 2000)
    })

  const carIntro = new Tween(car.position)
    .onStart(() => {})
    .to({ z: 1 })
    .delay(100)
    .duration(3000)
    .onUpdate((o, e) => {
      controls.target.copy(car.position)
      carPosSet()
    })
    .easing(Easing.Quadratic.InOut)
    .chain(camRestore)
    .onComplete(() => {})

  const camStartPos = new Tween(camera.position)
    .to({ x: 1.5, y: 0.2, z: 0.25 })
    .duration(1000)
    .easing(Easing.Quadratic.InOut)
    .chain(carIntro)

  const portalIntro = new Tween(portalMesh.scale)
    .to({ x: 1, y: 1 })
    .delay(500)
    .duration(1500)
    .onUpdate(() => {})
    .easing(Easing.Quadratic.InOut)
    .chain(camStartPos)

  portalIntro.start()

  const geometry = new TorusKnotGeometry(0.5, 0.25, 150, 20)
  const material = new MeshStandardMaterial({
    metalness: 0,
    roughness: 0.2,
  })
  material.color.setHSL(Math.random(), 0.4, 0.5)
  const torusMesh = new Mesh(geometry, material)
  portalScene.add(torusMesh)
  torusMesh.receiveShadow = true
  torusMesh.scale.setScalar(0.2)
  torusMesh.position.z = -1
  torusMesh.position.y = 0.2
  scene.add(torusMesh.clone())
  torusMesh.material = material.clone()
  torusMesh.material.color.setHSL(Math.random(), 0.4, 0.5)
  const dirLight = new DirectionalLight(0xabffff, 3)
  dirLight.position.set(-2, 3, 2)
  dirLight.castShadow = true

  dirLight.shadow.mapSize.width = 1024
  dirLight.shadow.mapSize.height = 1024

  const d = 6

  dirLight.shadow.camera.left = -d
  dirLight.shadow.camera.right = d
  dirLight.shadow.camera.top = d
  dirLight.shadow.camera.bottom = -d
  dirLight.shadow.bias = -0.0001
  dirLight.shadow.blurSamples = 6
  dirLight.shadow.radius = 3

  scene.add(dirLight.clone())
  portalScene.add(dirLight)

  const shadowFloor = new Mesh(
    new CircleGeometry(1.5, 48).rotateX(-Math.PI / 2),
    new MeshStandardMaterial({ color: 'grey' })
  )
  shadowFloor.name = 'shadowFloor'
  shadowFloor.receiveShadow = true
  shadowFloor.position.set(0, -0.5, 0)
  scene.add(shadowFloor)
  portalScene.add(shadowFloor.clone())

  const fol = gui.addFolder('portalScene')

  fol.open()
  fol
    .add(params, 'portalResolution', 0.1, 1)
    .name('Portal Res')
    .onChange(() => onWindowResize())

  fol.add(portalMesh.scale, 'x', 0.1, 2, 0.1).name('Portal Scale X')
  fol.add(portalMesh.scale, 'y', 0.1, 2, 0.1).name('Portal Scale Y')

  fol.add(params, 'renderOnlyPortal')
}

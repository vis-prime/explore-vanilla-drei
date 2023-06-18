import {
  DoubleSide,
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
  WebGLRenderTarget,
  MathUtils,
  TorusKnotGeometry,
  MeshBasicMaterial,
  AxesHelper,
  PlaneGeometry,
  DirectionalLight,
  Plane,
  Vector3,
  ShadowMaterial,
  CircleGeometry,
  MeshPhongMaterial,
  EquirectangularReflectionMapping,
  HalfFloatType,
  FloatType,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

import { Easing, Tween, update } from '@tweenjs/tween.js'
import { MODEL_LIST, MODEL_LOADER } from '../models/MODEL_LIST'
import { shaderMaterial } from '@pmndrs/vanilla'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { EXRLoader } from 'three-stdlib'

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
let portalMesh
let size = new Vector2()
/**
 * @type {WebGLRenderTarget}
 */
let scene1RenderTarget

let car, carPortal

const params = {
  masterFov: 50,
  renderScene1: false,
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
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.localClippingEnabled = true

  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(params.masterFov, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(2, 0.5, 2)
  camera.name = 'Camera'

  camera1 = camera.clone()
  camera1.position.set(0, 0, 0)
  camera1.aspect = 1
  camera1.updateProjectionMatrix()
  camera.add(camera1)

  gui.add(params, 'masterFov', 10, 120, 1).onChange((v) => {
    camera.fov = camera1.fov = v
    camera.updateProjectionMatrix()
    camera1.updateProjectionMatrix()
  })

  // scene
  scene = new Scene()
  scene1 = new Scene()

  scene.add(camera)

  renderer.getSize(size)
  scene1RenderTarget = new WebGLRenderTarget(size.x, size.y, { colorSpace: SRGBColorSpace, samples: 2 })

  //   scene.backgroundBlurriness = 0.8

  scene.add(mainObjects)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.minDistance = 0.1
  controls.maxDistance = 100
  controls.target.set(0, 0, 0)

  transformControls = new TransformControls(camera, renderer.domElement)
  transformControls.addEventListener('dragging-changed', (event) => {
    controls.enabled = !event.value
    if (!event.value) {
    }
  })
  transformControls.showX = false
  transformControls.addEventListener('change', () => {
    if (transformControls.object) {
      car.position.z = MathUtils.clamp(car.position.z, -1, 1)
      car.position.y = MathUtils.clamp(car.position.y, -0.5, 1)

      carPortal.position.copy(car.position)

      const rot = car.position.z * (Math.PI * 4)

      for (const key in wheels) {
        const w = wheels[key]
        const wp = wheelsPortal[key]
        if (w) w.rotation.x = rot
        if (w) wp.rotation.x = rot
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

  populateScene()
  populatePortal()

  const exrLoader = new EXRLoader()
  exrLoader.load(HDRI_LIST.old_hall.exr, (tex) => {
    tex.mapping = EquirectangularReflectionMapping
    scene.environment = tex
    scene1.environment = tex
    scene1.background = tex
  })

  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.getSize(size)
  scene1RenderTarget.dispose()
  scene1RenderTarget = new WebGLRenderTarget(size.x, size.y, {
    colorSpace: SRGBColorSpace,
    samples: 2,
  })
  portalMesh.material.map = scene1RenderTarget.texture
}

function render() {
  stats.update()
  update() // tween
  controls.update()
  useFrame()
  if (params.renderScene1) {
    renderer.render(scene1, camera)
  } else {
    renderer.setRenderTarget(scene1RenderTarget)
    renderer.render(scene1, camera)
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
  console.log(intersects)

  if (!intersects.length) {
    transformControls.detach()
    return
  }

  if (intersects[0].object.selectOnRaycast) {
    console.log('raycast select', intersects[0])
    transformControls.attach(intersects[0].object.selectOnRaycast)
  }
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function populateScene() {
  scene.background = new Color().set('#aabbcc')

  const axesHelpers = Array.from({ length: 4 }, () => new AxesHelper(0.1))
  axesHelpers[0].position.set(0.5, 0.5, 0)
  axesHelpers[1].position.set(-0.5, 0.5, 0)
  axesHelpers[2].position.set(0.5, -0.5, 0)
  axesHelpers[3].position.set(-0.5, -0.5, 0)

  scene.add(...axesHelpers)

  renderer.getSize(size)

  portalMesh = new Mesh(
    // new BoxGeometry().translate(0, 0, -0.5),
    new PlaneGeometry(),
    // new MeshBasicMaterial({ map: scene1RenderTarget.texture, toneMapped: false })
    new PortalMaterialImpl({
      blur: 0,
      blend: 0,
      // transparent: true,
      map: scene1RenderTarget.texture,
      toneMapped: false,
      resolution: size,
      // side: DoubleSide,
    })
  )
  portalMesh.castShadow = true
  scene.add(portalMesh)

  const fol = gui.addFolder('scene')
  fol.open()
  fol.addColor(scene, 'background')
  fol.add(portalMesh.material, 'blend', 0, 1).name('❌ blend')
  fol.add(portalMesh.material, 'blur', 0, 1).name('❌ blur')
  fol.add(portalMesh.scale, 'x', 0.1, 2).name('Portal Scale X')
  fol.add(portalMesh.scale, 'y', 0.1, 2).name('Portal Scale Y')
}

async function populatePortal() {
  scene1.background = new Color().set('#51c995')

  // car
  const gltf = await MODEL_LOADER(MODEL_LIST.porsche_1975.url)
  const model = gltf.scene
  model.scale.setScalar(0.3)
  model.position.y = -0.5
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
  scene1.add(carPortal)

  wheels.R = car.getObjectByName('wheels_rear')
  wheels.steerL = car.getObjectByName('wheel_L')
  wheels.steerR = car.getObjectByName('wheel_R')

  wheelsPortal.R = carPortal.getObjectByName('wheels_rear')
  wheelsPortal.steerL = carPortal.getObjectByName('wheel_L')
  wheelsPortal.steerR = carPortal.getObjectByName('wheel_R')

  const geometry = new TorusKnotGeometry(0.5, 0.25, 150, 20)
  const material = new MeshStandardMaterial({
    metalness: 0,
    roughness: 0.2,
    color: 0xff0000,
  })
  const torusMesh = new Mesh(geometry, material)
  scene1.add(torusMesh)
  torusMesh.receiveShadow = true
  torusMesh.scale.setScalar(0.2)
  torusMesh.position.z = -1
  torusMesh.position.y = 0.2

  const dirLight = new DirectionalLight(0xffffff, 1)
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
  scene1.add(dirLight)

  const shadowFloor = new Mesh(
    new CircleGeometry(1.5, 48).rotateX(-Math.PI / 2),
    new MeshStandardMaterial({ color: 'grey' })
  )
  shadowFloor.name = 'shadowFloor'
  shadowFloor.receiveShadow = true
  shadowFloor.position.set(0, -0.5, 0)
  scene.add(shadowFloor)
  scene1.add(shadowFloor.clone())

  const fol = gui.addFolder('scene1')
  fol.open()
  fol.addColor(scene1, 'background')
  fol.add(torusMesh.position, 'z', -2, 2, 0.5).name('torus Z')
  fol
    .add(torusMesh.scale, 'z', 0.1, 1)
    .name('torusScale')
    .onChange((v) => {
      torusMesh.scale.setScalar(v)
    })
  fol.add(params, 'renderScene1')
}

const PortalMaterialImpl = shaderMaterial(
  {
    blur: 0,
    map: null,
    sdf: null,
    blend: 0,
    size: 0,
    resolution: new Vector2(),
  },
  `varying vec2 vUv;
     void main() {
       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
       vUv = uv;
     }`,
  `uniform sampler2D sdf;
     uniform sampler2D map;
     uniform float blur;
     uniform float size;
     uniform float time;
     uniform vec2 resolution;
     varying vec2 vUv;
     #include <packing>
     void main() {
       vec2 uv = gl_FragCoord.xy / resolution.xy;
       vec4 t = texture2D(map, uv);
       float k = blur;
       float d = texture2D(sdf, vUv).r/size;
       float alpha = 1.0 - smoothstep(0.0, 1.0, clamp(d/k + 1.0, 0.0, 1.0));
       gl_FragColor = vec4(t.rgb, blur == 0.0 ? t.a : t.a * alpha);
       #include <tonemapping_fragment>
       #include <encodings_fragment>
     }`
)

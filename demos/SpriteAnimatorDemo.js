import {
  EquirectangularReflectionMapping,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
  Vector2,
  Raycaster,
  Group,
  BoxGeometry,
  Color,
  GridHelper,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { MODEL_LIST } from '../models/MODEL_LIST'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { SpriteAnimator } from '@pmndrs/vanilla'

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

const spritesInstances = []

export default async function SpriteAnimatorDemo(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder('Scene')
  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  // renderer.outputColorSpace = SRGBColorSpace
  // renderer.toneMapping = ACESFilmicToneMapping

  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(6, 3, 6)
  camera.name = 'Camera'

  // scene
  scene = new Scene()

  rgbeLoader.load(HDRI_LIST.skidpan.hdr, (texture) => {
    texture.mapping = EquirectangularReflectionMapping
    scene.backgroundBlurriness = 0.7
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
  controls.target.set(0, 0, 0)
  controls.target.set(0, 0, 0)

  transformControls = new TransformControls(camera, renderer.domElement)
  transformControls.addEventListener('dragging-changed', (event) => {
    controls.enabled = !event.value
    if (!event.value) {
      plm.recalculate()
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
  // loadSpritesOLD()
  loadSprites()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// const clock = new Clock()
function render() {
  stats.update()
  // Update the inertia on the orbit controls
  controls.update()
  spritesInstances.forEach((cls) => {
    cls()
  })

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

async function loadModels() {
  // sphere
  const sphere = new Mesh(
    new SphereGeometry(0.5).translate(0, 0.5, 0),
    new MeshStandardMaterial({ color: 0xffffff * Math.random(), roughness: 0, metalness: 1 })
  )
  sphere.name = 'sphere'
  sphere.castShadow = true
  sphere.receiveShadow = true
  sphere.position.set(2, 0, -3)
  mainObjects.add(sphere)

  // cube
  const cube = new Mesh(
    new BoxGeometry(1, 1, 1).translate(0, 0.5, 0),
    new MeshStandardMaterial({ color: 0xffffff * Math.random(), roughness: 0.3, metalness: 0 })
  )
  cube.name = 'cube'
  cube.castShadow = true
  cube.receiveShadow = true
  cube.position.set(-1.5, 0, -3)
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
  model.position.set(0, 0, -3)
  mainObjects.add(model)

  scene.add(new GridHelper(10, 10))

  animate()
}

async function loadSprites() {
  const FlameSpriteAnimator = SpriteAnimator({
    startFrame: 0,
    fps: 40,
    autoPlay: true,
    loop: true,
    textureImageURL: './sprites/flame.png',
    textureDataURL: './sprites/flame.json',
    alphaTest: 0.01,
  })
  await FlameSpriteAnimator.init()
  FlameSpriteAnimator.group.position.set(0, 2, 1.2)
  FlameSpriteAnimator.group.scale.set(4, 4, 4)
  scene.add(FlameSpriteAnimator.group)
  spritesInstances.push(FlameSpriteAnimator.update)

  createSpriteGui('flame NEW', FlameSpriteAnimator)

  const AlienSpriteAnimator = SpriteAnimator({
    startFrame: 0,
    autoPlay: true,
    loop: true,
    numberOfFrames: 16,
    alphaTest: 0.01,
    textureImageURL: './sprites/alien.png',
    asSprite: false,
  })
  await AlienSpriteAnimator.init()
  AlienSpriteAnimator.group.scale.set(1, 1, 1)
  AlienSpriteAnimator.group.position.set(-2, 0.5, 2.5)

  scene.add(AlienSpriteAnimator.group)
  createSpriteGui('Alien NEW', AlienSpriteAnimator)

  spritesInstances.push(AlienSpriteAnimator.update)

  const boySA = SpriteAnimator({
    // onLoopEnd={onEnd}
    frameName: 'idle',
    fps: 24,
    animationNames: ['idle', 'celebration'],
    autoPlay: true,
    loop: true,
    alphaTest: 0.01,
    textureImageURL: './sprites/boy_hash.png',
    textureDataURL: './sprites/boy_hash.json',
  })
  await boySA.init()
  boySA.group.scale.set(1, 1, 1)
  boySA.group.position.set(-2, 0.5, -1)

  scene.add(boySA.group)

  spritesInstances.push(boySA.update)

  createSpriteGui('boySA NEW', boySA, ['idle', 'celebration'])
}

function createSpriteGui(name, spriteAnimator, animationNames = []) {
  const fol = gui.addFolder(name)
  fol.add(spriteAnimator, 'pauseAnimation')
  fol.add(spriteAnimator, 'playAnimation')

  for (const name of animationNames) {
    const anims = {
      playAnim: () => {
        spriteAnimator.setFrameName(name)
      },
    }
    fol
      .add(anims, 'playAnim')
      .name('play: ' + name)
      .onChange(() => {
        spriteAnimator.setFrameName(name)
      })
  }
}

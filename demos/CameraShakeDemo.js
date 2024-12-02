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
  PMREMGenerator,
  PlaneGeometry,
  TextureLoader,
  EquirectangularReflectionMapping,
  ShadowMaterial,
  DirectionalLight,
  VSMShadowMap,
  LoadingManager,
  FileLoader,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { GroundProjectedSkybox } from '../hdri/GroundProjectedSkybox'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { MODEL_LIST } from '../models/MODEL_LIST'
import { LoadingHelper } from './LoadingHelper'

let stats,
  renderer,
  raf,
  camera,
  scene,
  controls,
  gui,
  groundProjectedSkybox,
  pointer = new Vector2()

const params = {
  environment: HDRI_LIST.ulmer_muenster,
  groundProjection: true,
  bgColor: new Color(),
  printCam: () => {},
}

const mainObjects = new Group()
const textureLoader = new TextureLoader()
const exrLoader = new EXRLoader()
const rgbeLoader = new RGBELoader()
const gltfLoader = new GLTFLoader()
const fileLoader = new FileLoader()
fileLoader.setResponseType('blob')

const draco = new DRACOLoader()
let transformControls
// draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/")
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let useFrame = () => {}
let sceneGui
let envObject
let pmremGenerator

const l_h = new LoadingHelper()

export async function cameraShakeDemo(mainGui) {
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

  pmremGenerator = new PMREMGenerator(renderer)
  pmremGenerator.compileCubemapShader()
  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(6, 3, 6)
  camera.name = 'Camera'
  camera.position.set(2.0404140991899564, 2.644387886134694, 3.8683136783076355)
  // scene
  scene = new Scene()
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
  // sceneGui.add(scene, "backgroundBlurriness", 0, 1, 0.01)
  // sceneGui.addColor(params, "bgColor").onChange(() => {
  //   scene.background = params.bgColor
  // })

  // const light = new PointLight()
  // light.position.set(5, 5, 5)
  // scene.add(light)

  setupEnvironment()
  loadModels()

  animate()
}

const progressIds = new Map()

async function setupEnvironment() {
  // light
  let sunGroup = new Group()
  let sunLight = new DirectionalLight(0xffffeb, 1)
  sunLight.name = 'Dir. Light'
  sunLight.castShadow = true
  sunLight.shadow.camera.near = 0.1
  sunLight.shadow.camera.far = 50
  sunLight.shadow.camera.right = 15
  sunLight.shadow.camera.left = -15
  sunLight.shadow.camera.top = 15
  sunLight.shadow.camera.bottom = -15
  sunLight.shadow.mapSize.width = 1024
  sunLight.shadow.mapSize.height = 1024
  sunLight.shadow.radius = 1.95
  sunLight.shadow.blurSamples = 6

  sunLight.shadow.bias = -0.0005
  sunGroup.add(sunLight)
  scene.add(sunGroup)

  //   floor
  const shadowFloor = new Mesh(new PlaneGeometry(10, 10).rotateX(-Math.PI / 2), new ShadowMaterial({}))
  shadowFloor.name = 'shadowFloor'
  shadowFloor.receiveShadow = true
  shadowFloor.position.set(0, 0, 0)
  scene.add(shadowFloor)

  /**
   * Update env
   * @param {HDRI_LIST} envDict
   * @returns
   */
  async function loadEnv(envDict) {
    try {
      if (!envDict) {
        scene.background = null
        scene.environment = null
        return
      }

      const loadExr = async () => {
        if (!envDict.exr) return
        const texture = await exrLoader.loadAsync(envDict.exr, (e) =>
          l_h.setGlobalProgress(envDict.exr, e.loaded / e.total)
        )
        texture.mapping = EquirectangularReflectionMapping
        scene.environment = texture
        console.log('exr loaded')
      }

      const loadHdr = async () => {
        if (!envDict.hdr) return
        const texture = await rgbeLoader.loadAsync(envDict.hdr, (e) =>
          l_h.setGlobalProgress(envDict.hdr, e.loaded / e.total)
        )
        texture.mapping = EquirectangularReflectionMapping
        scene.environment = texture
        console.log('hdr loaded')
      }

      const loadImg = async () => {
        const imgUrl = envDict.webP || envDict.avif
        if (imgUrl) {
          const blob = await fileLoader.loadAsync(imgUrl, (e) => l_h.setGlobalProgress(imgUrl, e.loaded / e.total))

          const objUrl = URL.createObjectURL(blob)
          // Load the texture using the generated blob URL
          const texture = await textureLoader.loadAsync(objUrl)
          URL.revokeObjectURL(objUrl)

          texture.mapping = EquirectangularReflectionMapping
          texture.colorSpace = SRGBColorSpace
          scene.background = texture

          console.log('Background loaded')

          if (params.groundProjection) loadGroundProj(params.environment)
        }
      }

      await Promise.all([loadExr(), loadHdr(), loadImg()])

      if (envDict.sunPos) {
        sunLight.visible = true
        sunLight.position.fromArray(envDict.sunPos)
      } else {
        sunLight.visible = false
      }

      if (envDict.sunCol) {
        sunLight.color.set(envDict.sunCol)
      } else {
        sunLight.color.set(0xffffff)
      }

      if (envDict.shadowOpacity) {
        shadowFloor.material.opacity = envDict.shadowOpacity
      }
    } catch (error) {
      console.warn(error)
    }
  }

  function loadGroundProj(envDict) {
    if (params.groundProjection && scene.background && envDict.groundProj) {
      if (!groundProjectedSkybox) {
        groundProjectedSkybox = new GroundProjectedSkybox(scene.background)
        groundProjectedSkybox.scale.setScalar(100)
      }
      groundProjectedSkybox.material.uniforms.map.value = scene.background
      groundProjectedSkybox.radius = envDict.groundProj.radius
      groundProjectedSkybox.height = envDict.groundProj.height
      if (!groundProjectedSkybox.parent) {
        scene.add(groundProjectedSkybox)
      }
    } else {
      if (groundProjectedSkybox && groundProjectedSkybox.parent) {
        groundProjectedSkybox.removeFromParent()
      }
    }
  }

  await loadEnv(params.environment)

  sceneGui.add(params, 'environment', HDRI_LIST).onChange((v) => {
    loadEnv(v)
  })
  sceneGui.add(params, 'groundProjection').onChange((v) => {
    loadGroundProj(params.environment)
  })
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  stats.update()
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

  setupMTM()
}

async function setupMTM() {
  const gltf = await gltfLoader.loadAsync(MODEL_LIST.porsche_1975.url, (e) => {
    l_h.setGlobalProgress(MODEL_LIST.porsche_1975.url, e.loaded / e.total)
  })
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
}

const color = new Color()
function getRandomHexColor() {
  return '#' + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

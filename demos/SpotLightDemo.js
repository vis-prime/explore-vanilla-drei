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
  PlaneGeometry,
  EquirectangularReflectionMapping,
  VSMShadowMap,
  SpotLight,
  SpotLightHelper,
  CylinderGeometry,
  AmbientLight,
  Vector3,
  MeshBasicMaterial,
  WebGLRenderTarget,
  HalfFloatType,
  LinearFilter,
  DepthTexture,
  DepthFormat,
  UnsignedShortType,
  MathUtils,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { GroundProjectedSkybox } from '../hdri/GroundProjectedSkybox'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { SpotLightMaterial } from '@pmndrs/vanilla'

import { Easing, Tween, Group as TweenGroup } from '@tweenjs/tween.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { MODEL_LIST, MODEL_LOADER } from '../models/MODEL_LIST'
import { LoadingHelper } from './LoadingHelper'
const TWEEN_GROUP = new TweenGroup()
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
  environment: HDRI_LIST.kloppenheim,
  groundProjection: false,
  bgColor: new Color(),
  printCam: () => {},
}
const mainObjects = new Group()
const exrLoader = new EXRLoader()
const rgbeLoader = new RGBELoader()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let useFrame = () => {}
let sceneGui

export default async function spotLightDemo(mainGui) {
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
  camera.position.set(-16, 16, 16)
  camera.name = 'Camera'
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
  await loadModels()
  animate()
}

async function setupEnvironment() {
  /**
   * Update env
   * @param {HDRI_LIST} envDict
   * @returns
   */
  function loadEnv(envDict) {
    if (!envDict) {
      scene.background = null
      scene.environment = null

      return
    }

    if (envDict.exr)
      exrLoader.load(envDict.exr, (texture) => {
        texture.mapping = EquirectangularReflectionMapping
        scene.environment = texture
      })

    if (envDict.hdr)
      rgbeLoader.load(envDict.hdr, (texture) => {
        texture.mapping = EquirectangularReflectionMapping
        scene.environment = texture
      })
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

  loadEnv(params.environment)

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
  TWEEN_GROUP.update()
  useFrame()
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
    // transformControls.detach()
    return
  }

  // if (intersects[0].object.selectOnRaycast) {
  //   transformControls.attach(intersects[0].object.selectOnRaycast)
  // } else {
  //   transformControls.attach(intersects[0].object)
  // }

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

  // floor
  const floor = new Mesh(
    new PlaneGeometry(10, 10).rotateX(-Math.PI / 2),
    new MeshStandardMaterial({
      color: getRandomHexColor(),
      roughness: 0.5,
      metalness: 0,
    })
  )
  floor.name = 'floor'
  floor.receiveShadow = true
  mainObjects.add(floor)

  const l_h = new LoadingHelper()
  const gltf = await MODEL_LOADER(MODEL_LIST.porsche_1975.url, { loadingHelper: l_h })
  const model = gltf.scene
  model.name = 'car'

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model
    }
  })
  mainObjects.add(model)

  for (let index = 0; index < 30; index++) {
    const sphere = new Mesh(
      new SphereGeometry(0.3),
      new MeshStandardMaterial({
        color: getRandomHexColor(),
        roughness: 0,
        metalness: 0,
      })
    )
    sphere.name = 'sphere'
    sphere.castShadow = true
    sphere.receiveShadow = true
    sphere.position.set(MathUtils.randFloatSpread(10), MathUtils.randFloat(0, 5), MathUtils.randFloatSpread(10))
    mainObjects.add(sphere)
  }

  setupSpotLight()
}

function setupSpotLight() {
  scene.add(new AmbientLight(0xffffff, 0.5))
  const rendererSize = new Vector2()
  let opacity = 1,
    radiusTop,
    radiusBottom,
    color = 0xffffff,
    distance = 5 * 4,
    angle = 0.15 * 4,
    anglePower = 5

  const spotLight = new SpotLight()
  spotLight.intensity = 3
  spotLight.position.set(5, 5, 5)
  spotLight.angle = angle
  spotLight.color.set(color)
  spotLight.distance = distance
  spotLight.castShadow = true
  spotLight.shadow.bias = -0.0001
  const helper = new SpotLightHelper(spotLight)
  scene.add(spotLight)

  const volumeMaterial = new SpotLightMaterial()

  const basicMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 0.25,
  })

  const matOptions = {
    volumeMaterial,
    basicMaterial,
  }

  let depthTexture,
    depthUseFrame = () => {}
  function updateDepthTexture() {
    if (testParams.useDepth) {
      const dat = useDepthBuffer({ size: testParams.depthResolution })
      let oldTex = depthTexture
      depthTexture = dat[0]
      volumeMaterial.depth = dat[0]
      depthUseFrame = dat[1]
      renderer.getSize(rendererSize)
      rendererSize.multiplyScalar(renderer.getPixelRatio())
      volumeMaterial.resolution.copy(rendererSize)
      if (oldTex) {
        oldTex.dispose()
      }
    } else {
      volumeMaterial.depth = null
      volumeMaterial.resolution.set(0, 0)
    }
  }

  // console.log({ depthBuffer })

  volumeMaterial.spotPosition = spotLight.position
  volumeMaterial.opacity = opacity
  volumeMaterial.lightColor = spotLight.color
  volumeMaterial.attenuation = spotLight.distance
  volumeMaterial.anglePower = anglePower
  volumeMaterial.cameraNear = camera.near
  volumeMaterial.cameraFar = camera.far

  radiusTop = radiusTop === undefined ? 0.1 : radiusTop
  radiusBottom = radiusBottom === undefined ? spotLight.angle * 7 : radiusBottom

  console.log({ volumeMaterial })

  const updateVolumeGeometry = () => {
    volumeMaterial.attenuation = spotLight.distance
    distance = spotLight.distance
    radiusBottom = Math.tan(spotLight.angle) * spotLight.distance
    volumeMesh.geometry = getSpotGeo(distance, radiusTop, radiusBottom)
  }

  const testParams = {
    materialType: matOptions.volumeMaterial,
    helper: false,
    useDepth: false,
    depthResolution: 1,
    updateVolumeGeometry,
    animateTarget: false,
    animateLight: false,
  }

  const getSpotGeo = (distance, radiusTop, radiusBottom) => {
    const geometry = new CylinderGeometry(radiusTop, radiusBottom, distance, 128, 64, true)
    geometry.translate(0, -distance / 2, 0)
    geometry.rotateX(-Math.PI / 2)
    return geometry
  }

  const volumeMesh = new Mesh(getSpotGeo(distance, radiusTop, radiusBottom), volumeMaterial)

  updateVolumeGeometry()

  spotLight.add(volumeMesh)
  const vec = new Vector3()
  useFrame = () => {
    // volumeMaterial.spotPosition.copy(volumeMesh.getWorldPosition(vec))
    volumeMesh.lookAt(spotLight.target.getWorldPosition(vec))
    if (helper.parent) helper.update()

    // useFrame from FBO
    if (testParams.useDepth) {
      volumeMaterial.depth = null
      depthUseFrame()
      volumeMaterial.depth = depthTexture
    }
  }

  window.onresize = () => {
    renderer.getSize(rendererSize)
    rendererSize.multiplyScalar(renderer.getPixelRatio())
    if (testParams.useDepth) volumeMaterial.resolution.copy(rendererSize)
    console.log(volumeMaterial.resolution)
  }

  function addGui(gui) {
    const folder = gui.addFolder('SpotLight Volume')
    folder.open()
    folder.add(testParams, 'materialType', matOptions).onChange((v) => {
      volumeMesh.material = v
    })

    folder.add(testParams, 'useDepth').onChange(updateDepthTexture)
    folder.add(testParams, 'depthResolution', 0.1, 1, 0.1).onChange(updateDepthTexture)

    folder.add(volumeMaterial, 'opacity', 0, 2)
    folder.add(volumeMaterial, 'attenuation', 0, distance)
    folder.add(volumeMaterial, 'anglePower', 0, Math.PI)
    folder.add(volumeMaterial, 'cameraNear', 0, 10)
    folder.add(volumeMaterial, 'cameraFar', 0, 10)

    folder.add(volumeMaterial.resolution, 'x', 0, 1000, 1).listen()
    folder.add(volumeMaterial.resolution, 'y', 0, 1000, 1).listen()

    const sp = gui.addFolder('SpotLight')
    sp.open()
    sp.add(testParams, 'helper').onChange((v) => {
      if (v) {
        scene.add(helper)
      } else {
        helper.removeFromParent()
      }
    })
    sp.addColor(spotLight, 'color')
    sp.add(spotLight, 'intensity', 0, 500)
    sp.add(spotLight, 'angle', 0, Math.PI / 2).onChange(updateVolumeGeometry)
    sp.add(spotLight, 'penumbra', 0, 1)
    sp.add(spotLight, 'distance', 0.1, 20).onChange(updateVolumeGeometry)
    sp.add(spotLight.shadow, 'bias', -0.0001, 0.0001)

    sp.add(testParams, 'animateTarget')
      .name('🚲Animate target')
      .onChange((v) => {
        if (v) {
          randomMovementTarget.start()
        } else {
          randomMovementTarget.stop()
        }
      })
    sp.add(testParams, 'animateLight')
      .name('🚲Animate light')
      .onChange((v) => {
        if (v) {
          randomMovementLight.start()
        } else {
          randomMovementLight.stop()
        }
      })
  }

  transformControls.attach(spotLight)
  addGui(gui)

  const randomMovementTarget = getRandomPosTween(spotLight.target.position, 20, 2000, 1000)
  const randomMovementLight = getRandomPosTween(spotLight.position, 20, 2000, 1000)
}

const color = new Color()
function getRandomHexColor() {
  return '#' + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

let depthFBO
function useDepthBuffer({ size, frames = Infinity } = {}) {
  const gl = renderer

  const rendererSize = new Vector3()
  gl.getSize(rendererSize)
  rendererSize.multiplyScalar(gl.getPixelRatio())
  const w = size * rendererSize.x
  const h = size * rendererSize.y

  console.log('depth tex res', w, h)

  const depthTexture = new DepthTexture(w, h)
  depthTexture.format = DepthFormat
  depthTexture.type = UnsignedShortType
  depthTexture.name = 'Depth_Buffer'

  let count = 0

  if (!depthFBO) {
    depthFBO = useFBO(w, h)
  } else {
    depthFBO.depthTexture.dispose()
  }

  depthFBO.depthTexture = depthTexture
  depthFBO.setSize(w, h)

  const useFrame = () => {
    if (frames === Infinity || count < frames) {
      gl.setRenderTarget(depthFBO)
      gl.render(scene, camera)
      gl.setRenderTarget(null)
      count++
    }
  }

  // console.log({ depthFBO })

  return [depthFBO.depthTexture, useFrame]
}

/**
 * Random loc tween
 * @param {Vector3} obj
 * @returns
 */
function getRandomPosTween(vec, range, duration, delay) {
  const tween = new Tween(vec, TWEEN_GROUP)
    .to(
      {
        x: MathUtils.randFloatSpread(range),
        z: MathUtils.randFloatSpread(range),
      },
      duration
    )

    .easing(Easing.Bounce.Out)
    .repeat(10000)
    .repeatDelay(delay)
    .onStart(() => {
      updateTweenStartValues()
    })
    .onRepeat(() => {
      updateTweenStartValues()

      tween._valuesEnd.x = MathUtils.randFloatSpread(6)
      tween._valuesEnd.z = MathUtils.randFloatSpread(6)
    })

  const updateTweenStartValues = () => {
    tween._valuesStart.x = vec.x
    tween._valuesStart.z = vec.z
  }

  return tween
}

// 👇 uncomment when TS version supports function overloads
// export function useFBO(settings?: FBOSettings)
export function useFBO(
  /** Width in pixels, or settings (will render fullscreen by default) */
  width,
  /** Height in pixels */
  height,
  /**Settings */
  settings = {}
) {
  const gl = renderer
  const _width = width
  const _height = height
  const _settings = settings
  const { samples = 0, depth, ...targetSettings } = _settings

  let target
  target = new WebGLRenderTarget(_width, _height, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    colorSpace: gl.outputColorSpace,
    type: HalfFloatType,
    ...targetSettings,
  })

  // if (depth) {
  //   target.depthTexture = new DepthTexture(_width, _height, FloatType)
  // }

  target.samples = samples

  return target
}

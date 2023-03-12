import {
  ACESFilmicToneMapping,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  sRGBEncoding,
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
  DoubleSide,
  AxesHelper,
  Clock,
  FogExp2,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { SpotLightMaterial } from '../wip/SpotLightMaterial'
import { DepthTexture } from 'three'
import { DepthFormat } from 'three'
import { UnsignedShortType } from 'three'

import { Easing, Tween, update } from '@tweenjs/tween.js'
import { MathUtils } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { EffectComposer, EffectPass, RenderPass, SelectiveBloomEffect } from 'postprocessing'

import porscheUrl from '../models/porsche_911_1975.glb'
import poleUrl from '../models/pole.glb'
import roadUrl from '../models/road.glb'

import { BG_ENV } from './BG_ENV'

let stats,
  renderer,
  composer,
  bloomEffect,
  raf,
  camera,
  scene,
  controls,
  gui,
  groundProjectedEnv,
  pointer = new Vector2()

const params = {
  environment: HDRI_LIST.kloppenheim,
  groundProjection: false,
  bgColor: new Color(),
  printCam: () => {},
}
const mainObjects = new Group()
const textureLoader = new TextureLoader()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
// draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/")
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let useFrame = () => {}
let sceneGui
let pmremGenerator

export async function spotLightDemo1(mainGui) {
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
  renderer.outputEncoding = sRGBEncoding
  renderer.toneMapping = ACESFilmicToneMapping

  pmremGenerator = new PMREMGenerator(renderer)
  pmremGenerator.compileCubemapShader()
  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(-10, 10, 10)
  camera.name = 'Camera'
  // scene
  scene = new Scene()
  //   scene.backgroundBlurriness = 0.8

  scene.add(mainObjects)

  //composer
  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  bloomEffect = new SelectiveBloomEffect(scene, camera, {
    luminanceThreshold: 0,
    luminanceSmoothing: 0,
    intensity: 90,
    mipmapBlur: true,
  })
  bloomEffect.ignoreBackground = true
  bloomEffect.mipmapBlurPass.radius = 0.3
  bloomEffect.mipmapBlurPass.levels = 4

  gui.add(bloomEffect, 'intensity', 0, 1000)
  gui.add(bloomEffect.luminanceMaterial, 'threshold', 0, 10)
  gui.add(bloomEffect.luminanceMaterial, 'smoothing', 0, 10)
  gui.add(bloomEffect.mipmapBlurPass, 'levels', 0, 10)
  gui.add(bloomEffect.mipmapBlurPass, 'radius', 0, 10)

  const effectPass = new EffectPass(camera, bloomEffect)
  composer.addPass(effectPass)

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
  scene.add(transformControls)

  scene.fog = new FogExp2(0x000000, 0.1)

  window.addEventListener('resize', onWindowResize)
  document.addEventListener('pointermove', onPointerMove)

  let downtick = Date.now()
  app.addEventListener('pointerdown', () => {
    downtick = Date.now()
  })
  app.addEventListener('pointerup', (e) => {
    if (Date.now() - downtick < 200) {
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

  const bg_env = new BG_ENV(scene, sceneGui)
  bg_env.preset = HDRI_LIST.kloppenheim
  bg_env.setEnvType('HDRI')
  bg_env.setBGType('Color')
  bg_env.bgColor.set(0x000000)
  bg_env.updateAll()
  await loadModels()

  const envVals = {
    int: 0.1,
  }
  function updateEnvInt() {
    scene.traverse((node) => {
      if (node.material && node.material.envMapIntensity !== undefined) {
        node.material.envMapIntensity = envVals.int
      }
    })
  }

  sceneGui.add(envVals, 'int', 0, 1).onChange(updateEnvInt)
  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  // renderer.setSize(window.innerWidth, window.innerHeight)
  composer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  stats.update()
  update() //tween
  useFrame()
  controls.update()
  // renderer.render(scene, camera)
  composer.render()
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

  for (const iterator of intersects) {
    if (iterator.object.selectOnRaycast) {
      transformControls.attach(iterator.object.selectOnRaycast)
      break
    }
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

  // floor
  const floor = new Mesh(
    new PlaneGeometry(100, 100).rotateX(-Math.PI / 2),
    new MeshStandardMaterial({
      color: getRandomHexColor(),
      roughness: 0.5,
      metalness: 0,
    })
  )
  floor.name = 'floor'
  floor.receiveShadow = true
  // mainObjects.add(floor)

  setupScene()
}
const getSpotGeo = (distance, radiusTop, radiusBottom) => {
  const geometry = new CylinderGeometry(radiusTop, radiusBottom, distance, 128, 64, true)
  geometry.translate(0, -distance / 2, 0)
  geometry.rotateX(-Math.PI / 2)
  return geometry
}

/**
 * Update light volume mesh
 * @param {SpotLight} light
 * @param {Mesh} mesh
 */
const updateVolumeGeometry = (light, mesh, radiusTop) => {
  mesh.material.attenuation = light.distance
  let radiusBottom = Math.tan(light.angle) * light.distance
  mesh.geometry = getSpotGeo(light.distance, radiusTop, radiusBottom)
}

async function setupScene() {
  addCar()
  addRoad()

  useFrame = () => {
    const tick = clock.getDelta()
    const time = clock.getElapsedTime()

    const factor = tick * generalParams.speed
    // volumeMeshL.lookAt(headLightL.target.getWorldPosition(vec))
    // volumeMeshR.lookAt(headLightR.target.getWorldPosition(vec))
    volumeMaterialL.spotPosition.copy(volumeMeshL.getWorldPosition(vec))
    volumeMaterialR.spotPosition.copy(volumeMeshR.getWorldPosition(vec))

    for (let index = 0; index < lamps.length; index++) {
      const pole = lamps[index]
      pole.position.z -= factor

      if (pole.position.z < (-lampParams.gap / 2) * lamps.length) {
        pole.position.z = (lampParams.gap / 2) * lamps.length
      }

      volMeshes[index].material.spotPosition.copy(pole.getWorldPosition(vec))
    }

    for (let index = 0; index < roadMeshes.length; index++) {
      roadMeshes[index].position.z -= factor
    }

    wheels.FL.rotation.x += factor * wheels.wheenSpinMultiplier
    wheels.FR.rotation.x += factor * wheels.wheenSpinMultiplier
    wheels.R.rotation.x += factor * wheels.wheenSpinMultiplier

    if (params.useDepth) {
      let depTex
      for (const mat of allVolMats) {
        depTex = mat.depth
        mat.depth = null
      }
      calculateDepth()
      for (const mat of allVolMats) {
        mat.depth = depTex
      }
    }
  }
}

const color = new Color()
function getRandomHexColor() {
  return '#' + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

function useDepthBuffer({ size, frames = Infinity } = {}) {
  const gl = renderer

  const rendererSize = new Vector3()
  gl.getSize(rendererSize)
  const w = size || rendererSize.x
  const h = size || rendererSize.y

  console.log('depth tex res', w, h)

  const depthTexture = new DepthTexture(w, h)
  depthTexture.format = DepthFormat
  depthTexture.type = UnsignedShortType
  depthTexture.name = 'Depth_Buffer'

  let count = 0
  const depthFBO = useFBO(w, h, { depthTexture })

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
  const tween = new Tween(vec)
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

      tween.to({
        x: MathUtils.randFloatSpread(6),
        z: MathUtils.randFloatSpread(6),
      })
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
  settings
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
    encoding: gl.outputEncoding,
    type: HalfFloatType,
    ...targetSettings,
  })

  // if (depth) {
  //   target.depthTexture = new DepthTexture(_width, _height, FloatType)
  // }

  target.samples = samples

  return target
}

async function addCar() {
  // CAR
  const gltf = await gltfLoader.loadAsync(porscheUrl)
  const model = gltf.scene
  model.name = 'car'

  model.traverse((child) => {
    if (child.isMesh) {
      child.selectOnRaycast = model

      if (!child.material.transparent) {
        child.castShadow = true
        child.receiveShadow = true
      }
    }
  })
  // mainObjects.add(model)
  const allVolMats = []

  // wheel references
  const wheels = {
    FL: null,
    FR: null,
    R: null,
    steerL: null,
    steerR: null,
    steerVal: 0,
    emit: null,
    lights: null,
    wheenSpinMultiplier: 1.8,
  }

  wheels.R = model.getObjectByName('wheels_rear')

  wheels.FL = model.getObjectByName('wheel_L')
  wheels.FR = model.getObjectByName('wheel_R')

  wheels.steerL = model.getObjectByName('steer_L')
  wheels.steerR = model.getObjectByName('steer_R')

  wheels.emit = model.getObjectByName('emit')
  wheels.lights = model.getObjectByName('lights')
  wheels.emit.material = new MeshStandardMaterial()
  wheels.emit.material.color.set(0x000000)
  wheels.emit.material.emissive.set('#ffbb73')

  gui.add(wheels.emit.material, 'emissiveIntensity', 0, 50)
  gui.add(wheels.lights.material, 'emissiveIntensity', 0, 50)

  const params = {
    useDepth: false,
    distance: 5,
    depthResolution: 512,
  }
  const headLightL = new SpotLight()
  headLightL.intensity = 5
  headLightL.castShadow = true
  headLightL.color.set('#ffbb73')
  headLightL.angle = MathUtils.degToRad(25)
  headLightL.penumbra = 0.2
  headLightL.distance = params.distance
  const headLightR = headLightL.clone()

  model.add(headLightL, headLightR)
  model.add(headLightL.target, headLightR.target)

  headLightL.target.add(new AxesHelper(0.1))
  headLightR.target.add(new AxesHelper(0.1))

  headLightL.position.set(-0.66, 0.66, 2)
  headLightL.target.position.set(-0.66, 0.5, 10)

  headLightR.position.set(0.66, 0.66, 2)
  headLightR.target.position.set(0.66, 0.5, 10)

  const helperL = new SpotLightHelper(headLightL)
  const helperR = new SpotLightHelper(headLightR)
  // scene.add(helperL, helperR)

  // cone meshes

  let radiusTop = 0.08
  const volumeMaterialL = new SpotLightMaterial()
  // volumeMaterialL.spotPosition = new Vector3()
  volumeMaterialL.opacity = 1
  volumeMaterialL.lightColor = headLightL.color
  volumeMaterialL.attenuation = params.distance
  volumeMaterialL.anglePower = 3
  volumeMaterialL.cameraNear = camera.near
  volumeMaterialL.cameraFar = camera.far

  const volumeMaterialR = new SpotLightMaterial()
  // volumeMaterialR.spotPosition = new Vector3()
  volumeMaterialR.opacity = 1
  volumeMaterialR.lightColor = headLightR.color
  volumeMaterialR.attenuation = params.distance
  volumeMaterialR.anglePower = 3
  volumeMaterialR.cameraNear = camera.near
  volumeMaterialR.cameraFar = camera.far

  const volumeMeshL = new Mesh(getSpotGeo(params.distance, radiusTop, 0.5), volumeMaterialL)
  const volumeMeshR = new Mesh(getSpotGeo(params.distance, radiusTop, 0.5), volumeMaterialR)

  headLightL.add(volumeMeshL)
  headLightR.add(volumeMeshR)

  allVolMats.push(volumeMaterialL, volumeMaterialR)

  const vec = new Vector3()
  volumeMeshL.lookAt(headLightL.target.position)
  volumeMeshR.lookAt(headLightR.target.position)

  updateVolumeGeometry(headLightL, volumeMeshL, radiusTop)
  updateVolumeGeometry(headLightR, volumeMeshR, radiusTop)

  console.log(volumeMaterialL, volumeMaterialR)

  function addGui(gui) {
    const folder = gui.addFolder('SpotLight Volume')
    folder.open()
    // folder.add(testParams, 'materialType', matOptions).onChange((v) => {
    //   volumeMesh.material = v
    // })

    // folder.add(testParams, 'useDepth').onChange(updateDepthTexture)
    // folder.add(testParams, 'depthResolution', 128, 2048, 1).onChange(updateDepthTexture)

    // folder.add(volumeMaterial, 'opacity', 0, 2)
    // folder.add(volumeMaterial, 'attenuation', 0, headLightL.distance)
    // folder.add(volumeMaterial, 'anglePower', 0, 15)
    // folder.add(volumeMaterial, 'cameraNear', 0, 10)
    // folder.add(volumeMaterial, 'cameraFar', 0, 10)

    const sp = gui.addFolder('SpotLight')
    sp.open()
    // sp.add(testParams, 'helper').onChange((v) => {
    //   if (v) {
    //     scene.add(helper)
    //   } else {
    //     helper.removeFromParent()
    //   }
    // })
    sp.addColor(headLightL, 'color').onChange(() => {
      headLightR.color.copy(headLightL.color)
    })
    sp.add(headLightL, 'intensity', 0, 5).onChange(() => {
      headLightR.intensity = headLightL.intensity
    })
    sp.add(headLightL, 'angle', 0, Math.PI / 2).onChange(() => {
      headLightR.angle = headLightL.angle
      updateVolumeGeometry(headLightL, volumeMeshL, radiusTop)
      updateVolumeGeometry(headLightR, volumeMeshR, radiusTop)
    })
    sp.add(headLightL, 'penumbra', 0, 1).onChange(() => {
      headLightR.penumbra = headLightL.penumbra
    })
    sp.add(params, 'distance', 0.1, 20).onChange((v) => {
      headLightL.distance = v
      headLightR.distance = v
      updateVolumeGeometry(headLightL, volumeMeshL, radiusTop)
      updateVolumeGeometry(headLightR, volumeMeshR, radiusTop)
    })
    sp.add(headLightL.shadow, 'bias', -0.0001, 0.0001).onChange(() => {
      headLightR.shadow.bias = headLightL.shadow.bias
    })

    // sp.add(testParams, 'animateTarget')
    //   .name('🚲Animate target')
    //   .onChange((v) => {
    //     if (v) {
    //       randomMovementTarget.start()
    //     } else {
    //       randomMovementTarget.stop()
    //     }
    //   })
    // sp.add(testParams, 'animateLight')
    //   .name('🚲Animate light')
    //   .onChange((v) => {
    //     if (v) {
    //       randomMovementLight.start()
    //     } else {
    //       randomMovementLight.stop()
    //     }
    //   })
  }

  addGui(gui)

  const steerLimit = MathUtils.degToRad(15)
  const distanceMoved = 0.25

  function steer() {
    const rY = MathUtils.mapLinear(wheels.steerVal, -1, 1, -steerLimit, steerLimit)
    wheels.steerL.rotation.y = rY
    wheels.steerR.rotation.y = rY
  }

  const straightSteer = new Tween(wheels)
    .to({ steerVal: 0 })
    .duration(1000)
    .easing(Easing.Quadratic.InOut)
    .onStart(() => {
      straightSteer._valuesStart.steerVal = wheels.steerVal
    })
    .onUpdate(() => {
      steer()
    })

  let pingPong = true
  const randomSteer = new Tween(wheels)
    .to({ steerVal: 1 })
    .duration(1000)
    .easing(Easing.Quadratic.InOut)
    .delay(1000)
    .onStart(() => {
      randomSteer.delay(MathUtils.randInt(100, 4000))
      if (pingPong) {
        randomSteer.to({ steerVal: 1 })
        moveTween.to({ x: distanceMoved })
      } else {
        randomSteer.to({ steerVal: -1 })
        moveTween.to({ x: -distanceMoved })
      }
      pingPong = !pingPong

      randomSteer._valuesStart.steerVal = wheels.steerVal

      moveTween.start()
    })
    .onUpdate(() => {
      steer()
    })

  randomSteer.chain(straightSteer)
  straightSteer.chain(randomSteer)
  randomSteer.start()

  const moveTween = new Tween(model.position)
    .to({ x: 0 })
    .duration(2000)
    .easing(Easing.Quadratic.InOut)
    .onStart(() => {
      moveTween._valuesStart.x = model.position.x
    })
    .onUpdate(() => {
      console.log('move')
    })

  gui.add(wheels, 'steerVal', -1, 1).onChange(steer)
}

async function addRoad() {
  //road
  const gltfRoad = await gltfLoader.loadAsync(roadUrl)
  const modelRoad = gltfRoad.scene
  modelRoad.name = 'road'

  modelRoad.traverse((child) => {
    if (child.isMesh) {
      child.selectOnRaycast = modelRoad
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  // mainObjects.add(modelRoad)

  const roadParams = {
    gap: 12,
  }
  const roadMeshes = []
  for (let index = 0; index < 3; index++) {
    const roadMesh = modelRoad.clone()
    roadMeshes.push(roadMesh)
    roadMesh.position.z = index * roadParams.gap
    mainObjects.add(roadMesh)
  }
}

async function addPoles() {
  // poles

  const gltfPole = await gltfLoader.loadAsync(poleUrl)
  const modelPole = gltfPole.scene
  modelPole.name = 'pole'

  modelPole.traverse((child) => {
    if (child.isMesh) {
      child.selectOnRaycast = modelPole
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  // mainObjects.add(modelPole)

  modelPole.position.set(-6, 0, 0)
  modelPole.rotation.y = Math.PI / 2

  const poleEmit = modelPole.getObjectByName('emit')
  poleEmit.material = new MeshStandardMaterial()
  poleEmit.material.color.set(0x000000)
  poleEmit.material.emissive.set('#ffbb73')
  poleEmit.castShadow = false
  poleEmit.receiveShadow = false

  const lamps = []
  const volMeshes = []
  const generalParams = {
    speed: 1,
  }
  const lampParams = {
    gap: 10,
  }
  for (let index = 0; index < 1; index++) {
    const pole = modelPole.clone()
    lamps.push(pole)
    pole.position.z = index * lampParams.gap
    const spotLight = new SpotLight()

    spotLight.intensity = 100
    spotLight.angle = MathUtils.degToRad(25)
    spotLight.penumbra = 0.5
    spotLight.distance = 12
    spotLight.position.set(0, 7.2, 1.8)
    spotLight.target.position.set(0, 0, 0)
    spotLight.castShadow = true
    spotLight.shadow.bias = -0.0001

    const lampVolMat = new SpotLightMaterial()
    allVolMats.push(lampVolMat)
    // lampVolMat.spotPosition = new Vector3()
    lampVolMat.opacity = 0.5
    lampVolMat.lightColor = spotLight.color

    lampVolMat.anglePower = 3
    lampVolMat.cameraNear = camera.near
    lampVolMat.cameraFar = camera.far
    const volMesh = new Mesh(getSpotGeo(spotLight.distance, radiusTop, 0.5), lampVolMat)
    spotLight.add(volMesh)
    updateVolumeGeometry(spotLight, volMesh, radiusTop)
    volMesh.lookAt(spotLight.target.getWorldPosition(vec))

    volMeshes.push(volMesh)
    // lampVolMat.attenuation = 10

    const lampGui = gui.addFolder('lamp' + index)
    lampGui.add(spotLight.shadow, 'bias', -0.0001, 0.0001).onChange(() => {})

    lampGui.add(lampVolMat, 'opacity', 0, 2)
    lampGui.add(lampVolMat, 'attenuation', 0, spotLight.distance)
    lampGui.add(lampVolMat, 'anglePower', 0, 15)
    lampGui.add(lampVolMat, 'cameraNear', 0, 10)
    lampGui.add(lampVolMat, 'cameraFar', 0, 10)

    pole.add(spotLight)
    const helper = new SpotLightHelper(spotLight)
    scene.add(helper)
    transformControls.attach(spotLight)
    mainObjects.add(pole)
  }
  bloomEffect.selection.set([wheels.emit, poleEmit])

  gui.add(generalParams, 'speed', 1, 20)
  gui.add(lampParams, 'gap', 10, 30, 1).onChange(() => {
    for (let index = 0; index < lamps.length; index++) {
      const pole = lamps[index]
      pole.position.z = index * lampParams.gap
      console.log(index, pole.position.z)
    }
  })

  gui.add(wheels, 'wheenSpinMultiplier', 1, 3, 0.001).onChange(() => {})

  const clock = new Clock(true)
  const rendererSize = new Vector3()
  window.onresize = () => {
    if (params.useDepth) renderer.getSize(rendererSize)
  }
  let calculateDepth = () => {}
  function updateDepthTexture() {
    if (params.useDepth) {
      const dat = useDepthBuffer({ size: params.depthResolution })
      let oldTex
      for (const mat of allVolMats) {
        oldTex = mat.depth
        mat.depth = dat[0]
        mat.resolution = renderer.getSize(rendererSize)
      }

      calculateDepth = dat[1]

      if (oldTex) {
        oldTex.dispose()
      }
    } else {
      for (const mat of allVolMats) {
        mat.depth = null
        mat.resolution.set(0, 0)
      }
    }
  }

  gui.add(params, 'useDepth').onChange(updateDepthTexture)
  volumeMaterialL.spotPosition.copy(volumeMeshL.getWorldPosition(vec))
  volumeMaterialR.spotPosition.copy(volumeMeshR.getWorldPosition(vec))
  for (let index = 0; index < lamps.length; index++) {
    const pole = lamps[index]
    volMeshes[index].material.spotPosition.copy(pole.getWorldPosition(vec))
    volMeshes[index].lookAt(volMeshes[index].parent.target.getWorldPosition(vec))
  }
}

import {
  ACESFilmicToneMapping,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
  Vector2,
  Raycaster,
  Group,
  VSMShadowMap,
  SpotLight,
  CylinderGeometry,
  Vector3,
  WebGLRenderTarget,
  HalfFloatType,
  LinearFilter,
  Clock,
  FogExp2,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { SpotLightMaterial } from '@pmndrs/vanilla'
import { DepthTexture } from 'three'
import { DepthFormat } from 'three'
import { UnsignedShortType } from 'three'

import { Easing, Tween, update } from '@tweenjs/tween.js'
import { MathUtils } from 'three'
import { EffectComposer, EffectPass, RenderPass, SelectiveBloomEffect } from 'postprocessing'

import { BG_ENV } from './BG_ENV'
import { MODEL_LIST } from '../models/MODEL_LIST'

let stats,
  renderer,
  composer,
  bloomEffect,
  raf,
  camera,
  scene,
  controls,
  gui,
  pointer = new Vector2()

const params = {
  // environment: HDRI_LIST.kloppenheim,
  // groundProjection: false,
  // bgColor: new Color(),
  printCam: () => {},
  pixelRatio: Math.min(1.5, window.devicePixelRatio),
}
const mainObjects = new Group()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let useFrame = () => {}
let sceneGui

export async function spotLightDemo1(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder('Scene')
  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({ powerPreference: 'high-performance', antialias: false, stencil: false, depth: false })
  renderer.setPixelRatio(params.pixelRatio)

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = VSMShadowMap
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping

  // pmremGenerator = new PMREMGenerator(renderer)
  // pmremGenerator.compileCubemapShader()
  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(5, 2, 5)
  camera.name = 'Camera'
  // scene
  scene = new Scene()
  //   scene.backgroundBlurriness = 0.8

  scene.add(mainObjects)

  //composer
  composer = new EffectComposer(renderer, { multisampling: 4 })
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

  // gui.add(bloomEffect, 'intensity', 0, 1000)
  // gui.add(bloomEffect.luminanceMaterial, 'threshold', 0, 10)
  // gui.add(bloomEffect.luminanceMaterial, 'smoothing', 0, 10)
  // gui.add(bloomEffect.mipmapBlurPass, 'levels', 0, 10)
  // gui.add(bloomEffect.mipmapBlurPass, 'radius', 0, 10)

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

  // sceneGui.add(transformControls, 'mode', ['translate', 'rotate', 'scale'])
  // sceneGui.add(scene, "backgroundBlurriness", 0, 1, 0.01)
  // sceneGui.addColor(params, "bgColor").onChange(() => {
  //   scene.background = params.bgColor
  // })

  // const light = new PointLight()
  // light.position.set(5, 5, 5)
  // scene.add(light)

  const bg_env = new BG_ENV(scene)
  bg_env.preset = HDRI_LIST.kloppenheim
  bg_env.setEnvType('HDRI')
  bg_env.setBGType('Color')
  bg_env.bgColor.set(0x000000)
  bg_env.updateAll()
  bg_env.addGui(sceneGui)
  await loadModels()

  const envVals = {
    int: 0.15,
  }
  function updateEnvInt() {
    scene.traverse((node) => {
      if (node.material && node.material.envMapIntensity !== undefined) {
        node.material.envMapIntensity = envVals.int
        if (node.material.type === 'MeshPhysicalMaterial') {
          console.log(node.material)
        }
      }
    })
  }

  updateEnvInt()

  sceneGui.add(envVals, 'int', 0, 1).onChange(updateEnvInt)

  // gui.add(params, 'pixelRatio', 0.5, window.devicePixelRatio * 3).onChange((v) => {
  //   renderer.setPixelRatio(v)
  //   composer.setSize(window.innerWidth, window.innerHeight)
  // })
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
  return
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
  await setupScene()
  renderer.compile(scene, camera)
}

/**
 * Spotlight cone geometry
 * @param {Number} distance
 * @param {Number} radiusTop
 * @param {Number} radiusBottom
 * @returns
 */
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

async function setupScene() {
  const AllVolumeMaterials = []

  const params = {
    speed: 10,
    useDepth: false,
    depthResolution: 1024,
  }

  // const roadOnFrame = await addRoad()
  // const carOnFrame = await addCar(AllVolumeMaterials)
  // const poleOnFrame = await addPoles(AllVolumeMaterials)

  const [roadOnFrame, carOnFrame, poleOnFrame] = await Promise.all([
    addRoad(),
    addCar(AllVolumeMaterials),
    addPoles(AllVolumeMaterials),
  ])

  const rendererSize = new Vector3()

  const resizeDepthMap = () => {
    if (params.useDepth) {
      renderer.getSize(rendererSize)
      rendererSize.multiplyScalar(renderer.getPixelRatio())
    }
  }
  window.addEventListener('resize', resizeDepthMap)
  let calculateDepth = () => {}

  function updateDepthTexture() {
    if (params.useDepth) {
      const dat = useDepthBuffer({ size: params.depthResolution })
      let oldTex
      for (const mat of AllVolumeMaterials) {
        oldTex = mat.depth
        mat.depth = dat[0]
        mat.resolution = rendererSize
      }
      resizeDepthMap()
      calculateDepth = dat[1]

      if (oldTex) {
        oldTex.dispose()
      }
    } else {
      for (const mat of AllVolumeMaterials) {
        mat.depth = null
        mat.resolution.set(0, 0)
      }
    }
  }

  // updateDepthTexture()

  gui.add(params, 'useDepth').onChange(updateDepthTexture)
  gui.add(params, 'depthResolution', 128, 1024, 128).onChange(updateDepthTexture)

  gui.add(params, 'speed', 0.1, 20).onChange()
  const clock = new Clock(true)

  let depTex, tick

  useFrame = () => {
    tick = clock.getDelta() * params.speed

    roadOnFrame(tick)
    carOnFrame(tick)
    poleOnFrame(tick)

    if (params.useDepth) {
      //remove depth from material to avoid webgl warnings
      for (const mat of AllVolumeMaterials) {
        depTex = mat.depth
        mat.depth = null
      }
      calculateDepth()
      for (const mat of AllVolumeMaterials) {
        mat.depth = depTex
      }
    }
  }
}

async function addCar(AllVolumeMaterials) {
  // CAR
  const gltf = await gltfLoader.loadAsync(MODEL_LIST.porsche_1975.url)
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
  mainObjects.add(model)

  // wheel references
  const carParams = {
    FL: model.getObjectByName('wheel_L'),
    FR: model.getObjectByName('wheel_R'),
    R: model.getObjectByName('wheels_rear'),
    body: model.getObjectByName('body'),
    steerL: model.getObjectByName('steer_L'),
    steerR: model.getObjectByName('steer_R'),
    steerVal: 0,
    emit: model.getObjectByName('emit'),
    lights: model.getObjectByName('lights'),
    wheenSpinMultiplier: 1.8,
  }

  carParams.emit.material = new MeshStandardMaterial()
  carParams.emit.material.color.set(0x000000)
  carParams.emit.material.emissive.set('#ffbb73')
  carParams.lights.material.emissiveIntensity = 3
  // gui.add(carParams.emit.material, 'emissiveIntensity', 0, 50)
  // gui.add(carParams.lights.material, 'emissiveIntensity', 0, 50)

  const params = {
    distance: 8,
  }
  const headLightL = new SpotLight()
  headLightL.intensity = 5
  headLightL.color.set('#ffbb73')
  headLightL.angle = MathUtils.degToRad(20)
  headLightL.penumbra = 0.2
  headLightL.distance = params.distance
  const headLightR = headLightL.clone()

  model.add(headLightL, headLightR)
  model.add(headLightL.target, headLightR.target)

  headLightL.position.set(-0.66, 0.66, 2)
  headLightL.target.position.set(-0.66, 0.25, 10)

  headLightR.position.set(0.66, 0.66, 2)
  headLightR.target.position.set(0.66, 0.25, 10)

  // const helperL = new SpotLightHelper(headLightL)
  // const helperR = new SpotLightHelper(headLightR)
  // scene.add(helperL, helperR)

  // cone meshes

  let radiusTop = 0.08
  const volumeMaterialL = new SpotLightMaterial()
  // volumeMaterialL.spotPosition = new Vector3()
  volumeMaterialL.opacity = 1
  volumeMaterialL.lightColor = headLightL.color
  volumeMaterialL.attenuation = params.distance
  volumeMaterialL.anglePower = 5
  volumeMaterialL.cameraNear = camera.near
  volumeMaterialL.cameraFar = camera.far

  const volumeMaterialR = new SpotLightMaterial()
  // volumeMaterialR.spotPosition = new Vector3()
  volumeMaterialR.opacity = 1
  volumeMaterialR.lightColor = headLightR.color
  volumeMaterialR.attenuation = params.distance
  volumeMaterialR.anglePower = volumeMaterialL.anglePower
  volumeMaterialR.cameraNear = camera.near
  volumeMaterialR.cameraFar = camera.far
  AllVolumeMaterials.push(volumeMaterialL, volumeMaterialR)
  const volumeMeshL = new Mesh(getSpotGeo(params.distance, radiusTop, 0.5), volumeMaterialL)
  const volumeMeshR = new Mesh(getSpotGeo(params.distance, radiusTop, 0.5), volumeMaterialR)

  headLightL.add(volumeMeshL)
  headLightR.add(volumeMeshR)

  const vec = new Vector3()
  volumeMeshL.lookAt(headLightL.target.position)
  volumeMeshR.lookAt(headLightR.target.position)

  updateVolumeGeometry(headLightL, volumeMeshL, radiusTop)
  updateVolumeGeometry(headLightR, volumeMeshR, radiusTop)

  //BRAKE LIGHTS
  const bLightL = new SpotLight(0xff0000, 0.05)
  bLightL.penumbra = 1
  bLightL.position.set(0.62, 0.64, -2)
  bLightL.target.position.set(0.62, 0.0, -4)

  const bLightR = bLightL.clone()
  bLightR.position.set(-0.62, 0.64, -2)
  bLightR.target.position.set(-0.62, 0.0, -4)
  model.add(bLightL, bLightL.target, bLightR, bLightR.target)

  function addGui(gui) {
    const sp = gui.addFolder('HeadLight')
    const folder = sp.addFolder('Headlights Volume')

    folder.add(volumeMaterialL, 'opacity', 0, 2).onChange((v) => {
      volumeMaterialR.opacity = v
    })

    folder.add(volumeMaterialL, 'anglePower', 0, 15).onChange((v) => {
      volumeMaterialR.anglePower = v
    })

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
  }

  addGui(gui)

  const steerLimit = MathUtils.degToRad(15)
  const tiltLimit = MathUtils.degToRad(5)
  const distanceMoved = 0.25

  function steer() {
    const rY = MathUtils.mapLinear(carParams.steerVal, -1, 1, -steerLimit, steerLimit)
    carParams.steerL.rotation.y = rY
    carParams.steerR.rotation.y = rY
    carParams.body.rotation.z = MathUtils.mapLinear(carParams.steerVal, -1, 1, -tiltLimit, tiltLimit)
  }

  const straightSteer = new Tween(carParams)
    .to({ steerVal: 0 })
    .duration(1000)
    .easing(Easing.Elastic.Out)
    .onStart(() => {
      straightSteer._valuesStart.steerVal = carParams.steerVal
    })
    .onUpdate(() => {
      steer()
    })
  let pingPong = true
  const randomSteer = new Tween(carParams)
    .to({ steerVal: 1 })
    .duration(1000)
    .easing(Easing.Back.Out)
    .delay(1000)

    .onStart(() => {
      randomSteer.delay(MathUtils.randInt(100, 4000))
      if (pingPong) {
        randomSteer._valuesEnd.steerVal = 1
        moveTween._valuesEnd.x = distanceMoved
      } else {
        randomSteer._valuesEnd.steerVal = -1
        moveTween._valuesEnd.x = -distanceMoved
      }

      pingPong = !pingPong
      moveTween.start()
    })
    .onUpdate(() => {
      steer()
    })

  // randomSteer._valuesStart.steerVal = carParams.steerVal

  randomSteer.chain(straightSteer)
  straightSteer.chain(randomSteer)

  setTimeout(() => {
    randomSteer.startFromCurrentValues()
  }, 2000)

  const moveTween = new Tween(model.position)
    .to({ x: 0 })
    .duration(2000)
    .easing(Easing.Quadratic.InOut)
    .onStart(() => {
      moveTween._valuesStart.x = model.position.x
    })

  bloomEffect.selection.add(carParams.emit)

  return (tick) => {
    volumeMaterialL.spotPosition.copy(volumeMeshL.getWorldPosition(vec))
    volumeMaterialR.spotPosition.copy(volumeMeshR.getWorldPosition(vec))
    carParams.FL.rotation.x += tick * carParams.wheenSpinMultiplier
    carParams.FR.rotation.x += tick * carParams.wheenSpinMultiplier
    carParams.R.rotation.x += tick * carParams.wheenSpinMultiplier
  }
}

async function addRoad() {
  //road
  const gltfRoad = await gltfLoader.loadAsync(MODEL_LIST.road.url)
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

  const planeCount = 8 // set the number of planes here
  const planeWidth = 12 // set the plane width here

  const totalWidth = planeCount * planeWidth // calculate the total width of all the planes

  const planes = []

  for (let i = 0; i < planeCount; i++) {
    const roadMesh = modelRoad.clone()
    roadMesh.position.z = i * planeWidth - totalWidth / 2 // adjust the position based on the spacing
    mainObjects.add(roadMesh)
    planes.push(roadMesh)
  }

  return (tick) => {
    // move the planes along the z-axis
    planes.forEach((plane) => {
      plane.position.z -= tick

      // if the plane crosses the threshold, move it to the end
      if (plane.position.z < -totalWidth / 2) {
        plane.position.z += totalWidth
      }
    })
  }
}

async function addPoles(AllVolumeMaterials) {
  // poles
  const vec = new Vector3()
  const radiusTop = 0.1
  const gltfPole = await gltfLoader.loadAsync(MODEL_LIST.pole.url)
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

  const lampParams = {
    gap: 15,
  }
  const folder = gui.addFolder('Street Lamps')

  folder.add(lampParams, 'gap', 10, 30, 1).onChange(() => {
    for (let index = 0; index < lamps.length; index++) {
      const pole = lamps[index]
      pole.position.z = index * lampParams.gap
      console.log(index, pole.position.z)
    }
  })

  bloomEffect.selection.add(poleEmit)

  for (let index = 0; index < 4; index++) {
    const pole = modelPole.clone()
    lamps.push(pole)
    pole.position.z = index * lampParams.gap
    const spotLight = new SpotLight()

    spotLight.intensity = 100
    spotLight.angle = MathUtils.degToRad(30)
    spotLight.penumbra = 0.5
    spotLight.distance = 12
    spotLight.position.set(0, 7.2, 1.8)
    spotLight.target.position.set(0, 0, 7)
    spotLight.castShadow = true
    spotLight.shadow.bias = -0.0001

    const lampVolMat = new SpotLightMaterial()
    AllVolumeMaterials.push(lampVolMat)
    // lampVolMat.spotPosition = new Vector3()
    lampVolMat.opacity = 0.5
    lampVolMat.lightColor = spotLight.color

    lampVolMat.anglePower = 5
    lampVolMat.cameraNear = camera.near
    lampVolMat.cameraFar = camera.far
    const volMesh = new Mesh(getSpotGeo(spotLight.distance, radiusTop, 0.5), lampVolMat)
    spotLight.add(volMesh)
    updateVolumeGeometry(spotLight, volMesh, radiusTop)
    volMesh.lookAt(spotLight.target.getWorldPosition(vec))

    volMeshes.push(volMesh)
    // lampVolMat.attenuation = 10

    const lampGui = folder.addFolder('lamp ' + index)
    lampGui.add(spotLight.shadow, 'bias', -0.0001, 0.0001).onChange(() => {})

    lampGui.add(lampVolMat, 'opacity', 0, 2)
    lampGui.add(lampVolMat, 'attenuation', 0, spotLight.distance)
    lampGui.add(lampVolMat, 'anglePower', 0, 15)
    lampGui.add(lampVolMat, 'cameraNear', 0, 10)
    lampGui.add(lampVolMat, 'cameraFar', 0, 10)

    pole.add(spotLight, spotLight.target)
    // const helper = new SpotLightHelper(spotLight)
    // scene.add(helper)
    mainObjects.add(pole)
  }

  for (let index = 0; index < lamps.length; index++) {
    const pole = lamps[index]
    volMeshes[index].material.spotPosition.copy(pole.getWorldPosition(vec))
    volMeshes[index].lookAt(volMeshes[index].parent.target.getWorldPosition(vec))
  }

  return (tick) => {
    for (let index = 0; index < lamps.length; index++) {
      const pole = lamps[index]
      pole.position.z -= tick

      if (pole.position.z < (-lampParams.gap / 2) * lamps.length) {
        pole.position.z += lampParams.gap * lamps.length
      }

      volMeshes[index].material.spotPosition.copy(volMeshes[index].getWorldPosition(vec))
    }
  }
}

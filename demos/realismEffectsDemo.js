import Stats from "three/examples/jsm/libs/stats.module"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader"
import { GroundProjectedEnv } from "three/examples/jsm/objects/GroundProjectedEnv"

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer, EffectPass, RenderPass } from "postprocessing"
import {
  SSGIEffect,
  TRAAEffect,
  MotionBlurEffect,
  VelocityDepthNormalPass,
  SSDGIEffect,
  SSREffect,
} from "realism-effects"
import porscheUrl from "../models/porsche_911_1975.glb"

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
  PlaneGeometry,
  TextureLoader,
  EquirectangularReflectionMapping,
  DirectionalLight,
  VSMShadowMap,
  FloatType,
  PMREMGenerator,
  CircleGeometry,
} from "three"
import { HDRI_LIST } from "../hdri/HDRI_LIST"
import { SSGIDebugGUI } from "../wip/SSGIDebugGUI"

let stats,
  renderer,
  raf,
  camera,
  scene,
  controls,
  gui,
  groundProjectedEnv,
  pointer = new Vector2()

const params = {
  environment: HDRI_LIST.ulmer_muenster,
  groundProjection: true,
  bgColor: new Color(),
  printCam: () => {},
}
const mainObjects = new Group()
const textureLoader = new TextureLoader()
const exrLoader = new EXRLoader().setDataType(FloatType)
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
// draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/")
draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/")
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let sceneGui

/**
 * @type {EffectComposer}
 */
let composer

export async function realismEffectsDemo(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder("Scene")
  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({
    powerPreference: "high-performance",
    premultipliedAlpha: false,
    stencil: false,
    antialias: false,
    alpha: false,
    preserveDrawingBuffer: true,
  })
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
  renderer.setSize(window.innerWidth, window.innerHeight)
  //   renderer.shadowMap.enabled = true
  //   renderer.shadowMap.type = VSMShadowMap
  renderer.outputEncoding = sRGBEncoding
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.autoClear = false

  app.appendChild(renderer.domElement)

  const pmremGenerator = new PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(6, 3, 6)
  camera.name = "Camera"
  // scene
  scene = new Scene()
  scene.background = new Color("grey")
  scene.add(mainObjects)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.minDistance = 0.1
  controls.maxDistance = 100
  controls.maxPolarAngle = Math.PI / 1.5

  window.addEventListener("resize", onWindowResize)
  document.addEventListener("pointermove", onPointerMove)

  let downTime = Date.now()
  app.addEventListener("pointerdown", () => {
    downTime = Date.now()
  })
  app.addEventListener("pointerup", (e) => {
    if (Date.now() - downTime < 200) {
      onPointerMove(e)
      raycast()
    }
  })

  await loadModels()
  await setupEnvironment()
  setupComposer()
  onWindowResize()

  animate()
}

async function setupEnvironment() {
  // light
  let sunGroup = new Group()
  let sunLight = new DirectionalLight(0xffffeb, 1)
  sunLight.name = "Dir. Light"
  sunLight.castShadow = true
  sunLight.shadow.camera.near = 0.1
  sunLight.shadow.camera.far = 50
  sunLight.shadow.camera.right = 15
  sunLight.shadow.camera.left = -15
  sunLight.shadow.camera.top = 15
  sunLight.shadow.camera.bottom = -15
  sunLight.shadow.mapSize.width = 1024
  sunLight.shadow.mapSize.height = 1024
  //   sunLight.shadow.radius = 1.95
  //   sunLight.shadow.blurSamples = 6

  sunLight.shadow.bias = -0.0005
  sunGroup.add(sunLight)
  scene.add(sunGroup)

  //   floor
  //   const shadowFloor = new Mesh(new PlaneGeometry(10, 10).rotateX(-Math.PI / 2), new ShadowMaterial({}))
  //   shadowFloor.name = "shadowFloor"
  //   shadowFloor.receiveShadow = true
  //   shadowFloor.position.set(0, 0, 0)
  //   scene.add(shadowFloor)

  /**
   * Update env
   * @param {HDRI_LIST} envDict
   * @returns
   */
  async function loadEnv(envDict) {
    if (!envDict) {
      scene.background = null
      scene.environment = null
      return
    }

    if (envDict.exr) {
      const texture = await exrLoader.loadAsync(envDict.exr)
      texture.mapping = EquirectangularReflectionMapping
      scene.environment = texture
      console.log("exr loaded")
    }

    if (envDict.webP) {
      const texture = await textureLoader.loadAsync(envDict.webP)
      texture.mapping = EquirectangularReflectionMapping
      texture.encoding = sRGBEncoding
      scene.background = texture
      console.log("bg loaded")

      if (params.groundProjection) loadGroundProj(params.environment)
    }

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

    // if (envDict.shadowOpacity) {
    //   shadowFloor.material.opacity = envDict.shadowOpacity
    // }
  }

  function loadGroundProj(envDict) {
    if (params.groundProjection && scene.background && envDict.groundProj) {
      if (!groundProjectedEnv) {
        groundProjectedEnv = new GroundProjectedEnv(scene.background)
        groundProjectedEnv.scale.setScalar(100)
      }
      groundProjectedEnv.material.uniforms.map.value = scene.background
      groundProjectedEnv.radius = envDict.groundProj.radius
      groundProjectedEnv.height = envDict.groundProj.height
      if (!groundProjectedEnv.parent) {
        scene.add(groundProjectedEnv)
      }
    } else {
      if (groundProjectedEnv && groundProjectedEnv.parent) {
        groundProjectedEnv.removeFromParent()
      }
    }
  }

  await loadEnv(params.environment)

  sceneGui.add(params, "environment", HDRI_LIST).onChange((v) => {
    loadEnv(v)
  })
  sceneGui.add(params, "groundProjection").onChange((v) => {
    loadGroundProj(params.environment)
  })
}

function onWindowResize() {
  const w = window.innerWidth
  const h = window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  composer.setSize(w, h)
}

function render() {
  stats.update()
  // Update the inertia on the orbit controls
  controls.update()
  //   renderer.render(scene, camera)
  camera.updateMatrixWorld()
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
    return
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
      //   metalness: 1,
    })
  )
  sphere.name = "sphere"
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
      //   metalness: 1,
    })
  )
  cube.name = "cube"
  cube.castShadow = true
  cube.receiveShadow = true
  cube.position.set(-2, 0, -1.5)
  mainObjects.add(cube)

  const shadowFloor = new Mesh(
    new CircleGeometry(5, 32).rotateX(-Math.PI / 2),
    new MeshStandardMaterial({ color: 0x111111, roughness: 0 })
  )
  shadowFloor.name = "floor"
  shadowFloor.receiveShadow = true
  shadowFloor.position.set(0, 0.001, 0)
  scene.add(shadowFloor)

  const gltf = await gltfLoader.loadAsync(porscheUrl)
  const model = gltf.scene
  model.name = "car"
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model
    }
  })
  mainObjects.add(model)
}

function setupComposer() {
  composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera)

  const options = {
    distance: 10,
    thickness: 10,
    autoThickness: false,
    maxRoughness: 1,
    blend: 0.9,
    denoiseIterations: 1,
    denoiseKernel: 2,
    denoiseDiffuse: 10,
    denoiseSpecular: 10,
    depthPhi: 2,
    normalPhi: 50,
    roughnessPhi: 1,
    envBlur: 0.5,
    importanceSampling: true,
    directLightMultiplier: 1,
    maxEnvLuminance: 50,
    steps: 20,
    refineSteps: 5,
    spp: 1,
    resolutionScale: 1,
    missedRays: false,
  }

  // GI
  const ssgiEffect = new SSGIEffect(scene, camera, velocityDepthNormalPass, options)
  const ssdgiEffect = new SSDGIEffect(scene, camera, velocityDepthNormalPass, options)
  const ssrEffect = new SSREffect(scene, camera, velocityDepthNormalPass, options)

  // TRAA
  const traaEffect = new TRAAEffect(scene, camera, velocityDepthNormalPass)

  // Motion Blur
  const motionBlurEffect = new MotionBlurEffect(velocityDepthNormalPass)

  new SSGIDebugGUI(gui, ssgiEffect, options)

  const GI_OPTIONS = {
    SSGI: ssgiEffect,
    SSDGI: ssdgiEffect,
    SSR: ssrEffect,
  }
  const effectsOptions = {
    useGI: false,
    gi: GI_OPTIONS.SSGI,
    traa: false,
    motionBlur: false,
  }
  function updatePost() {
    composer.removeAllPasses()
    composer.addPass(velocityDepthNormalPass)
    let effectsArray = []
    if (effectsOptions.useGI) {
      effectsArray.push(effectsOptions.gi)
    } else {
      composer.addPass(renderPass)
    }

    if (effectsOptions.traa) {
      effectsArray.push(traaEffect)
    }
    if (effectsOptions.motionBlur) {
      effectsArray.push(motionBlurEffect)
    }

    if (effectsArray.length) {
      composer.addPass(new EffectPass(camera, ...effectsArray))
    }

    console.log(composer.passes)
  }

  const giFolder = gui.addFolder("EFFECTS")
  giFolder.open()
  giFolder.add(effectsOptions, "useGI").onChange(updatePost)
  giFolder.add(effectsOptions, "gi", GI_OPTIONS).onChange(updatePost)
  giFolder.add(effectsOptions, "traa").onChange(updatePost)
  giFolder.add(effectsOptions, "motionBlur").onChange(updatePost)
}

const color = new Color()
function getRandomHexColor() {
  return "#" + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

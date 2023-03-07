import Stats from "three/examples/jsm/libs/stats.module"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader"
import { GroundProjectedEnv } from "three/examples/jsm/objects/GroundProjectedEnv"

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TransformControls } from "three/examples/jsm/controls/TransformControls"

import { pcss } from "@pmndrs/vanilla"
import roomUrl from "../models/room.glb"

import * as THREE from "three"
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
  RepeatWrapping,
  EquirectangularReflectionMapping,
  PointLight,
  MeshPhysicalMaterial,
  ShadowMaterial,
  DirectionalLight,
  MeshBasicMaterial,
  VSMShadowMap,
  Clock,
  PCFSoftShadowMap,
  AmbientLight,
} from "three"
import { HDRI_LIST } from "../hdri/HDRI_LIST"

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
  environment: null,
  groundProjection: false,
  bgColor: new Color(),
  printCam: () => {},
}
const mainObjects = new Group()
const textureLoader = new TextureLoader()
const exrLoader = new EXRLoader()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
// draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/")
draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/")
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let sceneGui
let pmremGenerator

export async function pcssDemo(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder("Scene")
  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  //   renderer.shadowMap.type = VSMShadowMap
  renderer.outputEncoding = sRGBEncoding
  renderer.toneMapping = ACESFilmicToneMapping

  pmremGenerator = new PMREMGenerator(renderer)
  pmremGenerator.compileCubemapShader()
  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  )
  camera.position.set(6, 3, 6)
  camera.name = "Camera"
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
  transformControls.addEventListener("dragging-changed", (event) => {
    controls.enabled = !event.value
    if (!event.value) {
    }
  })

  transformControls.addEventListener("change", () => {
    if (transformControls.object) {
      if (transformControls.object.position.y < 0) {
        transformControls.object.position.y = 0
      }
    }
  })
  scene.add(transformControls)

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

  sceneGui.add(transformControls, "mode", ["translate", "rotate", "scale"])
  // sceneGui.add(scene, "backgroundBlurriness", 0, 1, 0.01)
  // sceneGui.addColor(params, "bgColor").onChange(() => {
  //   scene.background = params.bgColor
  // })

  const reset = pcss({
    size: 35,
    focus: 0.5,
    samples: 16,
  })

  console.log(pcss)

  let sunLight = new DirectionalLight(0xffffeb, 5)
  sunLight.name = "Dir. Light"
  sunLight.castShadow = true
  sunLight.shadow.camera.near = 0.1
  sunLight.shadow.camera.far = 50
  sunLight.shadow.camera.right = 8.5
  sunLight.shadow.camera.left = -8.5
  sunLight.shadow.camera.top = 8.5
  sunLight.shadow.camera.bottom = -8.5
  sunLight.shadow.mapSize.width = 2048
  sunLight.shadow.mapSize.height = 2048
  sunLight.shadow.bias = -0.001
  //   sunLight.shadow.radius = 1.95
  //   sunLight.shadow.blurSamples = 6
  sunLight.position.set(5, 5, -8)
  scene.add(sunLight)

  const ambientLight = new AmbientLight()
  scene.add(ambientLight)

  //   setupEnvironment()
  await loadModels()
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
  sunLight.shadow.mapSize.width = 2048
  sunLight.shadow.mapSize.height = 2048
  sunLight.shadow.radius = 1.95
  sunLight.shadow.blurSamples = 6

  sunLight.shadow.bias = -0.0005
  sunGroup.add(sunLight)
  scene.add(sunGroup)

  //   floor
  const shadowFloor = new Mesh(
    new PlaneGeometry(10, 10).rotateX(-Math.PI / 2),
    new ShadowMaterial({})
  )
  shadowFloor.name = "shadowFloor"
  shadowFloor.receiveShadow = true
  shadowFloor.position.set(0, 0, 0)
  scene.add(shadowFloor)

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

    if (envDict.webP)
      textureLoader.load(envDict.webP, (texture) => {
        texture.mapping = EquirectangularReflectionMapping
        texture.encoding = sRGBEncoding
        scene.background = texture

        if (params.groundProjection) loadGroundProj(params.environment)
      })

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

  loadEnv(params.environment)

  sceneGui.add(params, "environment", HDRI_LIST).onChange((v) => {
    loadEnv(v)
  })
  sceneGui.add(params, "groundProjection").onChange((v) => {
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
      metalness: 1,
    })
  )
  cube.name = "cube"
  cube.castShadow = true
  cube.receiveShadow = true
  cube.position.set(-2, 0, -1.5)
  mainObjects.add(cube)

  const gltf = await gltfLoader.loadAsync(roomUrl)
  const model = gltf.scene
  model.name = "room"
  model.scale.setScalar(0.5)
  model.position.set(0, -1, 0)

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model

      if (child.name === "Object_13") {
        console.log("FOUND", child)
        child.material.opacity = 0.5
        child.material.transparent = true

        child.castShadow = false
        child.receiveShadow = false
      }
    }
  })
  mainObjects.add(model)
}

const color = new Color()
function getRandomHexColor() {
  return "#" + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

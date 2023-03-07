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
  ShadowMaterial,
  DirectionalLight,
  VSMShadowMap,
  SpotLight,
  SpotLightHelper,
  CylinderGeometry,
  Matrix4,
  AmbientLight,
  Vector3,
  MeshBasicMaterial,
  WebGLRenderTarget,
  HalfFloatType,
  LinearFilter,
  FloatType,
} from "three"
import Stats from "three/examples/jsm/libs/stats.module"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader"
import { GroundProjectedEnv } from "three/examples/jsm/objects/GroundProjectedEnv"

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TransformControls } from "three/examples/jsm/controls/TransformControls"

import porscheUrl from "../models/porsche_911_1975.glb"

import { HDRI_LIST } from "../hdri/HDRI_LIST"
import { SpotLightMaterial } from "../wip/SpotLightMaterial"
import { DepthTexture } from "three"
import { DepthFormat } from "three"
import { UnsignedShortType } from "three"

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
let useFrame = () => {}
let sceneGui
let envObject
let pmremGenerator

export async function spotLightDemo(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder("Scene")
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
  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  )
  camera.position.set(-16, 16, 16)
  camera.name = "Camera"
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

  // const light = new PointLight()
  // light.position.set(5, 5, 5)
  // scene.add(light)

  setupEnvironment()
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
  sunLight.shadow.mapSize.width = 1024
  sunLight.shadow.mapSize.height = 1024
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
      sunLight.visible = false
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

  // floor
  const floor = new Mesh(
    new PlaneGeometry(10, 10).rotateX(-Math.PI / 2),
    new MeshStandardMaterial({
      color: getRandomHexColor(),
      roughness: 0.5,
      metalness: 0,
    })
  )
  floor.name = "floor"
  floor.receiveShadow = true
  mainObjects.add(floor)

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

  setupSpotLight()
}

function setupSpotLight() {
  scene.add(new AmbientLight(0xffffff, 0.5))

  let opacity = 1,
    radiusTop,
    radiusBottom,
    depthBuffer,
    color = 0xffffff,
    distance = 5 * 4,
    angle = 0.15 * 4,
    attenuation = 5,
    anglePower = 5

  const spotLight = new SpotLight()
  spotLight.position.set(5, 5, 5)
  spotLight.angle = angle
  spotLight.color.set(color)
  spotLight.distance = distance
  spotLight.castShadow = true
  spotLight.shadow.bias = -0.0001
  const helper = new SpotLightHelper(spotLight)
  scene.add(spotLight)

  const volumeMaterial = new SpotLightMaterial()
  // const volumeMaterial = new MeshBasicMaterial({
  //   transparent: true,
  //   opacity: 0.25,
  // })

  depthBuffer = useDepthBuffer()

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
    radiusBottom = spotLight.angle * distance
    volumeMesh.geometry = geom(distance, radiusTop, radiusBottom)
  }

  const test = {
    helper: false,
    useDepth: false,
    updateVolumeGeometry,
  }

  const geom = (distance, radiusTop, radiusBottom) => {
    // console.log({ distance, radiusTop, radiusBottom })
    const geometry = new CylinderGeometry(
      radiusTop,
      radiusBottom,
      distance,
      128,
      64,
      true
    )
    // geometry.applyMatrix4(new Matrix4().makeTranslation(0, -distance / 2, 0))
    // geometry.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2))
    geometry.translate(0, -distance / 2, 0)
    geometry.rotateX(-Math.PI / 2)
    return geometry
  }

  const volumeMesh = new Mesh(
    geom(distance, radiusTop, radiusBottom),
    volumeMaterial
  )

  updateVolumeGeometry()

  spotLight.add(volumeMesh)
  const vec = new Vector3()
  useFrame = () => {
    volumeMaterial.spotPosition.copy(volumeMesh.getWorldPosition(vec))
    volumeMesh.lookAt(spotLight.target.getWorldPosition(vec))
    if (helper.parent) helper.update()

    // useFrame from FBO
    if (test.useDepth) depthBuffer[1]()
  }

  function addGui(gui) {
    const folder = gui.addFolder("SpotLight Volume")
    folder.open()
    folder.add(test, "useDepth").onChange((v) => {
      if (v) {
        volumeMaterial.depth = depthBuffer[0]
        volumeMaterial.resolution = renderer.getSize(new Vector2())
      } else {
        volumeMaterial.depth = null
        volumeMaterial.resolution = new Vector2(0, 0)
      }
    })
    folder.add(volumeMaterial, "opacity", 0, 1)
    folder.add(volumeMaterial, "attenuation", 0, distance)
    folder.add(volumeMaterial, "anglePower", 0, Math.PI)
    folder.add(volumeMaterial, "cameraNear", 0, 10)
    folder.add(volumeMaterial, "cameraFar", 0, 10)

    const sp = gui.addFolder("SpotLight")
    sp.open()
    sp.add(test, "helper").onChange((v) => {
      if (v) {
        scene.add(helper)
      } else {
        helper.removeFromParent()
      }
    })
    sp.addColor(spotLight, "color")
    sp.add(spotLight, "intensity", 0, 5)
    sp.add(spotLight, "angle", 0, Math.PI / 2).onChange(updateVolumeGeometry)
    sp.add(spotLight, "penumbra", 0, 1)
    sp.add(spotLight, "distance", 0.1, 20).onChange(updateVolumeGeometry)
    sp.add(spotLight.shadow, "bias", -0.0001, 0.0001)
  }

  transformControls.attach(spotLight)
  addGui(gui)
}

const color = new Color()
function getRandomHexColor() {
  return "#" + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

function useDepthBuffer({ size = 256, frames = Infinity } = {}) {
  const gl = renderer
  const dpr = renderer.getPixelRatio()
  const { x, y } = renderer.getSize(new Vector3())
  const w = size || x * dpr
  const h = size || y * dpr

  const depthTexture = new DepthTexture(w, h)
  depthTexture.format = DepthFormat
  depthTexture.type = UnsignedShortType
  depthTexture.name = "use_Depth_Buffer"

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
  const dpr = renderer.getPixelRatio()
  const { x, y } = renderer.getSize(new Vector3())
  const gl = renderer
  const _width = x * dpr
  const _height = y * dpr
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

import Stats from "three/examples/jsm/libs/stats.module"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader"
import { GroundProjectedEnv } from "three/examples/jsm/objects/GroundProjectedEnv"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TransformControls } from "three/examples/jsm/controls/TransformControls"

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
  PMREMGenerator,
  PlaneGeometry,
  TextureLoader,
  EquirectangularReflectionMapping,
  ShadowMaterial,
  DirectionalLight,
  VSMShadowMap,
  CircleGeometry,
  Plane,
  Vector3,
  Matrix4,
  Vector4,
  WebGLRenderTarget,
  DepthTexture,
  DepthFormat,
  UnsignedShortType,
  LinearFilter,
  HalfFloatType,
  RepeatWrapping,
} from "three"
import { HDRI_LIST } from "../hdri/HDRI_LIST"
import { MeshReflectorMaterial } from "../wip/MeshReflectorMaterial"
import { BlurPass } from "../wip/BlurPass"
import { TEXTURES_LIST } from "../textures/TEXTURES_LIST"

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
const exrLoader = new EXRLoader()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/")
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let useFrame = () => {}
let sceneGui

export async function meshReflectorMaterialDemo(mainGui) {
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

  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
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
  const reflectionMesh = new Mesh(new PlaneGeometry(10, 10).rotateX(-Math.PI / 2), new ShadowMaterial({}))
  reflectionMesh.name = "reflectionMesh"
  reflectionMesh.receiveShadow = true
  reflectionMesh.position.set(0, 0, 0)
  //   scene.add(reflectionMesh)

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
      reflectionMesh.material.opacity = envDict.shadowOpacity
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

  // car
  const gltf = await gltfLoader.loadAsync(porscheUrl)
  const model = gltf.scene
  model.name = "car"
  let carBody
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model

      if (child.name === "body") carBody = child
    }
  })
  mainObjects.add(model)

  setupMRM()
}

// blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
// mixBlur={0} // How much blur mixes with surface roughness (default = 1)
// mixStrength={1} // Strength of the reflections
// mixContrast={1} // Contrast of the reflections
// resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
// mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
// depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
// minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
// maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
// depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
// distortion={1}

async function setupMRM() {
  let mixBlur = 1,
    mixStrength = 5,
    resolution = 1024,
    blur = [1024, 1024],
    minDepthThreshold = 0,
    maxDepthThreshold = 1,
    depthScale = 1,
    depthToBlurRatioBias = 0.25,
    mirror = 0,
    distortion = 1,
    mixContrast = 1,
    distortionMap,
    reflectorOffset = 0,
    metalness = 0.6,
    roughness = 1,
    color = new Color("#151515")

  const gl = renderer
  //   const camera = camera
  // const scene = scene
  blur = Array.isArray(blur) ? blur : [blur, blur]
  const hasBlur = blur[0] + blur[1] > 0
  // const materialRef = React.useRef<MeshReflectorMaterialImpl>(null!)
  const reflectorPlane = new Plane()
  const normal = new Vector3()
  const reflectorWorldPosition = new Vector3()
  const cameraWorldPosition = new Vector3()
  const rotationMatrix = new Matrix4()
  const lookAtPosition = new Vector3(0, 0, -1)
  const clipPlane = new Vector4()
  const view = new Vector3()
  const target = new Vector3()
  const q = new Vector4()
  const textureMatrix = new Matrix4()
  const virtualCamera = new PerspectiveCamera()

  // call when  camera, reflectorOffset changes
  const beforeRender = (parent) => {
    // TODO: As of R3f 7-8 this should be __r3f.parent
    // const parent = reflectionMesh

    reflectorWorldPosition.setFromMatrixPosition(parent.matrixWorld)
    cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld)
    rotationMatrix.extractRotation(parent.matrixWorld)
    normal.set(0, 0, 1)
    normal.applyMatrix4(rotationMatrix)
    reflectorWorldPosition.addScaledVector(normal, reflectorOffset)
    view.subVectors(reflectorWorldPosition, cameraWorldPosition)
    // Avoid rendering when reflector is facing away
    if (view.dot(normal) > 0) return
    view.reflect(normal).negate()
    view.add(reflectorWorldPosition)
    rotationMatrix.extractRotation(camera.matrixWorld)
    lookAtPosition.set(0, 0, -1)
    lookAtPosition.applyMatrix4(rotationMatrix)
    lookAtPosition.add(cameraWorldPosition)
    target.subVectors(reflectorWorldPosition, lookAtPosition)
    target.reflect(normal).negate()
    target.add(reflectorWorldPosition)
    virtualCamera.position.copy(view)
    virtualCamera.up.set(0, 1, 0)
    virtualCamera.up.applyMatrix4(rotationMatrix)
    virtualCamera.up.reflect(normal)
    virtualCamera.lookAt(target)
    virtualCamera.far = camera.far // Used in WebGLBackground
    virtualCamera.updateMatrixWorld()
    virtualCamera.projectionMatrix.copy(camera.projectionMatrix)
    // Update the texture matrix
    textureMatrix.set(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0)
    textureMatrix.multiply(virtualCamera.projectionMatrix)
    textureMatrix.multiply(virtualCamera.matrixWorldInverse)
    textureMatrix.multiply(parent.matrixWorld)
    // Now update projection matrix with new clip plane, implementing code from: http://www.terathon.com/code/oblique.html
    // Paper explaining this technique: http://www.terathon.com/lengyel/Lengyel-Oblique.pdf
    reflectorPlane.setFromNormalAndCoplanarPoint(normal, reflectorWorldPosition)
    reflectorPlane.applyMatrix4(virtualCamera.matrixWorldInverse)
    clipPlane.set(reflectorPlane.normal.x, reflectorPlane.normal.y, reflectorPlane.normal.z, reflectorPlane.constant)
    const projectionMatrix = virtualCamera.projectionMatrix
    q.x = (Math.sign(clipPlane.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0]
    q.y = (Math.sign(clipPlane.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5]
    q.z = -1.0
    q.w = (1.0 + projectionMatrix.elements[10]) / projectionMatrix.elements[14]
    // Calculate the scaled plane vector
    clipPlane.multiplyScalar(2.0 / clipPlane.dot(q))
    // Replacing the third row of the projection matrix
    projectionMatrix.elements[2] = clipPlane.x
    projectionMatrix.elements[6] = clipPlane.y
    projectionMatrix.elements[10] = clipPlane.z + 1.0
    projectionMatrix.elements[14] = clipPlane.w
  }

  // call when these changes
  // gl,
  // blur,
  // textureMatrix,
  // resolution,
  // mirror,
  // hasBlur,
  // mixBlur,
  // mixStrength,
  // minDepthThreshold,
  // maxDepthThreshold,
  // depthScale,
  // depthToBlurRatioBias,
  // distortion,
  // distortionMap,
  // mixContrast,

  function getTargets() {
    const parameters = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      encoding: gl.outputEncoding,
      type: HalfFloatType,
    }
    const fbo1 = new WebGLRenderTarget(resolution, resolution, parameters)
    fbo1.depthBuffer = true
    fbo1.depthTexture = new DepthTexture(resolution, resolution)
    fbo1.depthTexture.format = DepthFormat
    fbo1.depthTexture.type = UnsignedShortType
    const fbo2 = new WebGLRenderTarget(resolution, resolution, parameters)
    const blurpass = new BlurPass({
      gl,
      resolution,
      width: blur[0],
      height: blur[1],
      minDepthThreshold,
      maxDepthThreshold,
      depthScale,
      depthToBlurRatioBias,
    })

    const reflectorProps = {
      mirror,
      textureMatrix,
      mixBlur,
      tDiffuse: fbo1.texture,
      tDepth: fbo1.depthTexture,
      tDiffuseBlur: fbo2.texture,
      hasBlur,
      mixStrength,
      minDepthThreshold,
      maxDepthThreshold,
      depthScale,
      depthToBlurRatioBias,
      distortion,
      distortionMap,
      mixContrast,
      metalness,
      roughness,
      color,
    }

    const defines = {
      "defines-USE_BLUR": hasBlur ? "" : undefined,
      "defines-USE_DEPTH": depthScale > 0 ? "" : undefined,
      "defines-USE_DISTORTION": distortionMap ? "" : undefined,
    }
    return [fbo1, fbo2, blurpass, reflectorProps, defines]
  }

  const [fbo1, fbo2, blurpass, reflectorProps, defines] = getTargets()

  const MaterialOptions = {
    standard: new MeshStandardMaterial({ roughness }),
    reflector: new MeshReflectorMaterial(reflectorProps),
  }
  const material = MaterialOptions.reflector
  const standardMat = MaterialOptions.standard
  material.defines.USE_BLUR = defines["defines-USE_BLUR"]
  material.defines.USE_DEPTH = defines["defines-USE_DEPTH"]
  material.defines.USE_DISTORTION = defines["defines-USE_DISTORTION"]

  const roughMap = await textureLoader.loadAsync(TEXTURES_LIST.rgh)
  roughMap.wrapS = RepeatWrapping
  roughMap.wrapT = RepeatWrapping
  roughMap.repeat.set(5, 5)
  standardMat.roughnessMap = roughMap
  standardMat.color.set(color)

  const params = {
    materialType: MaterialOptions.reflector,
    useRoughnessMap: false,
    useDistortionMap: false,
  }

  const reflectionMesh = new Mesh(new CircleGeometry(5, 32), params.materialType)
  reflectionMesh.rotateX(-Math.PI / 2)

  reflectionMesh.name = "floor"
  reflectionMesh.receiveShadow = true
  reflectionMesh.position.set(0, 0.001, 0)
  scene.add(reflectionMesh)
  console.log({ reflectorProps, material })

  // GUI
  gui.add(params, "materialType", MaterialOptions).onChange((v) => {
    reflectionMesh.material = v
  })
  const msmFol = gui.addFolder("MeshStandardMaterial")
  const mrmFol = gui.addFolder("MeshReflectorMaterial")
  mrmFol.open()
  mrmFol.add(params, "useRoughnessMap").onChange((v) => {
    if (v) {
      material.roughnessMap = roughMap
    } else {
      material.roughnessMap = null
    }
    material.needsUpdate = true
  })
  mrmFol.add(params, "useDistortionMap").onChange((v) => {
    if (v) {
      //   material.defines.USE_DISTORTION = ""
      material.distortionMap = roughMap
    } else {
      material.distortionMap = null
    }
    material.needsUpdate = true
  })
  mrmFol.add(material, "mixStrength", 0, 15)
  mrmFol.add(material, "mixBlur", 0, 6)
  mrmFol.add(material, "mixContrast", 0, 5)
  mrmFol.add(material, "metalness", 0, 1)
  mrmFol.add(material, "roughness", 0, 1)
  mrmFol.add(material, "distortion", -2, 2)

  const parent = reflectionMesh
  useFrame = () => {
    if (!parent) return
    parent.visible = false
    const currentXrEnabled = gl.xr.enabled
    const currentShadowAutoUpdate = gl.shadowMap.autoUpdate
    beforeRender(parent)
    gl.xr.enabled = false
    gl.shadowMap.autoUpdate = false
    gl.setRenderTarget(fbo1)
    gl.state.buffers.depth.setMask(true)
    if (!gl.autoClear) gl.clear()
    gl.render(scene, virtualCamera)
    if (hasBlur) blurpass.render(gl, fbo1, fbo2)
    gl.xr.enabled = currentXrEnabled
    gl.shadowMap.autoUpdate = currentShadowAutoUpdate
    parent.visible = true
    gl.setRenderTarget(null)
  }
}

const color = new Color()
function getRandomHexColor() {
  return "#" + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

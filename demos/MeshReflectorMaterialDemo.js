import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

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
  TextureLoader,
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
  MathUtils,
} from 'three'
import { HDRI_LIST } from '../hdri/HDRI_LIST'

import { MeshReflectorMaterial } from '../wip/MeshReflectorMaterial'
import { BlurPass } from '../wip/BlurPass'
import { TEXTURES_LIST } from '../textures/TEXTURES_LIST'
import { Easing, Tween, update } from '@tweenjs/tween.js'
import { BG_ENV } from './BG_ENV'
import { MODEL_LIST } from '../models/MODEL_LIST'

let stats,
  renderer,
  raf,
  camera,
  scene,
  controls,
  gui,
  pointer = new Vector2()

const params = {
  printCam: () => {},
}
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

export async function meshReflectorMaterialDemo(mainGui) {
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

  sceneGui.add(transformControls, 'mode', ['translate', 'rotate', 'scale'])
  // sceneGui.add(scene, "backgroundBlurriness", 0, 1, 0.01)
  // sceneGui.addColor(params, "bgColor").onChange(() => {
  //   scene.background = params.bgColor
  // })

  // const light = new PointLight()
  // light.position.set(5, 5, 5)
  // scene.add(light)

  const bgEnv = new BG_ENV(scene, sceneGui)
  bgEnv.preset = HDRI_LIST.dancing_hall
  bgEnv.setEnvType('HDRI')
  bgEnv.setBGType('GroundProjection')
  bgEnv.updateAll()
  await loadModels()
  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  stats.update()
  update() // tween
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

  // car
  const gltf = await gltfLoader.loadAsync(MODEL_LIST.porsche_1975.url)
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

  // wheel references
  const wheels = {
    FL: null,
    FR: null,
    R: null,
    steerL: null,
    steerR: null,
    steerVal: 0,
  }

  wheels.R = model.getObjectByName('wheels_rear')

  wheels.steerL = model.getObjectByName('wheel_L')
  wheels.steerR = model.getObjectByName('wheel_R')
  const steerLimit = MathUtils.degToRad(30)
  const tween = new Tween(wheels)
    .to({ steerVal: 1 }, 3000)
    .easing(Easing.Elastic.Out)
    .delay(3000)
    .repeatDelay(5000)
    .repeat(10000)
    .yoyo(true)
    .onUpdate(() => {
      const rotY = MathUtils.mapLinear(wheels.steerVal, 0, 1, -steerLimit, steerLimit)
      wheels.steerL.rotation.y = rotY
      wheels.steerR.rotation.y = rotY
    })
    .start()

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
  const MRMParams = {
    resolution: 1024,
    blurX: 1024,
    blurY: 1024,
    depthScale: 1,
  }

  let mixBlur = 1,
    mixStrength = 5,
    // resolution = 1024,
    // blur = [1024, 1024],
    minDepthThreshold = 0,
    maxDepthThreshold = 1,
    // depthScale = 1,
    depthToBlurRatioBias = 0.25,
    mirror = 0,
    distortion = 0.25,
    mixContrast = 1,
    distortionMap,
    reflectorOffset = 0,
    metalness = 0.6,
    roughness = 1,
    color = new Color('#151515')

  const gl = renderer
  //   const camera = camera
  // const scene = scene
  // blur = Array.isArray(blur) ? blur : [blur, blur]
  let hasBlur = MRMParams.blurX + MRMParams.blurY > 0
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
    const fbo1 = new WebGLRenderTarget(MRMParams.resolution, MRMParams.resolution, parameters)
    fbo1.depthBuffer = true
    fbo1.depthTexture = new DepthTexture(MRMParams.resolution, MRMParams.resolution)
    fbo1.depthTexture.format = DepthFormat
    fbo1.depthTexture.type = UnsignedShortType
    const fbo2 = new WebGLRenderTarget(MRMParams.resolution, MRMParams.resolution, parameters)
    const blurpass = new BlurPass({
      gl,
      resolution: MRMParams.resolution,
      width: MRMParams.blurX,
      height: MRMParams.blurY,
      minDepthThreshold,
      maxDepthThreshold,
      depthScale: MRMParams.depthScale,
      depthToBlurRatioBias,
    })

    console.log(blurpass)

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
      depthScale: MRMParams.depthScale,
      depthToBlurRatioBias,
      distortion,
      // distortionMap,
      mixContrast,
      metalness,
      roughness,
      color,
    }

    const defines = {
      'defines-USE_BLUR': hasBlur ? '' : undefined,
      'defines-USE_DEPTH': MRMParams.depthScale > 0 ? '' : undefined,
      'defines-USE_DISTORTION': distortionMap ? '' : undefined,
    }
    console.log({ fbo1, fbo2, blurpass, reflectorProps, defines })
    return [fbo1, fbo2, blurpass, reflectorProps, defines]
  }

  let [fbo1, fbo2, blurpass, reflectorProps, defines] = getTargets()

  function updateTargets() {
    // warning !, heavy action ,  only for gui demo purpose
    fbo1.dispose()
    fbo2.dispose()
    blurpass.renderTargetA.dispose()
    blurpass.renderTargetB.dispose()
    blurpass.convolutionMaterial.dispose()

    hasBlur = MRMParams.blurX + MRMParams.blurY > 0
    ;[fbo1, fbo2, blurpass, reflectorProps, defines] = getTargets()

    // remake the material
    MaterialOptions.reflector.dispose() //dispose old mat
    MaterialOptions.reflector = new MeshReflectorMaterial(reflectorProps)
    MaterialOptions.reflector.defines.USE_BLUR = defines['defines-USE_BLUR']
    MaterialOptions.reflector.defines.USE_DEPTH = defines['defines-USE_DEPTH']
    MaterialOptions.reflector.defines.USE_DISTORTION = defines['defines-USE_DISTORTION']

    material = MaterialOptions.reflector
    updateTextures()

    // apply if active
    if (params.materialType instanceof MeshReflectorMaterial) {
      params.materialType = MaterialOptions.reflector
      reflectionMesh.material = params.materialType
    }
  }

  function updateTextures() {
    if (params.useRoughnessMap) {
      material.roughnessMap = roughMap
      standardMat.roughnessMap = roughMap
    } else {
      material.roughnessMap = null
      standardMat.roughnessMap = null
    }

    if (params.useDistortionMap) {
      material.distortionMap = roughMap
    } else {
      material.distortionMap = null
    }

    if (params.useNormalMap) {
      material.normalMap = nrmMap
      standardMat.normalMap = nrmMap
    } else {
      material.normalMap = null
      standardMat.normalMap = null
    }

    material.needsUpdate = true
    standardMat.needsUpdate = true
  }

  const MaterialOptions = {
    standard: new MeshStandardMaterial({ roughness }),
    reflector: new MeshReflectorMaterial(reflectorProps),
  }
  const standardMat = MaterialOptions.standard

  let material = MaterialOptions.reflector
  material.defines.USE_BLUR = defines['defines-USE_BLUR']
  material.defines.USE_DEPTH = defines['defines-USE_DEPTH']
  material.defines.USE_DISTORTION = defines['defines-USE_DISTORTION']

  const roughMap = await textureLoader.loadAsync(TEXTURES_LIST.rgh)
  roughMap.wrapS = RepeatWrapping
  roughMap.wrapT = RepeatWrapping
  const nrmMap = await textureLoader.loadAsync(TEXTURES_LIST.paper_normal)
  nrmMap.wrapS = RepeatWrapping
  nrmMap.wrapT = RepeatWrapping
  nrmMap.repeat.set(5, 5)

  roughMap.repeat.set(5, 5)
  standardMat.roughnessMap = roughMap
  standardMat.color.set(color)

  const params = {
    materialType: MaterialOptions.reflector,
    useRoughnessMap: false,
    useDistortionMap: false,
    useNormalMap: false,
    normalScale: 1,
    repeat: 5,
  }

  const reflectionMesh = new Mesh(new CircleGeometry(5, 32), params.materialType)
  reflectionMesh.rotateX(-Math.PI / 2)

  reflectionMesh.name = 'floor'
  reflectionMesh.receiveShadow = true
  reflectionMesh.position.set(0, 0.001, 0)
  scene.add(reflectionMesh)
  console.log({ reflectorProps, material })

  // GUI
  gui.add(params, 'materialType', MaterialOptions).onChange((v) => {
    reflectionMesh.material = v
  })

  const mrmFol = gui.addFolder('MeshReflectorMaterial')
  mrmFol.open()
  mrmFol.add(MRMParams, 'resolution', 128, 2048, 128).name('⚠ Resolution').onChange(updateTargets)
  mrmFol.add(MRMParams, 'blurX', 16, 2048, 128).name('⚠ Blur X').onChange(updateTargets)
  mrmFol.add(MRMParams, 'blurY', 16, 2048, 128).name('⚠ Blur Y').onChange(updateTargets)
  mrmFol.add(MRMParams, 'depthScale', 0, 10).name('⚠ DEPTH SCALE').onChange(updateTargets)

  mrmFol.add(params, 'useRoughnessMap').onChange(updateTextures)
  mrmFol.add(params, 'useDistortionMap').onChange(updateTextures)
  mrmFol.add(params, 'useNormalMap').onChange((v) => {})
  mrmFol.addColor(material, 'color').onChange(() => {
    standardMat.color.copy(material.color)
  })
  mrmFol.add(params, 'normalScale', 0, 1).onChange((v) => {
    material.normalScale.setScalar(v)
    standardMat.normalScale.setScalar(v)
  })
  mrmFol.add(params, 'repeat', 1, 15, 1).onChange((v) => {
    roughMap.repeat.setScalar(v)
    nrmMap.repeat.setScalar(v)
  })

  mrmFol.add(material, 'mixStrength', 0, 15)
  mrmFol.add(material, 'mixBlur', 0, 6)
  mrmFol.add(material, 'mixContrast', 0, 5)
  mrmFol.add(material, 'metalness', 0, 1)
  mrmFol.add(material, 'roughness', 0, 1)
  mrmFol.add(material, 'distortion', -2, 2)

  const parent = reflectionMesh
  useFrame = () => {
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
  return '#' + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

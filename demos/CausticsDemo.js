import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import {
  ACESFilmicToneMapping,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
  Vector2,
  Raycaster,
  Group,
  VSMShadowMap,
  Clock,
  WebGLRenderTarget,
  LinearFilter,
  HalfFloatType,
  NoToneMapping,
  BackSide,
  Mesh,
  PlaneGeometry,
  CameraHelper,
  Color,
  SrcAlphaFactor,
  OneFactor,
  CustomBlending,
  OrthographicCamera,
  Box3,
  Vector3,
  Plane,
  Matrix4,
  Frustum,
  DepthTexture,
  FloatType,
  FrontSide,
  DirectionalLight,
} from 'three'

// Model and Env
import { MODEL_LIST } from '../models/MODEL_LIST'
import { BG_ENV } from './BG_ENV'
import {
  CausticsMaterial,
  CausticsProjectionMaterial,
  CAUSTIC_PROPS,
  createNormalMaterial,
  NORMAL_PROPS,
} from '../wip/Caustics'
import { FullScreenQuad } from '../wip/Pass'
import { Tween, update } from '@tweenjs/tween.js'

let stats,
  renderer,
  raf,
  camera,
  scene,
  controls,
  gui,
  pointer = new Vector2()

const mainObjects = new Group()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let useFrame = () => {} // runs on every frame frame
let sceneGui

export async function CausticsDemo(mainGui) {
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
  camera.position.set(1, 1, -1)
  camera.name = 'Camera'
  // scene
  scene = new Scene()
  scene.add(mainObjects)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.minDistance = 0.1
  controls.maxDistance = 100
  controls.maxPolarAngle = Math.PI / 1.5
  controls.target.set(0, 0.5, 0)

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
  const bg_env = new BG_ENV(scene)
  bg_env.setBGType('Color')
  bg_env.bgColor.set('grey')
  bg_env.setEnvType('HDRI')
  bg_env.updateAll()
  bg_env.addGui(sceneGui)

  // await setupCaustics()
  await setupCausticsNew()

  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  stats.update()
  update()
  controls.update()
  useFrame()
  renderer.render(scene, camera)
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

// async function setupCaustics() {
//   const gltf = await gltfLoader.loadAsync(MODEL_LIST.monkey.url)
//   // const gltf = await gltfLoader.loadAsync(MODEL_LIST.vase.url)

//   const model = gltf.scene

//   const mats = {}
//   model.traverse((child) => {
//     if (child.isMesh) {
//       // child.material.side = FrontSide
//       child.castShadow = true
//       child.receiveShadow = true
//       child.selectOnRaycast = model
//       mats[child.material.uuid] = child.material
//     }
//   })
//   for (const mat of Object.values(mats)) {
//     gui.add(mat, 'roughness', 0, 1)
//   }

//   new Tween(model.rotation)
//     .to({ y: 2 * Math.PI })
//     .duration(5000)
//     .repeat(Infinity)
//     .start()

//   mainObjects.add(model)

//   const params = {
//     debug: true,
//     frames: Infinity,
//     ior: 1.1,
//     color: new Color('grey'),
//     causticsOnly: false,
//     backside: false,
//     backsideIOR: 1.1,
//     worldRadius: 0.3125,
//     intensity: 0.05,
//     resolution: 1024,
//     lightSource: [-2, 2, 2],
//   }
//   const lightSourceObj = new Group()
//   lightSourceObj.position.fromArray(params.lightSource)
//   transformControls.attach(lightSourceObj)

//   // Buffers for front and back faces
//   const normalTarget = useFBO(params.resolution, params.resolution, NORMAL_PROPS)
//   const normalTargetB = useFBO(params.resolution, params.resolution, NORMAL_PROPS)
//   const causticsTarget = useFBO(params.resolution, params.resolution, CAUSTIC_PROPS)
//   const causticsTargetB = useFBO(params.resolution, params.resolution, CAUSTIC_PROPS)
//   // Normal materials for front and back faces
//   const normalMat = createNormalMaterial()
//   const normalMatB = createNormalMaterial(BackSide)
//   // The quad that catches the caustics
//   const causticsMaterial = new CausticsMaterial()
//   const causticsQuad = new FullScreenQuad(causticsMaterial)

//   let count = 0
//   const v = new Vector3()
//   const lpF = new Frustum()
//   const lpM = new Matrix4()
//   const lpP = new Plane()

//   const lightDir = new Vector3()
//   const lightDirInv = new Vector3()
//   const bounds = new Box3()
//   const focusPos = new Vector3()
//   const projPoint = new Vector3()

//   const ref = new Group()
//   const cCamera = new OrthographicCamera()
//   cCamera.up.set(0, 1, 0)
//   // cCamera.updateProjectionMatrix()
//   const cScene = new Scene()
//   const plane = new Mesh(
//     new PlaneGeometry(),
//     new CausticsProjectionMaterial({
//       transparent: true,
//       color: params.color,
//       causticsTexture: causticsTarget.texture,
//       causticsTextureB: causticsTargetB.texture,
//       blending: CustomBlending,
//       blendSrc: OneFactor,
//       blendDst: SrcAlphaFactor,
//       depthWrite: false,
//     })
//   )
//   plane.renderOrder = 2
//   plane.rotation.x = -Math.PI / 2

//   const gl = renderer
//   const helper = new CameraHelper(cCamera)

//   console.log('group', ref, cCamera, plane, lightDir, lightDirInv, bounds)
//   ref.add(cScene, plane, lightSourceObj)
//   cScene.add(cCamera)
//   cScene.add(model)

//   mainObjects.add(ref, helper)

//   ref.updateWorldMatrix(false, true)

//   const vecArr = []
//   const projPointArray = []

//   for (let index = 0; index < 8; index++) {
//     vecArr.push(new Vector3())
//     projPointArray.push(new Vector3())
//   }

//   let boundsVertices = []

//   useFrame = (state, delta) => {
//     if (params.frames === Infinity || count++ < params.frames) {
//       // if (Array.isArray(params.lightSource)) lightDir.fromArray(params.lightSource).normalize()
//       // else lightDir.copy(ref.worldToLocal(params.lightSource.getWorldPosition(v)).normalize())

//       lightDir.copy(ref.worldToLocal(lightSourceObj.getWorldPosition(v)).normalize())

//       lightDirInv.copy(lightDir).multiplyScalar(-1)

//       boundsVertices.length = 0
//       cScene.parent?.matrixWorld.identity()
//       bounds.setFromObject(cScene, true)
//       boundsVertices.push(vecArr[0].set(bounds.min.x, bounds.min.y, bounds.min.z))
//       boundsVertices.push(vecArr[1].set(bounds.min.x, bounds.min.y, bounds.max.z))
//       boundsVertices.push(vecArr[2].set(bounds.min.x, bounds.max.y, bounds.min.z))
//       boundsVertices.push(vecArr[3].set(bounds.min.x, bounds.max.y, bounds.max.z))
//       boundsVertices.push(vecArr[4].set(bounds.max.x, bounds.min.y, bounds.min.z))
//       boundsVertices.push(vecArr[5].set(bounds.max.x, bounds.min.y, bounds.max.z))
//       boundsVertices.push(vecArr[6].set(bounds.max.x, bounds.max.y, bounds.min.z))
//       boundsVertices.push(vecArr[7].set(bounds.max.x, bounds.max.y, bounds.max.z))

//       const worldVerts = boundsVertices.map((v) => v.clone())

//       bounds.getCenter(focusPos)
//       boundsVertices = boundsVertices.map((v) => v.clone().sub(focusPos))
//       const lightPlane = lpP.set(lightDirInv, 0)
//       const projectedVerts = boundsVertices.map((v, i) => lightPlane.projectPoint(v, projPointArray[i]))

//       const centralVert = projectedVerts.reduce((a, b) => a.add(b), v.set(0, 0, 0)).divideScalar(projectedVerts.length)
//       const radius = projectedVerts.map((v) => v.distanceTo(centralVert)).reduce((a, b) => Math.max(a, b))
//       const dirLength = boundsVertices.map((x) => x.dot(lightDir)).reduce((a, b) => Math.max(a, b))
//       // Shadows
//       cCamera.position.copy(lightDir.clone().multiplyScalar(dirLength).add(focusPos))
//       cCamera.lookAt(cScene.localToWorld(focusPos.clone()))
//       const dirMatrix = lpM.lookAt(cCamera.position, focusPos, v.set(0, 1, 0))
//       cCamera.left = -radius
//       cCamera.right = radius
//       cCamera.top = radius
//       cCamera.bottom = -radius
//       const yOffset = v.set(0, radius, 0).applyMatrix4(dirMatrix)
//       const yTime = (cCamera.position.y + yOffset.y) / lightDir.y
//       cCamera.near = 0.1
//       cCamera.far = yTime
//       cCamera.updateProjectionMatrix()
//       cCamera.updateMatrixWorld()

//       // Now find size of ground plane
//       const groundProjectedCoords = worldVerts.map((v) => v.add(lightDir.clone().multiplyScalar(-v.y / lightDir.y)))
//       const centerPos = groundProjectedCoords
//         .reduce((a, b) => a.add(b), v.set(0, 0, 0))
//         .divideScalar(groundProjectedCoords.length)
//       const maxSize =
//         2 *
//         groundProjectedCoords
//           .map((v) => Math.hypot(v.x - centerPos.x, v.z - centerPos.z))
//           .reduce((a, b) => Math.max(a, b))
//       plane.scale.setScalar(maxSize)
//       plane.position.copy(centerPos)

//       if (params.debug) helper?.update()

//       // Inject uniforms
//       normalMatB.viewMatrix.value = normalMat.viewMatrix.value = cCamera.matrixWorldInverse

//       const dirLightNearPlane = lpF.setFromProjectionMatrix(
//         lpM.multiplyMatrices(cCamera.projectionMatrix, cCamera.matrixWorldInverse)
//       ).planes[4]

//       causticsMaterial.cameraMatrixWorld = cCamera.matrixWorld
//       causticsMaterial.cameraProjectionMatrixInv = cCamera.projectionMatrixInverse
//       causticsMaterial.lightDir = lightDirInv

//       causticsMaterial.lightPlaneNormal = dirLightNearPlane.normal
//       causticsMaterial.lightPlaneConstant = dirLightNearPlane.constant

//       causticsMaterial.near = cCamera.near
//       causticsMaterial.far = cCamera.far
//       causticsMaterial.resolution = params.resolution
//       causticsMaterial.size = radius
//       causticsMaterial.intensity = params.intensity
//       causticsMaterial.worldRadius = params.worldRadius

//       // Switch the cScene on
//       cScene.visible = true

//       // Render front face normals
//       gl.setRenderTarget(normalTarget)
//       gl.clear()
//       cScene.overrideMaterial = normalMat
//       gl.render(cScene, cCamera)

//       // Render back face normals, if enabled
//       gl.setRenderTarget(normalTargetB)
//       gl.clear()
//       if (params.backside) {
//         cScene.overrideMaterial = normalMatB
//         gl.render(cScene, cCamera)
//       }

//       // Remove the override material
//       cScene.overrideMaterial = null

//       // Render front face caustics
//       causticsMaterial.ior = params.ior
//       plane.material.lightProjMatrix = cCamera.projectionMatrix
//       plane.material.lightViewMatrix = cCamera.matrixWorldInverse
//       causticsMaterial.normalTexture = normalTarget.texture
//       causticsMaterial.depthTexture = normalTarget.depthTexture
//       gl.setRenderTarget(causticsTarget)
//       gl.clear()
//       causticsQuad.render(gl)

//       // Render back face caustics, if enabled
//       causticsMaterial.ior = params.backsideIOR
//       causticsMaterial.normalTexture = normalTargetB.texture
//       causticsMaterial.depthTexture = normalTargetB.depthTexture
//       gl.setRenderTarget(causticsTargetB)
//       gl.clear()
//       if (params.backside) causticsQuad.render(gl)

//       // Reset render target
//       gl.setRenderTarget(null)

//       // Switch the cScene off if caustics is all that's wanted
//       if (params.causticsOnly) cScene.visible = false
//     }
//   }

//   addCausticsGui(params)
// }

// function addCausticsGui(params) {
//   const folder = gui.addFolder('Caustics')
//   folder.open()
//   folder.add(params, 'debug')
//   // folder.add(params, 'frames')
//   folder.addColor(params, 'color')
//   folder.add(params, 'ior', 0, Math.PI)
//   folder.add(params, 'backside')
//   folder.add(params, 'backsideIOR', 0, Math.PI)
//   folder.add(params, 'worldRadius', 0, 1)
//   folder.add(params, 'intensity', 0, 1)
//   folder.add(params, 'causticsOnly')

//   // folder.add(params, 'resolution')
//   // folder.add(params, 'lightSource')
// }

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

  if (depth) {
    target.depthTexture = new DepthTexture(_width, _height, FloatType)
  }

  target.samples = samples

  return target
}

async function setupCausticsNew() {
  const models = {
    vase: MODEL_LIST.vase,
    monkey: MODEL_LIST.monkey,
    bunny: MODEL_LIST.bunny,
  }
  window.cModel = models.bunny

  // const gltf = await gltfLoader.loadAsync(MODEL_LIST.bunny.url)
  const gltf = await gltfLoader.loadAsync(cModel.url)

  let model = gltf.scene

  gui.add(window, 'cModel', models).onChange(async (v) => {
    const gltf = await gltfLoader.loadAsync(v.url)

    model.parent.add(gltf.scene)
    model.removeFromParent()
    model = gltf.scene
    spinModel()
  })

  function spinModel() {
    new Tween(model.rotation)
      .to({ y: 2 * Math.PI })
      .duration(10000)
      .repeat(5)
      .start()
  }

  spinModel()

  const mats = {}
  model.traverse((child) => {
    if (child.isMesh) {
      // child.material.side = FrontSide
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model
      mats[child.material.uuid] = child.material
      gui.add(child.material.normalScale, 'x', -1, 1).name('normalVector x')
      gui.add(child.material.normalScale, 'y', -1, 1).name('normalVector y')
    }
  })

  mainObjects.add(model)

  window.debug = true
  window.children
  window.frames = Infinity
  window.ior = 1.1
  window.color = new Color('white')
  window.causticsOnly = false
  window.backside = false
  window.backsideIOR = 1.1
  window.worldRadius = 0.3125 / 100
  window.intensity = 0.05
  window.resolution = 2024
  window.lightSource = [1, 2, 1]

  const folder = gui.addFolder('Caustics')

  const lightSourceObj = new Group()
  lightSourceObj.position.fromArray(lightSource)
  transformControls.attach(lightSourceObj)
  transformControls.addEventListener('change', () => {
    lightSourceObj.position.toArray(lightSource)
  })
  scene.add(lightSourceObj)

  // Buffers for front and back faces
  const normalTarget = useFBO(resolution, resolution, NORMAL_PROPS)
  const normalTargetB = useFBO(resolution, resolution, NORMAL_PROPS)
  const causticsTarget = useFBO(resolution, resolution, CAUSTIC_PROPS)
  const causticsTargetB = useFBO(resolution, resolution, CAUSTIC_PROPS)
  // Normal materials for front and back faces
  const normalMat = createNormalMaterial()
  const normalMatB = createNormalMaterial(BackSide)
  // The quad that catches the caustics
  const causticsMaterial = new CausticsMaterial()
  const causticsQuad = new FullScreenQuad(causticsMaterial)

  folder.open()
  folder.addColor(window, 'color')
  folder.add(window, 'ior', 0, Math.PI)
  folder.add(window, 'backside').onChange((v) => {
    if (!v) {
      // to prevent last frame from persisting
      causticsTargetB.dispose()
    }
  })
  folder.add(window, 'backsideIOR', 0, Math.PI)
  folder.add(window, 'worldRadius', 0, 0.05)
  folder.add(window, 'intensity', 0, 1)
  folder.add(window, 'causticsOnly')

  const ref = new Group()
  // const light = new DirectionalLight()
  const cCamera = new OrthographicCamera()
  // cCamera.up.set(0, 1, 0)
  cCamera.near = 0.01
  cCamera.far = 0.5

  const cScene = new Scene()

  const plane = new Mesh(
    new PlaneGeometry(1, 1),
    new CausticsProjectionMaterial({
      transparent: true,
      color: color,
      causticsTexture: causticsTarget.texture,
      causticsTextureB: causticsTargetB.texture,
      // blending: CustomBlending,
      // blendSrc: OneFactor,
      // blendDst: SrcAlphaFactor,
      depthWrite: false,
    })
  )
  plane.rotation.x = -Math.PI / 2

  const gl = renderer
  const helper = new CameraHelper(cCamera)

  ref.updateWorldMatrix(false, true)
  ref.add(cScene, plane)

  cScene.add(model) //add glb to caustics scene
  mainObjects.add(ref, helper) // add entire group to scene
  let count = 0

  const v = new Vector3()
  const lpF = new Frustum()
  const lpM = new Matrix4()
  const lpP = new Plane()

  const lightDir = new Vector3()
  const lightDirInv = new Vector3()
  const bounds = new Box3()
  const focusPos = new Vector3()

  const size = new Vector3()
  gui
    .add(model.scale, 'x', 0.1, 3, 0.01)
    .name('model scale')
    .onChange((v) => {
      model.scale.setScalar(v)
      bounds.getSize(size)
      console.log('size', size, { far: cCamera.far })
    })

  gui.add(cCamera, 'near', 0.01, 5, 0.01)
  gui.add(cCamera, 'far', 0.01, 5, 0.01).listen()

  useFrame = (state, delta) => {
    if (frames === Infinity || count++ < frames) {
      if (Array.isArray(lightSource)) lightDir.fromArray(lightSource).normalize()
      else lightDir.copy(ref.worldToLocal(lightSource.getWorldPosition(v)).normalize())

      lightDirInv.copy(lightDir).multiplyScalar(-1)

      let boundsVertices = []
      cScene.parent?.matrixWorld.identity()
      bounds.setFromObject(cScene, true)
      boundsVertices.push(new Vector3(bounds.min.x, bounds.min.y, bounds.min.z))
      boundsVertices.push(new Vector3(bounds.min.x, bounds.min.y, bounds.max.z))
      boundsVertices.push(new Vector3(bounds.min.x, bounds.max.y, bounds.min.z))
      boundsVertices.push(new Vector3(bounds.min.x, bounds.max.y, bounds.max.z))
      boundsVertices.push(new Vector3(bounds.max.x, bounds.min.y, bounds.min.z))
      boundsVertices.push(new Vector3(bounds.max.x, bounds.min.y, bounds.max.z))
      boundsVertices.push(new Vector3(bounds.max.x, bounds.max.y, bounds.min.z))
      boundsVertices.push(new Vector3(bounds.max.x, bounds.max.y, bounds.max.z))

      const worldVerts = boundsVertices.map((v) => v.clone())

      bounds.getCenter(focusPos)
      boundsVertices = boundsVertices.map((v) => v.clone().sub(focusPos))
      const lightPlane = lpP.set(lightDirInv, 0)
      const projectedVerts = boundsVertices.map((v) => lightPlane.projectPoint(v, new Vector3()))

      const centralVert = projectedVerts.reduce((a, b) => a.add(b), v.set(0, 0, 0)).divideScalar(projectedVerts.length)
      const radius = projectedVerts.map((v) => v.distanceTo(centralVert)).reduce((a, b) => Math.max(a, b))
      const dirLength = boundsVertices.map((x) => x.dot(lightDir)).reduce((a, b) => Math.max(a, b))
      // Shadows
      cCamera.position.copy(lightDir.clone().multiplyScalar(dirLength).add(focusPos))
      cCamera.lookAt(cScene.localToWorld(focusPos.clone()))
      const dirMatrix = lpM.lookAt(cCamera.position, focusPos, v.set(0, 1, 0))
      cCamera.left = -radius
      cCamera.right = radius
      cCamera.top = radius
      cCamera.bottom = -radius
      // const yOffset = v.set(0, radius, 0).applyMatrix4(dirMatrix)
      // const yTime = (cCamera.position.y + yOffset.y) / lightDir.y
      // cCamera.near = 0.1
      cCamera.far = dirLength * 2 // yTime
      cCamera.updateProjectionMatrix()
      cCamera.updateMatrixWorld()

      // Now find size of ground plane
      const groundProjectedCoords = worldVerts.map((v) => v.add(lightDir.clone().multiplyScalar(-v.y / lightDir.y)))
      const centerPos = groundProjectedCoords
        .reduce((a, b) => a.add(b), v.set(0, 0, 0))
        .divideScalar(groundProjectedCoords.length)
      const maxSize =
        2 *
        groundProjectedCoords
          .map((v) => Math.hypot(v.x - centerPos.x, v.z - centerPos.z))
          .reduce((a, b) => Math.max(a, b))
      plane.scale.setScalar(maxSize)
      plane.position.copy(centerPos)

      if (debug) helper?.update()

      // Inject uniforms
      normalMatB.viewMatrix.value = normalMat.viewMatrix.value = cCamera.matrixWorldInverse

      const dirLightNearPlane = lpF.setFromProjectionMatrix(
        lpM.multiplyMatrices(cCamera.projectionMatrix, cCamera.matrixWorldInverse)
      ).planes[4]

      causticsMaterial.cameraMatrixWorld = cCamera.matrixWorld
      causticsMaterial.cameraProjectionMatrixInv = cCamera.projectionMatrixInverse
      causticsMaterial.lightDir = lightDirInv

      causticsMaterial.lightPlaneNormal = dirLightNearPlane.normal
      causticsMaterial.lightPlaneConstant = dirLightNearPlane.constant

      causticsMaterial.near = cCamera.near
      causticsMaterial.far = cCamera.far
      causticsMaterial.resolution = resolution
      causticsMaterial.size = radius
      causticsMaterial.intensity = intensity
      causticsMaterial.worldRadius = worldRadius

      // Switch the cScene on
      cScene.visible = true

      // Render front face normals
      gl.setRenderTarget(normalTarget)
      gl.clear()
      cScene.overrideMaterial = normalMat
      gl.render(cScene, cCamera)

      // Render back face normals, if enabled
      gl.setRenderTarget(normalTargetB)
      gl.clear()
      if (backside) {
        cScene.overrideMaterial = normalMatB
        gl.render(cScene, cCamera)
      }

      // Remove the override material
      cScene.overrideMaterial = null

      // Render front face caustics
      causticsMaterial.ior = ior
      plane.material.lightProjMatrix = cCamera.projectionMatrix
      plane.material.lightViewMatrix = cCamera.matrixWorldInverse
      causticsMaterial.normalTexture = normalTarget.texture
      causticsMaterial.depthTexture = normalTarget.depthTexture
      gl.setRenderTarget(causticsTarget)
      gl.clear()
      causticsQuad.render(gl)

      // Render back face caustics, if enabled
      causticsMaterial.ior = backsideIOR
      causticsMaterial.normalTexture = normalTargetB.texture
      causticsMaterial.depthTexture = normalTargetB.depthTexture
      gl.setRenderTarget(causticsTargetB)
      gl.clear()
      if (backside) causticsQuad.render(gl)

      // Reset render target
      gl.setRenderTarget(null)

      // Switch the cScene off if caustics is all that's wanted
      if (causticsOnly) cScene.visible = false
    }
  }
}

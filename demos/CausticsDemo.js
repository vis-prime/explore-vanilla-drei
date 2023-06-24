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
  Object3D,
} from 'three'
import * as THREE from 'three'

// Model and Env
import { MODEL_LIST } from '../models/MODEL_LIST'
import { BG_ENV } from './BG_ENV'
import { Caustics, CausticsFunc } from '../wip/Caustics'
import { FullScreenQuad } from 'three-stdlib'
import { Tween, update } from '@tweenjs/tween.js'
import { EffectComposer, RenderPass, BloomEffect, EffectPass } from 'postprocessing'

let stats,
  renderer,
  composer,
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

const CausticsModels = {
  Vase: MODEL_LIST.vase,
  Monkey: MODEL_LIST.monkey,
  Bunny: MODEL_LIST.bunny,
  BunnyD: MODEL_LIST.bunnyDrei,

  Porsche: MODEL_LIST.porsche_1975,
}

const params = {
  model: CausticsModels.Porsche,
}

/**
 * @type {{[key: string]: Object3D }}
 */
const modelCache = {}

/**
 * @type {Object3D}
 */
let activeModel

export async function CausticsDemo(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder('Scene')
  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new WebGLRenderer({ antialias: false, alpha: true })
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = VSMShadowMap
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  app.appendChild(renderer.domElement)

  // camera
  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.set(-5, 5, 5)
  camera.name = 'Camera'
  // scene
  scene = new Scene()
  scene.add(mainObjects)

  composer = new EffectComposer(renderer, { multisampling: 4 })
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new EffectPass(camera, new BloomEffect({ mipmapBlur: true, luminanceThreshold: 0.9 })))

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.minDistance = 0.1
  controls.maxDistance = 400
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
  bg_env.setBGType('Default')
  bg_env.setEnvType('HDRI')
  await bg_env.updateAll()
  bg_env.addGui(sceneGui)
  scene.backgroundBlurriness = 0.4
  scene.backgroundIntensity = 0.4

  await setupModel()
  setupCaustics()

  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  composer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  stats.update()
  update()
  controls.update()
  useFrame()
  if (caustics) caustics.update()
  composer.render(scene, camera)
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

async function setupModel() {
  const loadModel = async () => {
    let gltf = modelCache[params.model.url]
    if (!gltf) {
      gltf = await gltfLoader.loadAsync(params.model.url)
      modelCache[params.model.url] = gltf
    }

    gltf.scene.traverse((node) => {
      node.frustumCulled = false
    })

    let parent
    if (activeModel) {
      parent = activeModel.parent
      activeModel.removeFromParent()
    }
    if (parent) parent.add(gltf.scene)
    activeModel = gltf.scene
  }

  gui.add(params, 'model', CausticsModels).onChange(async (v) => {
    await loadModel()
  })

  await loadModel()

  gui
    .add(activeModel.scale, 'x', 0.0001, 3)
    .name('model scale')
    .onChange((v) => {
      activeModel.scale.setScalar(v)
    })
}

const causticsParams = {
  debug: true,
  frames: Infinity,
  ior: 1.1,
  color: new Color('white'),
  causticsOnly: false,
  backside: false,
  backsideIOR: 1.1,
  worldRadius: 0.3125 / 100,
  intensity: 0.05,
  resolution: 2024,
  falloff: 0,
}

async function setupCausticsOld() {
  const lightSource = new Group()
  lightSource.position.set(1, 1, 1)
  transformControls.attach(lightSource)
  transformControls.addEventListener('change', () => {})
  scene.add(lightSource)

  // Buffers for front and back faces
  const res = causticsParams.resolution
  const normalTarget = useFBO(res, res, Caustics.NORMALPROPS)
  const normalTargetB = useFBO(res, res, Caustics.NORMALPROPS)
  const causticsTarget = useFBO(res, res, Caustics.CAUSTICPROPS)
  const causticsTargetB = useFBO(res, res, Caustics.CAUSTICPROPS)

  // Normal materials for front and back faces
  const normalMat = Caustics.createNormalMaterial()
  const normalMatB = Caustics.createNormalMaterial(BackSide)

  // The quad that catches the caustics
  const causticsMaterial = new Caustics.CausticsMaterial()
  const causticsQuad = new FullScreenQuad(causticsMaterial)
  causticsMaterial.far = 1000
  const causticsGroup = new Group()
  causticsGroup.name = 'caustics_group'

  const causticsCam = new OrthographicCamera()
  causticsCam.near = 0.01
  causticsCam.far = 0.5
  const gl = renderer
  const helper = new CameraHelper(causticsCam)
  const causticsScene = new Scene()
  causticsScene.name = 'caustics_scene'

  const plane = new Mesh(
    new PlaneGeometry(1, 1),
    new Caustics.CausticsProjectionMaterial({
      transparent: true,
      color: causticsParams.color,
      causticsTexture: causticsTarget.texture,
      causticsTextureB: causticsTargetB.texture,
      blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.SrcAlphaFactor,
      depthWrite: false,
    })
  )
  plane.name = 'caustics_plane'
  plane.rotation.x = -Math.PI / 2
  plane.renderOrder = 2
  causticsGroup.add(causticsScene, plane)
  causticsScene.add(activeModel) //add glb to caustics scene
  mainObjects.add(causticsGroup, helper) // add entire group to scene
  causticsGroup.updateWorldMatrix(false, true)
  // math
  let count = 0

  const v = new THREE.Vector3()
  const lpF = new THREE.Frustum()
  const lpM = new THREE.Matrix4()
  const lpP = new THREE.Plane()

  const lightDir = new THREE.Vector3()
  const lightDirInv = new THREE.Vector3()
  const bounds = new THREE.Box3()
  const focusPos = new THREE.Vector3()

  const boundsVertices = []
  const worldVerts = []
  const projectedVerts = []
  const lightDirs = []

  const cameraPos = new THREE.Vector3()

  for (let i = 0; i < 8; i++) {
    boundsVertices.push(new THREE.Vector3())
    worldVerts.push(new THREE.Vector3())
    projectedVerts.push(new THREE.Vector3())
    lightDirs.push(new THREE.Vector3())
  }

  console.log({ causticsMaterial })
  useFrame = () => {
    if (causticsParams.frames === Infinity || count++ < causticsParams.frames) {
      lightDir.copy(causticsGroup.worldToLocal(lightSource.getWorldPosition(v)).normalize())

      lightDirInv.copy(lightDir).multiplyScalar(-1)

      causticsScene.parent?.matrixWorld.identity()
      bounds.setFromObject(causticsScene, true)
      boundsVertices[0].set(bounds.min.x, bounds.min.y, bounds.min.z)
      boundsVertices[1].set(bounds.min.x, bounds.min.y, bounds.max.z)
      boundsVertices[2].set(bounds.min.x, bounds.max.y, bounds.min.z)
      boundsVertices[3].set(bounds.min.x, bounds.max.y, bounds.max.z)
      boundsVertices[4].set(bounds.max.x, bounds.min.y, bounds.min.z)
      boundsVertices[5].set(bounds.max.x, bounds.min.y, bounds.max.z)
      boundsVertices[6].set(bounds.max.x, bounds.max.y, bounds.min.z)
      boundsVertices[7].set(bounds.max.x, bounds.max.y, bounds.max.z)

      for (let i = 0; i < 8; i++) {
        worldVerts[i].copy(boundsVertices[i])
      }

      bounds.getCenter(focusPos)
      boundsVertices.map((v) => v.sub(focusPos))
      const lightPlane = lpP.set(lightDirInv, 0)

      boundsVertices.map((v, i) => lightPlane.projectPoint(v, projectedVerts[i]))

      const centralVert = projectedVerts.reduce((a, b) => a.add(b), v.set(0, 0, 0)).divideScalar(projectedVerts.length)
      const radius = projectedVerts.map((v) => v.distanceTo(centralVert)).reduce((a, b) => Math.max(a, b))
      const dirLength = boundsVertices.map((x) => x.dot(lightDir)).reduce((a, b) => Math.max(a, b))
      // Shadows
      causticsCam.position.copy(cameraPos.copy(lightDir).multiplyScalar(dirLength).add(focusPos))
      causticsCam.lookAt(causticsScene.localToWorld(focusPos))
      const dirMatrix = lpM.lookAt(causticsCam.position, focusPos, v.set(0, 1, 0))
      causticsCam.left = -radius
      causticsCam.right = radius
      causticsCam.top = radius
      causticsCam.bottom = -radius
      const yOffset = v.set(0, radius, 0).applyMatrix4(dirMatrix)
      const yTime = (causticsCam.position.y + yOffset.y) / lightDir.y
      causticsCam.near = 0.1
      causticsCam.far = yTime
      causticsCam.updateProjectionMatrix()
      causticsCam.updateMatrixWorld()

      // Now find size of ground plane
      const groundProjectedCoords = worldVerts.map((v, i) =>
        v.add(lightDirs[i].copy(lightDir).multiplyScalar(-v.y / lightDir.y))
      )
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

      if (causticsParams.debug) helper?.update()

      // Inject uniforms
      normalMatB.viewMatrix.value = normalMat.viewMatrix.value = causticsCam.matrixWorldInverse

      const dirLightNearPlane = lpF.setFromProjectionMatrix(
        lpM.multiplyMatrices(causticsCam.projectionMatrix, causticsCam.matrixWorldInverse)
      ).planes[4]

      causticsMaterial.cameraMatrixWorld = causticsCam.matrixWorld
      causticsMaterial.cameraProjectionMatrixInv = causticsCam.projectionMatrixInverse
      causticsMaterial.lightDir = lightDirInv

      causticsMaterial.lightPlaneNormal = dirLightNearPlane.normal
      causticsMaterial.lightPlaneConstant = dirLightNearPlane.constant

      causticsMaterial.near = causticsCam.near
      causticsMaterial.far = causticsCam.far
      causticsMaterial.resolution = causticsParams.resolution
      causticsMaterial.size = radius
      causticsMaterial.intensity = causticsParams.intensity
      causticsMaterial.worldRadius = causticsParams.worldRadius

      // Switch the scene on
      causticsScene.visible = true

      // Render front face normals
      gl.setRenderTarget(normalTarget)
      gl.clear()
      causticsScene.overrideMaterial = normalMat
      gl.render(causticsScene, causticsCam)

      // Render back face normals, if enabled
      gl.setRenderTarget(normalTargetB)
      gl.clear()
      if (causticsParams.backside) {
        causticsScene.overrideMaterial = normalMatB
        gl.render(causticsScene, causticsCam)
      }

      // Remove the override material
      causticsScene.overrideMaterial = null
      causticsMaterial.falloff = causticsParams.falloff
      // Render front face caustics
      causticsMaterial.ior = causticsParams.ior
      plane.material.lightProjMatrix = causticsCam.projectionMatrix
      plane.material.lightViewMatrix = causticsCam.matrixWorldInverse
      causticsMaterial.normalTexture = normalTarget.texture
      causticsMaterial.depthTexture = normalTarget.depthTexture
      gl.setRenderTarget(causticsTarget)
      gl.clear()
      causticsQuad.render(gl)

      // Render back face caustics, if enabled
      causticsMaterial.ior = causticsParams.backsideIOR
      causticsMaterial.normalTexture = normalTargetB.texture
      causticsMaterial.depthTexture = normalTargetB.depthTexture
      gl.setRenderTarget(causticsTargetB)
      gl.clear()
      if (causticsParams.backside) causticsQuad.render(gl)

      // Reset render target
      gl.setRenderTarget(null)

      // Switch the scene off if caustics is all that's wanted
      if (causticsParams.causticsOnly) causticsScene.visible = false
    }
  }

  addCausticsGui()

  console.log(scene)
}

let caustics
async function setupCaustics() {
  caustics = CausticsFunc(renderer, { frames: Infinity })

  scene.add(caustics.group, caustics.helper)

  caustics.scene.add(activeModel)

  addCausticsGui()

  console.log(scene)
}

function addCausticsGui() {
  const folder = gui.addFolder('Caustics')
  folder.open()
  folder.addColor(caustics.params, 'color')
  folder.add(caustics.params, 'ior', 0, Math.PI)
  folder.add(caustics.params, 'backside').onChange((v) => {
    if (!v) {
      // to prevent last frame from persisting
      // causticsTargetB.dispose()
    }
  })
  folder.add(caustics.params, 'backsideIOR', 0, Math.PI)
  folder.add(caustics.params, 'worldRadius', 0, 0.05)
  folder.add(caustics.params, 'intensity', 0, 1)
  folder.add(caustics.params, 'causticsOnly')
  folder.add(caustics.params.lightSource, 'x', -1, 1)
  folder.add(caustics.params.lightSource, 'y', 0, 10)
  folder.add(caustics.params.lightSource, 'z', -1, 1)
  folder.add(caustics.params, 'far', 0, 5)
}

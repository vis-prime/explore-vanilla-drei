import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { MeshTransmissionMaterial, MeshDiscardMaterial } from '@pmndrs/vanilla'
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
} from 'three'

// Model and Env
import { MODEL_LIST } from '../models/MODEL_LIST'
import { BG_ENV } from './BG_ENV'

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

export default async function meshTransmissionMaterialBasic(mainGui) {
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
  camera.position.set(2, 2, 2)
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
  const bg_env = new BG_ENV(scene)
  bg_env.setBGType('GroundProjection')
  bg_env.setEnvType('HDRI')
  bg_env.updateAll()
  bg_env.addGui(sceneGui)

  await setupMeshTransmissionMaterial()

  animate()
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

async function setupMeshTransmissionMaterial() {
  const mtmParams = {
    customBackground: scene.background,
    backside: true,
    thickness: 1,
    backsideThickness: 0.5,
  }

  const gltf = await gltfLoader.loadAsync(MODEL_LIST.monkey.url)
  const model = gltf.scene

  const discardMaterial = new MeshDiscardMaterial()
  const meshTransmissionMaterial = new MeshTransmissionMaterial({ anisotropy: 0.5 })

  const meshes = []
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model
      child.material = meshTransmissionMaterial
      meshes.push(child)
    }
  })
  mainObjects.add(model)

  addTransmissionGui(gui, meshTransmissionMaterial, mtmParams)

  const fboBack = new WebGLRenderTarget(512, 512, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    colorSpace: renderer.outputColorSpace,
    type: HalfFloatType,
  })
  const fboMain = new WebGLRenderTarget(512, 512, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    colorSpace: renderer.outputColorSpace,
    type: HalfFloatType,
  })

  const mtm = meshTransmissionMaterial
  mtm.buffer = fboMain.texture
  let oldBg
  let oldTone
  let oldSide
  const state = {
    gl: renderer,
    scene,
    camera,
  }

  const clock = new Clock(true)

  // run on every frame
  useFrame = () => {
    mtm.time = clock.getElapsedTime()

    for (const mesh of meshes) {
      const parent = mesh

      if (mtm.buffer === fboMain.texture) {
        // Save defaults
        oldTone = state.gl.toneMapping
        oldBg = state.scene.background
        oldSide = parent.material.side

        // Switch off tonemapping lest it double tone maps
        // Save the current background and set the HDR as the new BG
        // Use discardMaterial, the parent will be invisible, but it's shadows will still be cast
        state.gl.toneMapping = NoToneMapping
        if (mtmParams.background) state.scene.background = mtmParams.background
        parent.material = discardMaterial

        if (mtmParams.backside) {
          // Render into the backside buffer
          state.gl.setRenderTarget(fboBack)
          state.gl.render(state.scene, state.camera)
          // And now prepare the material for the main render using the backside buffer
          parent.material = mtm
          parent.material.buffer = fboBack.texture
          parent.material.thickness = mtmParams.backsideThickness
          parent.material.side = BackSide
        }

        // Render into the main buffer
        state.gl.setRenderTarget(fboMain)
        state.gl.render(state.scene, state.camera)

        parent.material = mtm
        parent.material.thickness = mtmParams.thickness
        parent.material.side = oldSide
        parent.material.buffer = fboMain.texture

        // Set old state back
        state.scene.background = oldBg
        state.gl.setRenderTarget(null)

        state.gl.toneMapping = oldTone
      }
    }
  }
}

function addTransmissionGui(gui, mat, mtmParams) {
  const fol = gui.addFolder('Transmission Material')
  fol.open()
  fol.add(mtmParams, 'backside')
  fol.add(mtmParams, 'thickness', 0, 2)
  fol.add(mtmParams, 'backsideThickness', 0, 2)

  fol.addColor(mat, 'color')

  fol.add(mat, 'roughness', 0, 1)
  fol.add(mat, 'chromaticAberration', 0, 2)
  fol.add(mat, 'distortion', 0, 10)
  fol.add(mat, 'temporalDistortion', 0, 1)
  fol.add(mat, 'anisotropicBlur', 0, 10)
  fol.add(mat, 'reflectivity', 0, 1)

  fol.addColor(mat, 'attenuationColor')
  fol.add(mat, 'attenuationDistance', 0, 2)
}

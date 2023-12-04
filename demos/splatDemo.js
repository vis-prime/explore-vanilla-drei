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
} from 'three'

// Model and Env
import * as THREE from 'three'

import { MODEL_LIST } from '../models/MODEL_LIST'
import { BG_ENV } from './BG_ENV'
import { SplatLoader } from '../wip/splatlib/SplatLoader'
import { SplatMaterial } from '../wip/splatlib/SplatMaterial'

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
let onEachFrame = () => {} // runs on every frame frame
let sceneGui, model

export async function SplatDemo(mainGui) {
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

  animate()

  await setupSplats()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  onEachFrame()
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

async function setupSplats() {
  const url = 'https://raw.githubusercontent.com/drcmda/splats/main/public/kitchen-7k.splat'
  const nike_url = 'https://raw.githubusercontent.com/drcmda/splats/main/public/nike.splat'

  // SplatComp returns object with { mesh , update}

  // const kitchen = SplatComp({ gl: renderer, camera, src: url })
  // scene.add(kitchen.mesh)

  // const nike = SplatComp({ gl: renderer, camera, src: nike_url })
  // nike.mesh.position.y = 3
  // scene.add(nike.mesh)

  // console.log({ kitchen, nike })

  // onEachFrame = () => {
  //   kitchen.update()
  //   nike.update()
  //   nike.mesh.rotation.y += 0.001
  // }
  const toneMapped = false,
    alphaTest = 0,
    alphaHash = false,
    chunkSize = 25000

  // const loader = new SplatLoader()
  // loader.gl = renderer
  // loader.chunkSize = 25000
  // const data = await new Promise((res) => loader.load('nike.splat', res))
  // const m1 = new THREE.Mesh()
  // m1.material = new SplatMaterial({
  //   transparent: !alphaHash,
  //   depthTest: true,
  //   alphaTest: alphaHash ? 0 : alphaTest,
  //   centerAndScaleTexture: shared.centerAndScaleTexture,
  //   covAndColorTexture: shared.covAndColorTexture,
  //   depthWrite: alphaHash ? true : alphaTest > 0,
  //   blending: alphaHash ? THREE.NormalBlending : THREE.CustomBlending,
  //   blendSrcAlpha: THREE.OneFactor,
  //   alphaHash: !!alphaHash,
  //   toneMapped: toneMapped,
  // })
  // data.connect(data, m1)

  // const m2 = new THREE.Mesh()
  // m2.material = new SplatMaterial( transparent: !alphaHash,
  //   depthTest: true,
  //   alphaTest: alphaHash ? 0 : alphaTest,
  //   centerAndScaleTexture: shared.centerAndScaleTexture,
  //   covAndColorTexture: shared.covAndColorTexture,
  //   depthWrite: alphaHash ? true : alphaTest > 0,
  //   blending: alphaHash ? THREE.NormalBlending : THREE.CustomBlending,
  //   blendSrcAlpha: THREE.OneFactor,
  //   alphaHash: !!alphaHash,
  //   toneMapped: toneMapped,)
  // data.connect(data, m2)

  const loader = new SplatLoader()
  loader.gl = renderer
  loader.chunkSize = 25000

  const data = await new Promise((res) => loader.load(nike_url, res))
  console.log({ nikeData: data })
  const shoe1 = new THREE.Mesh()
  shoe1.position.y = 3
  shoe1.material = new SplatMaterial({
    transparent: !alphaHash,
    depthTest: true,
    alphaTest: alphaHash ? 0 : alphaTest,
    centerAndScaleTexture: data.centerAndScaleTexture,
    covAndColorTexture: data.covAndColorTexture,
    depthWrite: alphaHash ? true : alphaTest > 0,
    blending: alphaHash ? THREE.NormalBlending : THREE.CustomBlending,
    blendSrcAlpha: THREE.OneFactor,
    alphaHash: !!alphaHash,
    toneMapped: toneMapped,
  })
  scene.add(shoe1)
  data.connect(shoe1)

  const shoe2 = new THREE.Mesh()
  shoe2.position.y = 2

  shoe2.material = new SplatMaterial({
    transparent: !alphaHash,
    depthTest: true,
    alphaTest: alphaHash ? 0 : alphaTest,
    centerAndScaleTexture: data.centerAndScaleTexture,
    covAndColorTexture: data.covAndColorTexture,
    depthWrite: alphaHash ? true : alphaTest > 0,
    blending: alphaHash ? THREE.NormalBlending : THREE.CustomBlending,
    blendSrcAlpha: THREE.OneFactor,
    alphaHash: !!alphaHash,
    toneMapped: toneMapped,
  })
  scene.add(shoe2)
  data.connect(shoe2)

  // const loaderKitchen = new SplatLoader()
  // loaderKitchen.gl = renderer
  // loaderKitchen.chunkSize = 25000
  // const dataK = await new Promise((res) => loaderKitchen.load(url, res))
  // console.log({ kitchenData: dataK })

  // const kitchen = new THREE.Mesh()
  // kitchen.material = new SplatMaterial({
  //   transparent: !alphaHash,
  //   depthTest: true,
  //   alphaTest: alphaHash ? 0 : alphaTest,
  //   centerAndScaleTexture: dataK.centerAndScaleTexture,
  //   covAndColorTexture: dataK.covAndColorTexture,
  //   depthWrite: alphaHash ? true : alphaTest > 0,
  //   blending: alphaHash ? THREE.NormalBlending : THREE.CustomBlending,
  //   blendSrcAlpha: THREE.OneFactor,
  //   alphaHash: !!alphaHash,
  //   toneMapped: toneMapped,
  // })
  // scene.add(kitchen)
  // dataK.connect(kitchen)

  onEachFrame = () => {
    shoe1.rotation.y = Date.now() * 0.001
    shoe2.rotation.y = Date.now() * -0.001

    data.update(shoe1, camera)
    data.update(shoe2, camera)
    // dataK.update(kitchen, camera)
  }

  const gltf = await gltfLoader.loadAsync(MODEL_LIST.monkey.url)
  model = gltf.scene

  const meshes = []
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model
      meshes.push(child)
    }
  })

  mainObjects.add(model)
}

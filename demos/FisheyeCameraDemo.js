import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import * as THREE from 'three'

// Model and Env
import { MODEL_LIST, MODEL_LOADER } from '../models/MODEL_LIST'
import { BG_ENV } from './BG_ENV'
import { Fisheye } from '@pmndrs/vanilla'

import { Tween, Group as TwGroup } from '@tweenjs/tween.js'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { LoadingHelper } from './LoadingHelper'

const l_h = new LoadingHelper()

const TW_GROUP = new TwGroup()
let stats,
  /**
   *  @type {THREE.WebGLRenderer}
   */
  renderer,
  raf,
  camera,
  scene,
  controls,
  gui,
  pointer = new THREE.Vector2()

const mainObjects = new THREE.Group()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new THREE.Raycaster()
const intersects = [] //raycast
let sceneGui

/**
 * @type {Fisheye}
 */
let fishEye
const params = {
  zoom: 0,
  resolution: 896,
  progress: 0,
  fisheye: false,
  playPause: () => {},
  scrubCurve: () => {},
  /**
   * @type {Tween}
   */
  scrubTween: null,
}
export default async function meshTransmissionMaterialInstant(mainGui) {
  gui = mainGui
  sceneGui = gui.addFolder('Scene')
  stats = new Stats()
  app.appendChild(stats.dom)
  // renderer
  renderer = new THREE.WebGLRenderer({
    powerPreference: 'high-performance',
  })

  renderer.toneMapping = THREE.NeutralToneMapping
  app.appendChild(renderer.domElement)

  sceneGui.add({ dpr: renderer.getPixelRatio() }, 'dpr', 0.5, window.devicePixelRatio, 0.1).onChange((value) => {
    renderer.setPixelRatio(value)
  })

  // camera
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200)
  camera.position.set(0, 2, 6)
  camera.name = 'Camera'
  // scene
  scene = new THREE.Scene()
  scene.add(mainObjects)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.target.set(0, 2, 0)

  setupFishEyeCamera()

  window.addEventListener('resize', onWindowResize)
  onWindowResize()

  let downTime = Date.now()
  app.addEventListener('pointerdown', () => {
    downTime = Date.now()
  })
  app.addEventListener('pointerup', (e) => {
    if (Date.now() - downTime < 200) {
      updatePointer(e)
      raycast()
    }
  })

  const bg_env = new BG_ENV(scene, { loadingHelper: l_h })
  bg_env.preset = HDRI_LIST.skidpan
  bg_env.setBGType('Default')
  bg_env.setEnvType('HDRI')

  await Promise.all([bg_env.updateAll(), setupScene()])

  // bg_env.addGui(sceneGui)

  animate()
}

function onWindowResize() {
  const w = window.innerWidth,
    h = window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
  fishEye.onResize(w, h) // resize fishEye
}

function render() {
  stats.update()
  TW_GROUP.update() // tween.update()

  controls.update()
  if (params.fisheye) {
    fishEye.render(renderer, scene, camera)
  } else {
    renderer.render(scene, camera)
  }
}

function animate() {
  renderer.setAnimationLoop(render)
}

const color = new THREE.Color()
function raycast() {
  if (params.fisheye) {
    fishEye.computeRaycastRayDirection(raycaster, pointer)
  } else {
    raycaster.setFromCamera(pointer, camera)
  }

  raycaster.intersectObject(mainObjects, true, intersects)

  if (intersects.length && intersects[0].instanceId !== undefined) {
    // change color of the instance
    const mesh = intersects[0].object
    color.setHSL(Math.random(), 1, 0.5)
    mesh.setColorAt(intersects[0].instanceId, color)
    mesh.instanceColor.needsUpdate = true
  }

  intersects.length = 0
}

function updatePointer(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}

async function setupScene() {
  console.log(
    `"Hintze-Hall - VR Tour" (https://skfb.ly/p8zyZ) by Another-me is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`
  )
  const gltf = await MODEL_LOADER(MODEL_LIST.hintze_hall.url, { loadingHelper: l_h })
  const model = gltf.scene

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model
    }
  })
  scene.add(model)

  const geo = new THREE.TorusKnotGeometry(0.6, 0.3, 64, 64)

  const count = 10
  const mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ roughness: 0.3 }), count)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.name = `torusknots`
  mainObjects.add(mesh)

  // Distribute meshes on left and right side of x axis with 2 unit gap
  const matrix = new THREE.Matrix4()
  const quat = new THREE.Quaternion()
  const color = new THREE.Color()
  for (let index = 0; index < count; index++) {
    matrix.identity()
    // Place half on left, half on right
    const side = index % 2 === 0 ? -1 : 1
    // Calculate position: left side starts at -2, right side at +2, with 2 unit gap
    const zGap = 19
    const z = (index * zGap) / (count / 2) - zGap

    // Random rotation
    const rotX = Math.random() * Math.PI * 2
    const rotY = Math.random() * Math.PI * 2
    const rotZ = Math.random() * Math.PI * 2
    quat.setFromEuler(new THREE.Euler(rotX, rotY, rotZ))

    matrix.makeRotationFromQuaternion(quat)
    matrix.setPosition(side * 10, 2.5, z)

    mesh.setMatrixAt(index, matrix)
    mesh.setColorAt(index, color.set(Math.random(), Math.random(), Math.random()))
  }
  mesh.computeBoundingSphere()
  mesh.instanceMatrix.needsUpdate = true
  mesh.instanceColor.needsUpdate = true
}

function setupFishEyeCamera() {
  fishEye = new Fisheye({ resolution: params.resolution })

  setupCameraCurve()
}

function setupCameraCurve() {
  // Function to create a CurvePath from segments
  function createCurveFromSegments(curveSegments) {
    const curve = new THREE.CurvePath()
    curveSegments.forEach((segment) => {
      const [p0, p1, p2, p3] = segment
      const bezierSegment = new THREE.CubicBezierCurve3(
        new THREE.Vector3(...p0),
        new THREE.Vector3(...p1),
        new THREE.Vector3(...p2),
        new THREE.Vector3(...p3)
      )
      curve.add(bezierSegment)
    })
    return curve
  }

  function createLineFromCurve(curve) {
    // Create geometry from curve
    const points0 = curve.getPoints(100)
    const geometry0 = new THREE.BufferGeometry().setFromPoints(points0)
    const material0 = new THREE.LineBasicMaterial({ color: 0xffffff * Math.random(), opacity: 0.5, transparent: true })
    const line0 = new THREE.Line(geometry0, material0)
    return line0
  }

  // Create curve0 from segments
  const cameraCurve = createCurveFromSegments(CameraCurveSegments)
  const targetCurve = createCurveFromSegments(TargetCurveSegments)

  // Create lines from curves
  // const cameraLine = createLineFromCurve(cameraCurve)
  // const targetLine = createLineFromCurve(targetCurve)

  // scene.add(cameraLine)
  // scene.add(targetLine)

  const curveParams = {
    duration: 40000,
  }
  function scrubCameraAlongCurve() {
    const t = params.progress % 1
    cameraCurve.getPointAt(t, camera.position)
    targetCurve.getPointAt(t, controls.target)
  }

  const twObj = { t: 0 }
  const scrubTween = new Tween(twObj, TW_GROUP)
    .repeat(Infinity)
    .to({ t: 1 }, curveParams.duration)
    .onUpdate(() => {
      params.progress = twObj.t
      scrubCameraAlongCurve()
      allDivs.rangeInput.value = params.progress
    })
    .start()
    .pause()

  const playPause = () => {
    if (scrubTween.isPaused()) {
      scrubTween.resume()
    } else if (scrubTween.isPlaying()) {
      scrubTween.pause()
    } else {
      scrubTween.start()
    }
  }

  params.playPause = playPause
  params.scrubCurve = scrubCameraAlongCurve
  params.scrubTween = scrubTween

  const folder = gui.addFolder('Fisheye')
  folder.add(params, 'fisheye').listen()
  folder.add(params, 'zoom', 0, 1, 0.01).onChange(() => {
    fishEye.zoom = params.zoom
    fishEye.onResize(window.innerWidth, window.innerHeight)
  })

  folder.add(params, 'resolution', 128, 1024, 128).onChange((value) => {
    fishEye.updateResolution(value)
  })

  setupControlsDiv()
}

const allDivs = {
  controlsDiv: document.createElement('div'),
  buttonsDiv: document.createElement('div'),
  fisheyeButton: document.createElement('button'),
  playPauseButton: document.createElement('button'),
  rangeInput: document.createElement('input'),
}

function setupControlsDiv() {
  // Use pre-created elements from allDivs
  const controlsDiv = allDivs.controlsDiv
  controlsDiv.style.position = 'fixed'
  controlsDiv.style.bottom = '20px'
  controlsDiv.style.left = '50%'
  controlsDiv.style.transform = 'translateX(-50%)'
  // controlsDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
  controlsDiv.style.padding = '15px'
  controlsDiv.style.borderRadius = '10px'
  controlsDiv.style.display = 'flex'
  controlsDiv.style.flexDirection = 'column'
  controlsDiv.style.gap = '10px'
  controlsDiv.style.zIndex = '1000'
  controlsDiv.style.width = '90%'
  controlsDiv.style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.5)'

  const buttonsDiv = allDivs.buttonsDiv
  buttonsDiv.style.display = 'flex'
  buttonsDiv.style.gap = '10px'
  buttonsDiv.style.justifyContent = 'center'

  function styleButton(btn) {
    btn.style.padding = '8px 16px'
    btn.style.opacity = '0.8'
    btn.style.backgroundColor = '#333'
    btn.style.color = 'white'
    btn.style.border = '1px solid #555'
    btn.style.borderRadius = '5px'
    btn.style.cursor = 'pointer'
    btn.style.fontSize = '14px'
  }

  // Fisheye button
  const fisheyeBtn = allDivs.fisheyeButton
  fisheyeBtn.textContent = 'Fisheye Off'
  styleButton(fisheyeBtn)
  fisheyeBtn.onclick = () => {
    params.fisheye = !params.fisheye
    fisheyeBtn.textContent = params.fisheye ? 'Fisheye On' : 'Fisheye Off'
    fisheyeBtn.style.color = params.fisheye ? '#00ff00' : 'white'
  }

  // Play/Pause button
  const playPauseBtn = allDivs.playPauseButton
  playPauseBtn.textContent = 'Play'
  styleButton(playPauseBtn)
  playPauseBtn.onclick = () => {
    params.playPause()
    if (params.scrubTween.isPaused()) {
      playPauseBtn.textContent = 'Resume'
    } else if (params.scrubTween.isPlaying()) {
      playPauseBtn.textContent = 'Pause'
    } else {
      playPauseBtn.textContent = 'Play'
    }
  }

  buttonsDiv.appendChild(fisheyeBtn)
  buttonsDiv.appendChild(playPauseBtn)

  const scrubDiv = document.createElement('div')
  scrubDiv.style.display = 'flex'
  scrubDiv.style.flexDirection = 'column'
  scrubDiv.style.alignItems = 'center'
  scrubDiv.style.gap = '5px'

  const scrubInput = allDivs.rangeInput
  scrubInput.type = 'range'
  scrubInput.min = '0'
  scrubInput.max = '1'
  scrubInput.step = '0.001'
  scrubInput.value = params.progress
  scrubInput.style.width = '100%'
  scrubInput.addEventListener('input', (e) => {
    params.progress = parseFloat(e.target.value)
    params.scrubCurve()
    controls.update() // To avoid frame late updates
    // set tween progress too
    const elapsed = THREE.MathUtils.mapLinear(params.progress, 0, 1, 0, params.scrubTween._duration)
    setTweenProgress(params.scrubTween, elapsed)
  })

  scrubDiv.appendChild(scrubInput)

  controlsDiv.appendChild(buttonsDiv)
  controlsDiv.appendChild(scrubDiv)

  document.body.appendChild(controlsDiv)
}

const CameraCurveSegments = [
  [
    [-8.1648, 2.4362, -8.072],
    [-8.1648, 2.4362, -16.7769],
    [-1.6856, 2.4362, -18.7521],
    [-1.6856, 2.4362, -23.3563],
  ],
  [
    [-1.6856, 2.4362, -23.3563],
    [-1.6856, 2.4362, -28.6741],
    [-1.6856, 7.4758, -36.2053],
    [-1.6856, 7.4758, -38.1573],
  ],
  [
    [-1.6856, 7.4758, -38.1573],
    [-1.6856, 7.4758, -44.1211],
    [-10.9197, 11.83, -43.002],
    [-18.5107, 11.83, -43.002],
  ],
  [
    [-18.5107, 11.83, -43.002],
    [-20.911, 11.83, -43.002],
    [-20.5255, 11.83, -39.1374],
    [-20.5255, 11.83, -35.6584],
  ],
  [
    [-20.5255, 11.83, -35.6584],
    [-20.5255, 11.83, -35.2449],
    [-20.5255, 11.83, 18.5126],
    [-20.5255, 11.83, 19.1497],
  ],
  [
    [-20.5255, 11.83, 19.1497],
    [-20.5255, 11.83, 23.5848],
    [-19.3271, 12.8087, 23.5848],
    [-17.6154, 13.83, 23.5848],
  ],
  [
    [-17.6154, 13.83, 23.5848],
    [-11.5613, 17.4423, 23.5848],
    [-7.6476, 18.0658, 23.5848],
    [-3.6236, 19.6142, 23.5848],
  ],
  [
    [-3.6236, 19.6142, 23.5848],
    [10.3927, 25.0076, 23.5848],
    [-30.6725, 17.6138, -29.0267],
    [0.0, 17.6138, -29.0267],
  ],
  [
    [0.0, 17.6138, -29.0267],
    [30.6725, 17.6138, -29.0267],
    [-10.3927, 25.0076, 23.5848],
    [3.6236, 19.6142, 23.5848],
  ],
  [
    [3.6236, 19.6142, 23.5848],
    [7.6476, 18.0658, 23.5848],
    [11.5613, 17.4423, 23.5848],
    [17.6154, 13.83, 23.5848],
  ],
  [
    [17.6154, 13.83, 23.5848],
    [19.3271, 12.8087, 23.5848],
    [20.5255, 11.83, 23.5848],
    [20.5255, 11.83, 19.1497],
  ],
  [
    [20.5255, 11.83, 19.1497],
    [20.5255, 11.83, 18.5126],
    [20.5255, 11.83, -35.2449],
    [20.5255, 11.83, -35.6584],
  ],
  [
    [20.5255, 11.83, -35.6584],
    [20.5255, 11.83, -39.1374],
    [20.911, 11.83, -43.002],
    [18.5107, 11.83, -43.002],
  ],
  [
    [18.5107, 11.83, -43.002],
    [10.9198, 11.83, -43.002],
    [1.6856, 7.4758, -44.1211],
    [1.6856, 7.4758, -38.1573],
  ],
  [
    [1.6856, 7.4758, -38.1573],
    [1.6856, 7.4758, -36.2053],
    [1.6856, 2.4362, -28.6741],
    [1.6856, 2.4362, -23.3563],
  ],
  [
    [1.6856, 2.4362, -23.3563],
    [1.6856, 2.4362, -18.7521],
    [8.1648, 2.4362, -16.7769],
    [8.1648, 2.4362, -8.072],
  ],
  [
    [8.1648, 2.4362, -8.072],
    [8.1648, 2.4362, 0.8368],
    [6.0548, 2.4362, 7.3956],
    [0.0, 2.4362, 7.3956],
  ],
  [
    [0.0, 2.4362, 7.3956],
    [-6.0548, 2.4362, 7.3956],
    [-8.1648, 2.4362, 0.8368],
    [-8.1648, 2.4362, -8.072],
  ],
]
const TargetCurveSegments = [
  [
    [-8.9216, 3.9636, -7.0829],
    [-8.9216, 3.9636, -19.5964],
    [3.16, 3.9636, -20.5057],
    [3.16, 3.9636, -24.1335],
  ],
  [
    [3.16, 3.9636, -24.1335],
    [3.16, 3.9636, -26.6773],
    [2.2985, 5.4408, -31.246],
    [0.8767, 6.3182, -32.8328],
  ],
  [
    [0.8767, 6.3182, -32.8328],
    [-4.2808, 9.5009, -38.589],
    [-6.1502, 11.4063, -40.6487],
    [-14.3531, 11.4063, -40.6487],
  ],
  [
    [-14.3531, 11.4063, -40.6487],
    [-15.2043, 11.4063, -40.6487],
    [-18.0104, 11.4063, -40.6487],
    [-18.0104, 11.4063, -38.5479],
  ],
  [
    [-18.0104, 11.4063, -38.5479],
    [-18.0104, 11.4063, -38.1851],
    [-18.0104, 11.4063, 13.1709],
    [-18.0104, 11.4063, 13.7299],
  ],
  [
    [-18.0104, 11.4063, 13.7299],
    [-18.0104, 11.4063, 17.6216],
    [-16.9863, 10.967, 17.6216],
    [-15.4569, 11.4063, 17.6216],
  ],
  [
    [-15.4569, 11.4063, 17.6216],
    [-9.8653, 13.0121, 17.6216],
    [-7.4199, 13.6265, 17.6216],
    [-4.0498, 16.0368, 17.6216],
  ],
  [
    [-4.0498, 16.0368, 17.6216],
    [7.4644, 24.2716, 17.6216],
    [-29.9964, 20.4122, -31.8682],
    [0.0, 20.4122, -31.8682],
  ],
  [
    [0.0, 20.4122, -31.8682],
    [29.9964, 20.4122, -31.8683],
    [-7.4643, 24.2716, 17.6216],
    [4.0498, 16.0368, 17.6216],
  ],
  [
    [4.0498, 16.0368, 17.6216],
    [7.4199, 13.6265, 17.6216],
    [9.8653, 13.0121, 17.6216],
    [15.4569, 11.4063, 17.6216],
  ],
  [
    [15.4569, 11.4063, 17.6216],
    [16.9863, 10.967, 17.6216],
    [18.0104, 11.4063, 17.6216],
    [18.0104, 11.4063, 13.7299],
  ],
  [
    [18.0104, 11.4063, 13.7299],
    [18.0104, 11.4063, 13.1709],
    [18.0104, 11.4063, -38.1851],
    [18.0104, 11.4063, -38.5479],
  ],
  [
    [18.0104, 11.4063, -38.5479],
    [18.0104, 11.4063, -40.6487],
    [15.2043, 11.4063, -40.6487],
    [14.3531, 11.4063, -40.6487],
  ],
  [
    [14.3531, 11.4063, -40.6487],
    [6.1502, 11.4063, -40.6487],
    [4.2808, 9.5009, -38.589],
    [-0.8767, 6.3182, -32.8328],
  ],
  [
    [-0.8767, 6.3182, -32.8328],
    [-2.2985, 5.4408, -31.246],
    [-3.16, 3.9636, -26.6773],
    [-3.16, 3.9636, -24.1335],
  ],
  [
    [-3.16, 3.9636, -24.1335],
    [-3.16, 3.9636, -20.5057],
    [8.9216, 3.9636, -19.5964],
    [8.9216, 3.9636, -7.0829],
  ],
  [
    [8.9216, 3.9636, -7.0829],
    [8.9216, 3.9636, 2.2666],
    [9.3495, 3.9636, 14.7905],
    [0.0, 3.9636, 14.7905],
  ],
  [
    [0.0, 3.9636, 14.7905],
    [-9.3495, 3.9636, 14.7905],
    [-8.9216, 3.9636, 2.2666],
    [-8.9216, 3.9636, -7.0829],
  ],
]

function setTweenProgress(tween, elapsed, update = true) {
  tween._pauseStart = performance.now()
  tween._startTime = tween._pauseStart - elapsed
  if (!update) return tween

  let elapsedRatio = elapsed / tween._duration
  elapsedRatio = tween._duration === 0 || elapsedRatio > 1 ? 1 : elapsedRatio

  const value = tween._easingFunction(elapsedRatio)

  tween._updateProperties(tween._object, tween._valuesStart, tween._valuesEnd, value)

  if (tween._onUpdateCallback) {
    tween._onUpdateCallback(tween._object, elapsedRatio)
  }

  return tween
}

import { MotionBlurEffect, SSGIEffect, TRAAEffect, VelocityDepthNormalPass } from 'realism-effects'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import modelUrl from '../models/porsche_911_1975_comp.glb'
import { SSGIDebugGUI } from '../wip/SSGIDebugGUI'
import { TEXTURES_LIST } from '../textures/TEXTURES_LIST'
import {
  Box3,
  CircleGeometry,
  DirectionalLight,
  EquirectangularReflectionMapping,
  FloatType,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from 'three'
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  FXAAEffect,
  KernelSize,
  LUT3DEffect,
  LUT3dlLoader,
  VignetteEffect,
} from 'postprocessing'

export async function realismEffectsDemo(gui) {
  const params = {
    AA: 'fxaa',
    postprocessingEnabled: true,
  }
  let traaPass
  let fxaaPass
  let ssgiEffect
  let pane
  let envMesh
  let fps

  const scene = new Scene()

  const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 250)
  scene.add(camera)

  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.style.left = 0
  canvas.style.top = 0
  canvas.style.position = 'fixed'

  const orbitDiv = document.createElement('div')
  orbitDiv.id = 'orbitControlsDomElem'
  orbitDiv.style.position = 'absolute'
  orbitDiv.style.left = 0
  orbitDiv.style.top = 0
  orbitDiv.style.width = '100vw'
  orbitDiv.style.height = '100vh'
  orbitDiv.style.opacity = 0
  orbitDiv.style.cursor = 'grab'
  document.body.appendChild(orbitDiv)

  let rendererCanvas = canvas

  // use an offscreen canvas if available
  // if (window.OffscreenCanvas && !navigator.userAgent.toLowerCase().includes('firefox')) {
  //   rendererCanvas = canvas.transferControlToOffscreen()
  //   rendererCanvas.style = canvas.style
  //   rendererCanvas.toDataURL = canvas.toDataURL.bind(canvas)
  // }

  // Renderer
  const renderer = new WebGLRenderer({
    canvas: rendererCanvas,
    powerPreference: 'high-performance',
    premultipliedAlpha: false,
    stencil: false,
    antialias: false,
    alpha: false,
    preserveDrawingBuffer: true,
  })

  renderer.autoClear = false

  renderer.outputEncoding = sRGBEncoding

  renderer.setSize(window.innerWidth, window.innerHeight)

  const setAA = (value) => {
    composer.multisampling = 0
    composer.removePass(traaPass)
    composer.removePass(fxaaPass)

    switch (value) {
      case 'TRAA':
        composer.addPass(traaPass)
        break

      case 'FXAA':
        composer.addPass(fxaaPass)
        break

      default: {
        break
      }
    }
    console.log('composer', composer.passes)
  }

  // since using "rendererCanvas" doesn't work when using an offscreen canvas
  const controls = new OrbitControls(camera, document.querySelector('#orbitControlsDomElem'))
  controls.enableDamping = true

  const cameraY = 8.75
  camera.position.set(50, 30, 50)
  controls.target.set(0, cameraY, 0)
  controls.maxPolarAngle = Math.PI / 2
  controls.minDistance = 7.5
  window.controls = controls

  const composer = new EffectComposer(renderer)

  const lightParams = {
    yaw: 55,
    pitch: 27,
    intensity: 0,
  }

  const light = new DirectionalLight(0xffffff, lightParams.intensity)
  light.position.set(217, 43, 76)
  light.updateMatrixWorld()
  light.castShadow = true
  scene.add(light)

  renderer.shadowMap.enabled = true
  renderer.shadowMap.autoUpdate = false
  renderer.shadowMap.needsUpdate = true

  light.shadow.mapSize.width = 8192
  light.shadow.mapSize.height = 8192
  light.shadow.camera.near = 50
  light.shadow.camera.far = 500
  light.shadow.bias = -0.0001

  const s = 100

  light.shadow.camera.left = -s
  light.shadow.camera.bottom = -s
  light.shadow.camera.right = s
  light.shadow.camera.top = s

  const stats = new Stats()

  document.body.appendChild(stats.dom)

  const rgbeLoader = new RGBELoader().setDataType(FloatType)

  const initEnvMap = async (envMap) => {
    envMap.mapping = EquirectangularReflectionMapping

    scene.environment?.dispose()

    scene.environment = envMap
    scene.background = null

    envMesh?.removeFromParent()
    envMesh?.material.dispose()
    envMesh?.geometry.dispose()

    const hqImg = await new TextureLoader().loadAsync(HDRI_LIST.dry_cracked_lake.avif)
    hqImg.encoding = sRGBEncoding
    hqImg.minFilter = LinearFilter
    envMesh = new GroundProjectedEnv(hqImg)
    envMesh.radius = 100
    envMesh.height = 20
    envMesh.scale.setScalar(100)
    envMesh.updateMatrixWorld()
    scene.add(envMesh)
  }
  const setupAsset = (asset) => {
    scene.add(asset.scene)
    asset.scene.scale.setScalar(1)

    asset.scene.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = c.receiveShadow = true
        c.material.depthWrite = true
      }

      c.frustumCulled = false
    })

    const bb = new Box3()
    bb.setFromObject(asset.scene)

    const height = bb.max.y - bb.min.y
    const width = Math.max(bb.max.x - bb.min.x, bb.max.z - bb.min.z)
    const targetHeight = 15
    const targetWidth = 45

    const scaleWidth = targetWidth / width
    const scaleHeight = targetHeight / height

    asset.scene.scale.multiplyScalar(Math.min(scaleWidth, scaleHeight))

    asset.scene.updateMatrixWorld()

    bb.setFromObject(asset.scene)

    const center = new Vector3()
    bb.getCenter(center)

    center.y = bb.min.y
    asset.scene.position.sub(center)

    scene.updateMatrixWorld()

    requestAnimationFrame(refreshLighting)
  }

  const envMap = await rgbeLoader.loadAsync(HDRI_LIST.dry_cracked_lake.hdr)
  initEnvMap(envMap)
  const toRad = Math.PI / 180
  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    const dpr = window.devicePixelRatio
    renderer.setPixelRatio(fps < 256 ? Math.max(1, dpr * 0.5) : dpr)
    console.log('DPR', renderer.getPixelRatio())

    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)
  }
  const refreshLighting = () => {
    light.position.x = Math.sin(lightParams.yaw * toRad) * Math.cos(lightParams.pitch * toRad)
    light.position.y = Math.sin(lightParams.pitch * toRad)
    light.position.z = Math.cos(lightParams.yaw * toRad) * Math.cos(lightParams.pitch * toRad)
    light.position.normalize().multiplyScalar(75)
    light.updateMatrixWorld()
    renderer.shadowMap.needsUpdate = true
    console.log('refresh lighting')
  }

  const gltfLoader = new GLTFLoader()

  const draco = new DRACOLoader()
  draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  gltfLoader.setDRACOLoader(draco)
  let url = modelUrl
  const asset = await gltfLoader.loadAsync(url)
  setupAsset(asset)

  pane = gui
  gui.add(params, 'postprocessingEnabled').onChange(() => {
    refreshLighting()
  })
  gui.add(params, 'AA', ['NONE', 'TRAA', 'FXAA']).onChange((v) => {
    setAA(v)
  })

  // SSGI options
  const options = {
    distance: 2.7200000000000104,
    thickness: 1.2999999999999972,
    autoThickness: false,
    maxRoughness: 1,
    blend: 0.95,
    denoiseIterations: 3,
    denoiseKernel: 3,
    denoiseDiffuse: 25,
    denoiseSpecular: 25.54,
    depthPhi: 5,
    normalPhi: 28,
    roughnessPhi: 18.75,
    envBlur: 0.55,
    importanceSampling: true,
    directLightMultiplier: 1,
    maxEnvLuminance: 50,
    steps: 20,
    refineSteps: 4,
    spp: 1,
    resolutionScale: 1,
    missedRays: false,
  }

  const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera)
  composer.addPass(velocityDepthNormalPass)

  const bloomEffect = new BloomEffect({
    intensity: 1,
    mipmapBlur: true,
    luminanceSmoothing: 0.75,
    luminanceThreshold: 0.75,
    kernelSize: KernelSize.MEDIUM,
  })

  const vignetteEffect = new VignetteEffect({
    darkness: 0.8,
    offset: 0.3,
  })

  ssgiEffect = new SSGIEffect(scene, camera, velocityDepthNormalPass, options)

  new SSGIDebugGUI(pane, ssgiEffect, options)

  const lutTexture = await new LUT3dlLoader().load(TEXTURES_LIST.lut)

  const lutEffect = new LUT3DEffect(lutTexture)

  composer.addPass(new EffectPass(camera, ssgiEffect, bloomEffect, vignetteEffect, lutEffect))

  const motionBlurEffect = new MotionBlurEffect(velocityDepthNormalPass)
  composer.addPass(new EffectPass(camera, motionBlurEffect))

  traaPass = new EffectPass(camera, new TRAAEffect(scene, camera, velocityDepthNormalPass))

  fxaaPass = new EffectPass(camera, new FXAAEffect())

  // setAA('TRAA')
  setAA('FXAA') // FXAA gets rid of noise better ??
  resize()

  const floor = new Mesh(
    new CircleGeometry(25, 32),
    new MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0 })
  )
  floor.rotateX(-Math.PI / 2)
  floor.name = 'floor'
  floor.receiveShadow = true
  floor.position.set(0, 0.001, 0)
  scene.add(floor)

  const loop = () => {
    stats.begin()

    controls.update()
    camera.updateMatrixWorld()

    if (params.postprocessingEnabled) {
      composer.render()
    } else {
      renderer.clear()
      renderer.render(scene, camera)
    }

    stats.end()
    window.requestAnimationFrame(loop)
  }

  // event handlers
  window.addEventListener('resize', resize)

  // source: https://stackoverflow.com/a/2117523/7626841
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    )
  }

  document.addEventListener('keydown', (ev) => {
    if (document.activeElement.tagName !== 'INPUT') {
      const value = aaOptions[ev.key]

      if (value) setAA(value)
    }

    if (ev.code === 'KeyQ') {
      params.postprocessingEnabled = !params.postprocessingEnabled

      refreshLighting()
    }

    if (ev.code === 'KeyP') {
      const data = renderer.domElement.toDataURL()

      const a = document.createElement('a') // Create <a>
      a.href = data
      a.download = 'screenshot-' + uuidv4() + '.png' // File name Here
      a.click() // Downloaded file
    }
  })

  loop()
}

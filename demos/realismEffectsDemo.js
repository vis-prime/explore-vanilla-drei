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
import {
  CircleGeometry,
  EquirectangularReflectionMapping,
  FloatType,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  TextureLoader,
  WebGLRenderer,
} from 'three'
import { BloomEffect, EffectComposer, EffectPass, FXAAEffect, KernelSize } from 'postprocessing'

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

  const scene = new Scene()

  const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200)
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
  renderer.setPixelRatio(1)

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

  camera.position.set(5, 3, 5)
  controls.target.set(0, 0.1, 0)
  controls.maxPolarAngle = Math.PI / 2
  controls.minDistance = 0.1

  const composer = new EffectComposer(renderer)

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
    envMesh.radius = 20
    envMesh.height = 2
    envMesh.scale.setScalar(100)
    scene.add(envMesh)
  }

  const envMap = await rgbeLoader.loadAsync(HDRI_LIST.dry_cracked_lake.hdr)
  initEnvMap(envMap)

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    // renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)
  }

  const gltfLoader = new GLTFLoader()

  const draco = new DRACOLoader()
  draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  gltfLoader.setDRACOLoader(draco)
  let url = modelUrl
  const asset = await gltfLoader.loadAsync(url)
  scene.add(asset.scene)
  asset.scene.traverse((c) => {
    if (c.isMesh) {
      c.castShadow = c.receiveShadow = true
      c.material.depthWrite = true
    }
    c.frustumCulled = false
  })

  pane = gui
  gui.add(params, 'postprocessingEnabled')
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

  ssgiEffect = new SSGIEffect(scene, camera, velocityDepthNormalPass, options)

  new SSGIDebugGUI(pane, ssgiEffect, options)

  composer.addPass(new EffectPass(camera, ssgiEffect, bloomEffect))

  const motionBlurEffect = new MotionBlurEffect(velocityDepthNormalPass)
  composer.addPass(new EffectPass(camera, motionBlurEffect))

  traaPass = new EffectPass(camera, new TRAAEffect(scene, camera, velocityDepthNormalPass))

  fxaaPass = new EffectPass(camera, new FXAAEffect())

  // setAA('TRAA')
  setAA('FXAA') // FXAA gets rid of noise better ??
  resize()

  const floor = new Mesh(
    new CircleGeometry(5, 32),
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

  window.addEventListener('resize', resize)

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    )
  }

  document.addEventListener('keydown', (ev) => {
    if (ev.code === 'KeyQ') {
      params.postprocessingEnabled = !params.postprocessingEnabled
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

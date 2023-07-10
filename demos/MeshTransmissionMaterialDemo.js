import {
  ACESFilmicToneMapping,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
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
  MeshPhysicalMaterial,
  ShadowMaterial,
  DirectionalLight,
  VSMShadowMap,
  Clock,
  WebGLRenderTarget,
  LinearFilter,
  HalfFloatType,
  NoToneMapping,
  BackSide,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { GroundProjectedSkybox } from 'three/examples/jsm/objects/GroundProjectedSkybox'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { MeshTransmissionMaterial, MeshDiscardMaterial } from '@pmndrs/vanilla'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { MODEL_LIST } from '../models/MODEL_LIST'

let stats,
  renderer,
  raf,
  camera,
  scene,
  controls,
  gui,
  groundProjectedSkybox,
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
const rgbeLoader = new RGBELoader()
const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
let transformControls
// draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/")
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(draco)
const raycaster = new Raycaster()
const intersects = [] //raycast
let useFrame = () => {}
let sceneGui
let envObject
let pmremGenerator

export async function meshTransmissionMaterialDemo(mainGui) {
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

  pmremGenerator = new PMREMGenerator(renderer)
  pmremGenerator.compileCubemapShader()
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

  setupEnvironment()
  await loadModels()
  animate()
}

async function setupEnvironment() {
  // light
  let sunGroup = new Group()
  let sunLight = new DirectionalLight(0xffffeb, 1)
  sunLight.name = 'Dir. Light'
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
  const shadowFloor = new Mesh(new PlaneGeometry(10, 10).rotateX(-Math.PI / 2), new ShadowMaterial({}))
  shadowFloor.name = 'shadowFloor'
  shadowFloor.receiveShadow = true
  shadowFloor.position.set(0, 0, 0)
  scene.add(shadowFloor)

  /**
   * Update env
   * @param {HDRI_LIST} envDict
   * @returns
   */
  async function loadEnv(envDict) {
    if (!envDict) {
      scene.background = null
      scene.environment = null
      return
    }

    if (envDict.exr) {
      const texture = await exrLoader.loadAsync(envDict.exr)
      texture.mapping = EquirectangularReflectionMapping
      scene.environment = texture
      console.log('exr loaded')
    }

    if (envDict.hdr) {
      const texture = await rgbeLoader.loadAsync(envDict.hdr)
      texture.mapping = EquirectangularReflectionMapping
      scene.environment = texture
      console.log('exr loaded')
    }

    if (envDict.webP || envDict.avif) {
      const texture = await textureLoader.loadAsync(envDict.webP || envDict.avif)
      texture.mapping = EquirectangularReflectionMapping
      texture.colorSpace = SRGBColorSpace
      scene.background = texture
      console.log('bg loaded')

      if (params.groundProjection) loadGroundProj(params.environment)
    }

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
      if (!groundProjectedSkybox) {
        groundProjectedSkybox = new GroundProjectedSkybox(scene.background)
        groundProjectedSkybox.scale.setScalar(100)
      }
      groundProjectedSkybox.material.uniforms.map.value = scene.background
      groundProjectedSkybox.radius = envDict.groundProj.radius
      groundProjectedSkybox.height = envDict.groundProj.height
      if (!groundProjectedSkybox.parent) {
        scene.add(groundProjectedSkybox)
      }
    } else {
      if (groundProjectedSkybox && groundProjectedSkybox.parent) {
        groundProjectedSkybox.removeFromParent()
      }
    }
  }

  loadEnv(params.environment)

  sceneGui.add(params, 'environment', HDRI_LIST).onChange((v) => {
    loadEnv(v)
  })
  sceneGui.add(params, 'groundProjection').onChange((v) => {
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

  setupMTM()
}

async function setupMTM() {
  // car
  const MatOptions = {
    default: 'def',
    physical: 'phy',
    transmission: 'tra',
  }
  const generalParams = {
    carMaterial: MatOptions.default, // 'default'|'physical'|'transmission'
  }

  const mtmParams = {
    renderEachMesh: false,
    enabled: false,
    customBackground: scene.background,
    backside: true,
    thickness: 1,
    backsideThickness: 0.5,
  }

  const all_mats = []

  const gltf = await gltfLoader.loadAsync(MODEL_LIST.porsche_1975.url)
  const model = gltf.scene
  model.name = 'car'
  let carBody
  const discardMaterial = new MeshDiscardMaterial()
  const meshTransmissionMaterial = new MeshTransmissionMaterial(6, false)
  const meshPhysicalMaterial = new MeshPhysicalMaterial({
    roughness: 0,
    transmission: 1,
    thickness: 1,
  })

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.selectOnRaycast = model
      const mat = child.material
      all_mats.push({
        material: mat,
        mesh: child,
        physical: meshPhysicalMaterial,
        transmission: meshTransmissionMaterial,
      })

      if (child.name === 'body') carBody = child
    }
  })
  mainObjects.add(model)

  gui.add(generalParams, 'carMaterial', MatOptions).onChange((v) => {
    for (const dat of all_mats) {
      if (v === MatOptions.default) {
        dat.mesh.material = dat.material
        mtmParams.enabled = false
      }

      if (v === MatOptions.physical) {
        dat.mesh.material = dat.physical
        mtmParams.enabled = false
      }

      if (v === MatOptions.transmission) {
        dat.mesh.material = dat.transmission
        mtmParams.enabled = true
      }
    }
  })

  addPhysicalGui(gui, meshPhysicalMaterial)
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

  const ref = meshTransmissionMaterial
  ref.buffer = fboMain.texture
  let oldBg
  let oldTone
  let oldSide
  const state = {
    gl: renderer,
    scene,
    camera,
  }

  let meshMatArray
  const singleItemArray = [{ mesh: carBody, mat: meshTransmissionMaterial }]
  const clock = new Clock(true)
  useFrame = () => {
    if (!mtmParams.enabled) {
      return
    }

    ref.time = clock.getElapsedTime()

    if (mtmParams.renderEachMesh) {
      meshMatArray = all_mats
    } else {
      meshMatArray = singleItemArray
    }

    for (let index = 0; index < meshMatArray.length; index++) {
      const parent = all_mats[index].mesh

      if (ref.buffer === fboMain.texture) {
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
          parent.material = ref
          parent.material.buffer = fboBack.texture
          parent.material.thickness = mtmParams.backsideThickness
          parent.material.side = BackSide
        }

        // Render into the main buffer
        state.gl.setRenderTarget(fboMain)
        state.gl.render(state.scene, state.camera)

        parent.material.thickness = mtmParams.thickness
        parent.material.side = oldSide
        parent.material.buffer = fboMain.texture

        // Set old state back
        state.scene.background = oldBg
        state.gl.setRenderTarget(null)
        parent.material = ref
        state.gl.toneMapping = oldTone
      }
    }
  }
}

function addPhysicalGui(gui, mat) {
  const fol = gui.addFolder('Physical Material')
  fol.addColor(mat, 'color')
  fol.addColor(mat, 'attenuationColor')
  fol.add(mat, 'attenuationDistance', 0, 2)
  fol.add(mat, 'roughness', 0, 1)
  fol.add(mat, 'transmission', 0, 1)
  fol.add(mat, 'thickness', 0, 2)
  fol.add(mat, 'reflectivity', 0, 1)
}

function addTransmissionGui(gui, mat, mtmParams) {
  const fol = gui.addFolder('Transmission Material')
  fol.add(mtmParams, 'enabled').name('Rendering Enabled').listen()
  fol.add(mtmParams, 'backside')
  fol.add(mtmParams, 'thickness', 0, 2)
  fol.add(mtmParams, 'backsideThickness', 0, 2)

  fol.addColor(mat, 'color')
  fol.addColor(mat, 'attenuationColor')
  fol.add(mat, '_transmission', 0, 1)

  fol.add(mat, 'attenuationDistance', 0, 2)
  fol.add(mat, 'roughness', 0, 1)
  fol.add(mat, 'chromaticAberration', 0, 2)
  fol.add(mat, 'distortion', 0, 10)
  fol.add(mat, 'temporalDistortion', 0, 1)
  fol.add(mat, 'anisotropicBlur', 0, 10)
  fol.add(mat, 'reflectivity', 0, 1)

  fol.add(mtmParams, 'renderEachMesh').name('⚠ Render Each Mesh separately')
}

const color = new Color()
function getRandomHexColor() {
  return '#' + color.setHSL(Math.random(), 0.5, 0.5).getHexString()
}

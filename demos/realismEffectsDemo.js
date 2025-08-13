// import {
//   MotionBlurEffect,
//   SSDGIEffect,
//   SSGIEffect,
//   SSREffect,
//   TRAAEffect,
//   VelocityDepthNormalPass,
// } from 'realism-effects'
// import Stats from 'three/examples/jsm/libs/stats.module'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { SSGIDebugGUI } from '../wip/SSGIDebugGUI'
// import {
//   CircleGeometry,
//   Mesh,
//   MeshStandardMaterial,
//   PerspectiveCamera,
//   Scene,
//   SRGBColorSpace,
//   WebGLRenderer,
// } from 'three'
// import { BloomEffect, EffectComposer, EffectPass, FXAAEffect, KernelSize, RenderPass } from 'postprocessing'
// import { BG_ENV } from './BG_ENV'
// import { MODEL_LIST } from '../models/MODEL_LIST'

// export async function realismEffectsDemoDISABLE(gui) {
//   const params = {
//     gi: 'SSGI',
//     AA: 'FXAA',
//     motionBlur: true,
//     bloom: true,
//     postprocessingEnabled: true,
//     groundProjection: true,
//   }

//   const scene = new Scene()

//   const camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.5, 200)
//   scene.add(camera)

//   const bgEnv = new BG_ENV(scene)
//   bgEnv.useFullFloat()
//   bgEnv.setEnvType('HDRI')
//   bgEnv.setBGType('GroundProjection')
//   bgEnv.updateAll()
//   bgEnv.addGui(gui).open()

//   const canvas = document.createElement('canvas')
//   document.body.appendChild(canvas)
//   canvas.style.left = 0
//   canvas.style.top = 0
//   canvas.style.position = 'fixed'

//   const orbitDiv = document.createElement('div')
//   orbitDiv.id = 'orbitControlsDomElem'
//   orbitDiv.style.position = 'absolute'
//   orbitDiv.style.left = 0
//   orbitDiv.style.top = 0
//   orbitDiv.style.width = '100vw'
//   orbitDiv.style.height = '100vh'
//   orbitDiv.style.opacity = 0
//   orbitDiv.style.cursor = 'grab'
//   document.body.appendChild(orbitDiv)

//   let rendererCanvas = canvas

//   // use an offscreen canvas if available
//   // if (window.OffscreenCanvas && !navigator.userAgent.toLowerCase().includes('firefox')) {
//   //   rendererCanvas = canvas.transferControlToOffscreen()
//   //   rendererCanvas.style = canvas.style
//   //   rendererCanvas.toDataURL = canvas.toDataURL.bind(canvas)
//   // }

//   // Renderer
//   const renderer = new WebGLRenderer({
//     canvas: rendererCanvas,
//     powerPreference: 'high-performance',
//     premultipliedAlpha: false,
//     stencil: false,
//     antialias: false,
//     alpha: false,
//     preserveDrawingBuffer: true,
//   })

//   renderer.autoClear = false

//   renderer.outputColorSpace = SRGBColorSpace

//   renderer.setSize(window.innerWidth, window.innerHeight)
//   // renderer.setPixelRatio(1)

//   // since using "rendererCanvas" doesn't work when using an offscreen canvas
//   const controls = new OrbitControls(camera, document.querySelector('#orbitControlsDomElem'))
//   controls.enableDamping = true

//   camera.position.set(5, 3, 5)
//   controls.target.set(0, 0.1, 0)
//   controls.maxPolarAngle = Math.PI / 2
//   controls.minDistance = 0.1

//   const composer = new EffectComposer(renderer)

//   const stats = new Stats()

//   document.body.appendChild(stats.dom)

//   const resize = () => {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     composer.setSize(window.innerWidth, window.innerHeight)
//   }

//   const gltfLoader = new GLTFLoader()

//   const draco = new DRACOLoader()
//   draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
//   gltfLoader.setDRACOLoader(draco)
//   let url = MODEL_LIST.porsche_1975.url
//   const asset = await gltfLoader.loadAsync(url)
//   scene.add(asset.scene)
//   asset.scene.traverse((c) => {
//     if (c.isMesh) {
//       c.castShadow = c.receiveShadow = true
//       c.material.depthWrite = true
//     }
//   })

//   // SSGI options
//   const options = {
//     distance: 3,
//     thickness: 3,
//     autoThickness: false,
//     maxRoughness: 1,
//     blend: 0.95,
//     denoiseIterations: 3,
//     denoiseKernel: 3,
//     denoiseDiffuse: 25,
//     denoiseSpecular: 25.54,
//     depthPhi: 5,
//     normalPhi: 28,
//     roughnessPhi: 18.75,
//     envBlur: 0.55,
//     importanceSampling: true,
//     directLightMultiplier: 1,
//     maxEnvLuminance: 50,
//     steps: 20,
//     refineSteps: 4,
//     spp: 1,
//     resolutionScale: 1,
//     missedRays: false,
//   }

//   const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera)

//   const bloomEffect = new BloomEffect({
//     intensity: 1,
//     mipmapBlur: true,
//     luminanceSmoothing: 0.75,
//     luminanceThreshold: 0.75,
//     kernelSize: KernelSize.MEDIUM,
//   })

//   const renderPass = new RenderPass(scene, camera)

//   const ssgiEffect = new SSGIEffect(scene, camera, velocityDepthNormalPass, options)
//   const ssgiPass = new EffectPass(camera, ssgiEffect)
//   const ssgdiPass = new EffectPass(camera, new SSDGIEffect(scene, camera, velocityDepthNormalPass, options))
//   const ssrPass = new EffectPass(camera, new SSREffect(scene, camera, velocityDepthNormalPass, options))

//   const motionBlurEffect = new MotionBlurEffect(velocityDepthNormalPass)

//   const traaEffect = new TRAAEffect(scene, camera, velocityDepthNormalPass)
//   const traaPass = new EffectPass(camera, traaEffect)
//   const fxaaEffect = new FXAAEffect()
//   const fxaaPass = new EffectPass(camera, fxaaEffect)

//   const updateEffectsStack = () => {
//     composer.removeAllPasses()
//     composer.addPass(velocityDepthNormalPass)
//     const effectArray = []

//     // Add ssgi pass alone in a single effectPass
//     switch (params.gi) {
//       case 'SSGI': {
//         composer.addPass(ssgiPass)
//         break
//       }
//       case 'SSGDI': {
//         composer.addPass(ssgdiPass)
//         break
//       }
//       case 'SSR': {
//         composer.addPass(ssrPass)
//         break
//       }
//       default: {
//         composer.addPass(renderPass)
//         break
//       }
//     }

//     if (params.bloom) {
//       effectArray.push(bloomEffect)
//     }

//     switch (params.AA) {
//       case 'TRAA':
//         // composer.addPass(traaPass)
//         effectArray.push(traaEffect)
//         break

//       case 'FXAA':
//         composer.addPass(fxaaPass)
//         // effectArray.push(fxaaEffect)
//         break

//       default: {
//         break
//       }
//     }

//     if (params.motionBlur) {
//       effectArray.push(motionBlurEffect)
//     }

//     if (effectArray.length) {
//       composer.addPass(new EffectPass(camera, ...effectArray))
//     }

//     printAllPasses()
//   }

//   const printAllPasses = () => {
//     let str = 'ALL Passes:\n'
//     for (const [index, pass] of composer.passes.entries()) {
//       str += `${index}: ${pass.name}\n`
//       if (pass.name === 'EffectPass') {
//         for (const effect of pass.effects) {
//           str += ' -' + effect.name + '\n'
//         }
//       }

//       str += '\n'
//     }

//     console.log(str)
//   }

//   const GI_OPTIONS = ['SSGI', 'SSGDI', 'SSR', 'DEFAULT']
//   const AA_OPTIONS = ['NONE', 'TRAA', 'FXAA']
//   const folder = gui.addFolder('Post')
//   folder.open()
//   folder.add(params, 'postprocessingEnabled')
//   folder.add(params, 'gi', GI_OPTIONS).onChange(updateEffectsStack)
//   folder.add(params, 'motionBlur').onChange(updateEffectsStack)
//   folder.add(params, 'bloom').onChange(updateEffectsStack)
//   folder.add(params, 'AA', AA_OPTIONS).onChange(updateEffectsStack)
//   new SSGIDebugGUI(folder, ssgiEffect, options)

//   updateEffectsStack()

//   resize()

//   const floor = new Mesh(
//     new CircleGeometry(5, 32),
//     new MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0 })
//   )
//   floor.rotateX(-Math.PI / 2)
//   floor.name = 'floor'
//   floor.receiveShadow = true
//   floor.position.set(0, 0.001, 0)
//   scene.add(floor)

//   const loop = () => {
//     stats.begin()
//     controls.update()

//     if (params.postprocessingEnabled) {
//       composer.render()
//     } else {
//       renderer.clear()
//       renderer.render(scene, camera)
//     }

//     stats.end()
//     window.requestAnimationFrame(loop)
//   }

//   window.addEventListener('resize', resize)

//   document.addEventListener('keydown', (ev) => {
//     if (ev.code === 'KeyQ') {
//       params.postprocessingEnabled = !params.postprocessingEnabled
//     }

//     if (ev.code === 'KeyP') {
//       const data = renderer.domElement.toDataURL()

//       const a = document.createElement('a')
//       a.href = data
//       a.download = 'screenshot-' + uuidv4() + '.png'
//       a.click()
//     }
//   })

//   loop()
// }

export default async function realismEffectsDemo(gui) {
  // add a div in the center of the screen
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.top = '50%'
  div.style.left = '50%'
  div.style.transform = 'translate(-50%, -50%)'
  div.style.fontSize = '50px'
  div.style.pointerEvents = 'none'
  div.innerHTML = 'Realism Effects Demo BROKEN'
  document.body.appendChild(div)
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

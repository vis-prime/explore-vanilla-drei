import './style.css'

import { version } from './package.json'
import { GUI } from 'lil-gui'

console.log(`Link to drei-vanilla library 'https://github.com/pmndrs/drei-vanilla'`)

let url_string = window.location.href
let url = new URL(url_string)

/**
 * All Scenes
 * @enum
 */
const All_Scenes = {
  Transmission_Material: async (gui) => {
    const module = await import('./demos/MeshTransmissionMaterialDemo.js')
    module.default(gui)
  },

  PCSS: async (gui) => {
    const module = await import('./demos/PCSSDemo.js')
    module.default(gui)
  },

  Volumetric_SpotLight: async (gui) => {
    const module = await import('./demos/SpotLightDemo.js')
    module.default(gui)
  },

  Volumetric_SpotLight_Car: async (gui) => {
    const module = await import('./demos/SpotLightDemoWithCar.js')
    module.default(gui)
  },

  RealismEffects: async (gui) => {
    const module = await import('./demos/realismEffectsDemo.js')
    module.default(gui)
  },

  Caustics: async (gui) => {
    const module = await import('./demos/CausticsDemo.js')
    module.default(gui)
  },

  Reflection_Material: async (gui) => {
    const module = await import('./demos/MeshReflectorMaterialDemo.js')
    module.default(gui)
  },

  Accumulative_Shadows: async (gui) => {
    const module = await import('./demos/AccumulativeShadowsDemo.js')
    module.default(gui)
  },

  Sprite_Animator: async (gui) => {
    const module = await import('./demos/SpriteAnimatorDemo.js')
    module.default(gui)
  },

  Portal_Material: async (gui) => {
    const module = await import('./demos/MeshPortalMaterialDemo.js')
    module.default(gui)
  },

  Outlines: async (gui) => {
    const module = await import('./demos/OutlineDemo.js')
    module.default(gui)
  },

  Splat: async (gui) => {
    const module = await import('./demos/splatDemo.js')
    module.default(gui)
  },

  Transmission_Material_Basic: async (gui) => {
    const module = await import('./demos/MeshTransmissionMaterialBasicDemo.js')
    module.default(gui)
  },

  Cloud: async (gui) => {
    const module = await import('./demos/CloudDemo.js')
    module.default(gui)
  },

  Sparkles_and_Stars: async (gui) => {
    const module = await import('./demos/SparklesStarsDemo.js')
    module.default(gui)
  },
}

const wip = [
  //  meshTransmissionMaterialInstant
]

const formattedNamesDict = {}
for (const key in All_Scenes) {
  let formattedName = key.replace(/_/g, ' ')
  formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1)

  formattedNamesDict[formattedName] = key
}

const params = {
  sceneName: url.searchParams.get('scene') || Object.keys(All_Scenes)[0],
  sceneInitFunction: () => {},
}

params.sceneName = params.sceneName.replace('WIP_', '') //to make sure old shared urls still work

// to keep old urls alive
if (params.sceneName === 'MeshTransmissionMaterial1') {
  params.sceneName = 'MeshTransmissionMaterialBasic'
}

function updatePageDesc(path) {
  const paramsU = new URLSearchParams(window.location.search)
  paramsU.set('scene', path)
  window.history.replaceState({}, '', `${window.location.pathname}?${paramsU}`)
  document.title = `Explore | ${path}`
}

const title = wip.includes(All_Scenes[params.sceneName]) ? '⚠ WIP ' + version : 'Explore Drei Vanilla ' + version
const gui = new GUI({
  title: title,
  closeFolders: true,
})

if (!Object.keys(All_Scenes).includes(params.sceneName)) {
  params.sceneName = Object.keys(All_Scenes)[0]
}

gui
  .add(params, 'sceneName', formattedNamesDict)
  .name('DEMO')
  .onChange((v) => {
    updatePageDesc(v)
    window.location.reload()
  })

params.sceneInitFunction = All_Scenes[params.sceneName]
params.sceneInitFunction(gui)
updatePageDesc(params.sceneName)

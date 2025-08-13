import './style.css'

import { version } from './package.json'
import { GUI } from 'lil-gui'

let url_string = window.location.href
let url = new URL(url_string)

/**
 * All Scenes
 * @enum
 */
const All_Scenes = {
  'Transmission Material': async (gui) => {
    const module = await import('./demos/MeshTransmissionMaterialDemo.js')
    module.default(gui)
  },

  PCSS: async (gui) => {
    const module = await import('./demos/PCSSDemo.js')
    module.default(gui)
  },

  'Volumetric SpotLight': async (gui) => {
    const module = await import('./demos/SpotLightDemo.js')
    module.default(gui)
  },

  'Volumetric SpotLight Car': async (gui) => {
    const module = await import('./demos/SpotLightDemo1.js')
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

  'Reflection Material': async (gui) => {
    const module = await import('./demos/MeshReflectorMaterialDemo.js')
    module.default(gui)
  },

  'Accumulative Shadows': async (gui) => {
    const module = await import('./demos/AccumulativeShadowsDemo.js')
    module.default(gui)
  },

  'Sprite Animator': async (gui) => {
    const module = await import('./demos/SpriteAnimatorDemo.js')
    module.default(gui)
  },

  'Portal Material': async (gui) => {
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

  'Transmission Material Basic': async (gui) => {
    const module = await import('./demos/MeshTransmissionMaterialBasicDemo.js')
    module.default(gui)
  },

  Cloud: async (gui) => {
    const module = await import('./demos/CloudDemo.js')
    module.default(gui)
  },

  'Sparkles and Stars': async (gui) => {
    const module = await import('./demos/SparklesDemo.js')
    module.default(gui)
  },
}

const wip = [
  //  meshTransmissionMaterialInstant
]

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
  console.log({ path })
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
  .add(params, 'sceneName', Object.keys(All_Scenes))
  .name('SCENE')
  .onChange((v) => {
    console.log({ v })

    updatePageDesc(v)
    window.location.reload()
  })

params.sceneInitFunction = All_Scenes[params.sceneName]
await params.sceneInitFunction(gui)
updatePageDesc(params.sceneName)

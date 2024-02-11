import './style.css'

import { version } from './package.json'
import { GUI } from 'lil-gui'
import { meshTransmissionMaterialDemo } from './demos/MeshTransmissionMaterialDemo'
import { pcssDemo } from './demos/PCSSDemo'
import { spotLightDemo } from './demos/SpotLightDemo'
import { spotLightDemo1 } from './demos/SpotLightDemo1'

import { realismEffectsDemo } from './demos/realismEffectsDemo'
import { meshReflectorMaterialDemo } from './demos/MeshReflectorMaterialDemo'
import { meshTransmissionMaterialBasic } from './demos/MeshTransmissionMaterialBasicDemo'
import { CausticsDemo } from './demos/CausticsDemo'
import { AccumulativeShadowsDemo } from './demos/AccumulativeShadowsDemo'
import { SpriteAnimatorDemo } from './demos/SpriteAnimatorDemo'
import { meshPortalMaterialDemo } from './demos/MeshPortalMaterialDemo'
// import { meshTransmissionMaterialInstant } from './demos/MeshTransmissionMaterialInstantDemo'
import { OutlinesDemo } from './demos/OutlineDemo'
import { SplatDemo } from './demos/splatDemo'

let url_string = window.location.href
let url = new URL(url_string)

/**
 * All Scenes
 * @enum
 */
const All_Scenes = {
  MeshTransmissionMaterial: meshTransmissionMaterialDemo,

  PCSS: pcssDemo,
  SpotLight: spotLightDemo,
  SpotLight1: spotLightDemo1,
  RealismEffects: realismEffectsDemo,
  Caustics: CausticsDemo,
  MeshReflectionMaterial: meshReflectorMaterialDemo,
  AccumulativeShadows: AccumulativeShadowsDemo,
  SpriteAnimator: SpriteAnimatorDemo,
  MeshPortalMaterial: meshPortalMaterialDemo,
  Outlines: OutlinesDemo,
  Splat: SplatDemo,

  MeshTransmissionMaterialBasic: meshTransmissionMaterialBasic,
  // MeshTransmissionMaterialInstant: meshTransmissionMaterialInstant,
}

const wip = [
  meshPortalMaterialDemo,
  SpriteAnimatorDemo,
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
params.sceneInitFunction(gui)
updatePageDesc(params.sceneName)

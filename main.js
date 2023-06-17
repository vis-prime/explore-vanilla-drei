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

let url_string = window.location.href
let url = new URL(url_string)

/**
 * All Scenes
 * @enum
 */
const All_Scenes = {
  MeshTransmissionMaterial: meshTransmissionMaterialDemo,
  MeshTransmissionMaterialBasic: meshTransmissionMaterialBasic,

  PCSS: pcssDemo,
  SpotLight: spotLightDemo,
  SpotLight1: spotLightDemo1,
  RealismEffects: realismEffectsDemo,
  Caustics: CausticsDemo,

  MeshReflectionMaterial: meshReflectorMaterialDemo,
  AccumulativeShadows: AccumulativeShadowsDemo,
  SpriteAnimator: SpriteAnimatorDemo,
  MeshPortalMaterial: meshPortalMaterialDemo,
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
  console.log({ path })
  const paramsU = new URLSearchParams(window.location.search)
  paramsU.set('scene', path)
  window.history.replaceState({}, '', `${window.location.pathname}?${paramsU}`)
  document.title = `Explore | ${path}`
}

const gui = new GUI({
  title: 'Explore Drei Vanilla' + version,
  closeFolders: true,
})

gui
  .add(params, 'sceneName', Object.keys(All_Scenes))
  .name('SCENE')
  .onChange((v) => {
    console.log({ v })

    updatePageDesc(v)
    window.location.reload()
  })

if (!Object.keys(All_Scenes).includes(params.sceneName)) {
  params.sceneName = Object.keys(All_Scenes)[0]
}

params.sceneInitFunction = All_Scenes[params.sceneName]
params.sceneInitFunction(gui)
updatePageDesc(params.sceneName)

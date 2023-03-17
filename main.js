import './style.css'

import { version } from './package.json'
import { GUI } from 'lil-gui'
import { meshTransmissionMaterialDemo } from './demos/MeshTransmissionMaterialDemo'
import { pcssDemo } from './demos/PCSSDemo'
import { spotLightDemo } from './demos/SpotLightDemo'
import { spotLightDemo1 } from './demos/SpotLightDemo1'

import { realismEffectsDemo } from './demos/realismEffectsDemo'
import { meshReflectorMaterialDemo } from './demos/MeshReflectorMaterialDemo'
import { meshTransmissionMaterialDemo1 } from './demos/MeshTransmissionMaterialDemo1'

let url_string = window.location.href
let url = new URL(url_string)

/**
 * All Scenes
 * @enum
 */
const All_Scenes = {
  MeshTransmissionMaterial: meshTransmissionMaterialDemo,
  MeshTransmissionMaterial1: meshTransmissionMaterialDemo1,

  PCSS: pcssDemo,
  WIP_SpotLight: spotLightDemo,
  WIP_SpotLight1: spotLightDemo1,
  RealismEffects: realismEffectsDemo,

  WIP_MeshReflectionMaterial: meshReflectorMaterialDemo,
}

const params = {
  sceneName: url.searchParams.get('scene') || Object.keys(All_Scenes)[0],
  sceneInitFunction: () => {},
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

import "./style.css"

import { version } from "./package.json"
import { GUI } from "lil-gui"
import { meshTransmissionMaterialDemo } from "./demos/MeshTransmissionMaterialDemo"

let url_string = window.location.href
let url = new URL(url_string)

/**
 * All Scenes
 * @enum
 */
const All_Scenes = {
  MeshTransmissionMaterial: meshTransmissionMaterialDemo,
  PCSS: () => {
    console.log("pcss init")
  },
}

const params = {
  sceneName: url.searchParams.get("scene") || Object.keys(All_Scenes)[0],
  sceneInitFunction: () => {},
}

function updatePageDesc(path) {
  console.log({ path })
  const paramsU = new URLSearchParams(window.location.search)
  paramsU.set("scene", path)
  window.history.replaceState({}, "", `${window.location.pathname}?${paramsU}`)
  document.title = `Test | ${path}`
}
const gui = new GUI({
  title: "Test Vanilla " + version,
  closeFolders: true,
})

gui
  .add(params, "sceneName", Object.keys(All_Scenes))
  .name("SCENE")
  .onChange((v) => {
    console.log({ v })

    updatePageDesc(v)
    window.location.reload()
  })

params.sceneInitFunction = All_Scenes[params.sceneName]
params.sceneInitFunction(gui)
updatePageDesc(params.sceneName)

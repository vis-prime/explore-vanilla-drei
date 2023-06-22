import monkey_url from './monkey_comp.glb?url'
import pole_url from './pole_comp.glb?url'
import porsche_url from './porsche_911_1975_comp.glb?url'
import road_url from './road_comp.glb?url'
import room_url from './room_comp.glb?url'
import vase_url from './vase_2k_comp.glb?url'
import bunny_url from './stanford _bunny_comp.glb?url'
import bunny_drei_url from './bunny-transformed.glb?url'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const gltfLoader = new GLTFLoader()
const draco = new DRACOLoader()
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(draco)

/**
 * Vite friendly Model urls
 * @enum
 */
export const MODEL_LIST = {
  monkey: {
    url: monkey_url,
  },
  pole: {
    url: pole_url,
  },
  porsche_1975: {
    url: porsche_url,
  },
  road: {
    url: road_url,
  },
  room: {
    url: room_url,
  },
  vase: {
    url: vase_url,
  },
  bunny: {
    url: bunny_url,
  },
  bunnyDrei: {
    url: bunny_drei_url,
  },
}

/**
 * Gltf Draco Loader
 * @param {String} url
 * @returns {Object}
 * @enum
 */
export const MODEL_LOADER = async (url) => {
  return await gltfLoader.loadAsync(url)
}

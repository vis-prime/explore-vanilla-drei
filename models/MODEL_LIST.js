import monkey_url from './monkey_comp.glb?url'
import pole_url from './pole_comp.glb?url'
import porsche_url from './porsche_911_1975_comp.glb?url'
import road_url from './road_comp.glb?url'
import room_url from './room_comp.glb?url'
import vase_url from './vase_2k_comp.glb?url'
import bunny_url from './stanford _bunny_comp.glb?url'
import bunny_drei_url from './bunny-transformed.glb?url'
import hintze_hall_url from './hintze_hall_2k_comp.glb?url'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { LoadingHelper } from '../demos/LoadingHelper'

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
  hintze_hall: {
    url: hintze_hall_url,
  },
}

/**
 * Loads a GLTF model using the Draco Loader.
 * @async
 * @enum MODEL_LOADER
 * @param {string} url - The URL of the GLTF model to load.
 * @param {Object} options - Additional options for loading.
 * @param {LoadingHelper} [options.loadingHelper] - Optional helper for tracking loading progress.
 * @returns {Promise<import("three/examples/jsm/loaders/GLTFLoader").GLTF>} A promise that resolves with the loaded GLTF scene or object.
 */
export const MODEL_LOADER = async (url, { loadingHelper } = {}) => {
  loadingHelper?.setGlobalProgress(url, 0)
  return await gltfLoader.loadAsync(url, (e) => {
    loadingHelper?.setGlobalProgress(url, e.loaded / e.total)
  })
}

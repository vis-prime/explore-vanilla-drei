import GUI from 'lil-gui'
import {
  DirectionalLight,
  EquirectangularReflectionMapping,
  Vector3,
  Group,
  Mesh,
  ShadowMaterial,
  PlaneGeometry,
  Color,
  FloatType,
  HalfFloatType,
  TextureLoader,
  SRGBColorSpace,
  LinearFilter,
  Scene,
  FileLoader,
} from 'three'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GroundProjectedSkybox } from '../hdri/GroundProjectedSkybox'
import { HDRI_LIST } from '../hdri/HDRI_LIST'
import { LoadingHelper } from './LoadingHelper'

const fileLoader = new FileLoader()
fileLoader.setResponseType('blob')
const textureLoader = new TextureLoader()
const exrLoader = new EXRLoader()
const rgbeLoader = new RGBELoader()

/**
 * @typedef {Object} BgOptions
 * @property {null} None
 * @property {string} Color
 * @property {string} Default
 * @property {string} GroundProjection
 */

/** @type {BgOptions} */
export const BG_OPTIONS = {
  None: null,
  Color: 'color',
  Default: 'default',
  GroundProjection: 'gp',
}

/**
 * @typedef {Object} EnvOptions
 * @property {null} None
 * @property {string} HDRI
 */

/** @type {EnvOptions} */
const ENV_OPTIONS = {
  None: null,
  HDRI: 'hdri',
}

export class BG_ENV {
  /**
   * S
   * @param {Scene} scene
   * @param {Object} options
   * @param {LoadingHelper} options.loadingHelper
   */
  constructor(scene, { loadingHelper } = {}) {
    this.scene = scene
    this.loadingHelper = loadingHelper

    this.preset = Object.values(HDRI_LIST)[0]

    /**
     * The type of environment to use.
     * @type {EnvOptions}
     */
    this.environmentType = ENV_OPTIONS.None
    this.backgroundType = BG_OPTIONS.GroundProjection

    this.gpRadius = 10
    this.gpHeight = 1

    this.bgColor = new Color('#ffffff')

    this.sunEnabled
    this.sunPivot
    this.sunLight
    this.sunPos = new Vector3(1, 1, 1)
    this.sunColor = new Color('#ffffff')

    this.shadowFloorEnabled
    this.shadowFloor
    this.shadowOpacity = 1

    this.envTexture
    this.bgTexture

    this.groundProjectedSkybox

    this.envCache = {}
    this.bgCache = {}

    /**
     * gui
     * @type {GUI} gui
     */
    this.guiFolder = null
  }
  init() {
    // sun light
    if (this.sunEnabled && !this.sunPivot) {
      this.sunPivot = new Group()
      this.sunPivot.name = 'sun_pivot'
      this.sunLight = new DirectionalLight(0xffffeb, 1)
      this.sunLight.name = 'sun'
      this.sunLight.color = this.sunColor
      this.sunLight.castShadow = true
      this.sunLight.shadow.camera.near = 0.1
      this.sunLight.shadow.camera.far = 50
      this.sunLight.shadow.camera.right = 15
      this.sunLight.shadow.camera.left = -15
      this.sunLight.shadow.camera.top = 15
      this.sunLight.shadow.camera.bottom = -15
      this.sunLight.shadow.mapSize.width = 1024
      this.sunLight.shadow.mapSize.height = 1024
      this.sunLight.shadow.radius = 1.95
      this.sunLight.shadow.blurSamples = 6
      sunLight.shadow.bias = -0.0005
      this.sunPivot.add(sunLight)
    }

    //   floor
    if (this.shadowFloorEnabled && !this.shadowFloor) {
      this.shadowFloor = new Mesh(
        new PlaneGeometry(10, 10).rotateX(-Math.PI / 2),
        new ShadowMaterial({ opacity: this.shadowOpacity })
      )
      this.shadowFloor.name = 'shadow_floor'
      this.shadowFloor.receiveShadow = true
      this.shadowFloor.position.set(0, 0.001, 0)
    }
  }

  /**
   * Set env type
   * @param {keyof ENV_OPTIONS} key
   */
  setEnvType(key) {
    this.environmentType = ENV_OPTIONS[key]
  }

  /**
   * Set BG type
   * @param {keyof BG_OPTIONS} key
   */
  setBGType(key) {
    this.backgroundType = BG_OPTIONS[key]
  }

  useFullFloat() {
    exrLoader.setDataType(FloatType)
    rgbeLoader.setDataType(FloatType)
  }

  /**
   * Add gui
   * @param {GUI} gui
   */
  addGui(gui) {
    const folder = gui.addFolder('BG & ENV')
    this.guiFolder = folder
    folder.add(this, 'preset', HDRI_LIST).onChange((v) => {
      this.preset = v
      this.updateAll()
    })

    folder.add(this, 'environmentType', ENV_OPTIONS).onChange(() => {
      this.updateAll()
    })
    folder.add(this, 'backgroundType', BG_OPTIONS).onChange((v) => {
      this.updateAll()

      if (v === BG_OPTIONS.Color) {
        this.bgColorPicker = folder.addColor(this, 'bgColor')
      } else {
        this.bgColorPicker?.destroy()
        this.bgColorPicker = null
      }
    })

    return folder
  }

  /**
   * Download if needed
   * @param {HDRI_LIST} data
   */
  async updateAll() {
    const data = this.preset
    this.init()
    // console.log(this)

    await Promise.all([this.downloadEnvironment(data), this.downloadBackground(data)])

    this.scene.environment = this.envTexture

    if (!this.bgTexture) {
      this.scene.background = null
      if (this.backgroundType === BG_OPTIONS.Color) {
        this.scene.background = this.bgColor
      }
    }

    if (this.backgroundType === BG_OPTIONS.GroundProjection && this.bgTexture) {
      this.scene.background = null

      if (!this.groundProjectedSkybox) {
        this.groundProjectedSkybox = new GroundProjectedSkybox(this.bgTexture)
        this.groundProjectedSkybox.scale.setScalar(100)
      }

      if (data.groundProj.radius) this.gpRadius = data.groundProj.radius

      if (data.groundProj.height) this.gpHeight = data.groundProj.height
      this.bgTexture.minFilter = LinearFilter
      this.groundProjectedSkybox.material.uniforms.map.value = this.bgTexture
      this.groundProjectedSkybox.radius = this.gpRadius
      this.groundProjectedSkybox.height = this.gpHeight

      this.scene.add(this.groundProjectedSkybox)
    } else {
      if (this.groundProjectedSkybox?.parent) {
        this.groundProjectedSkybox.removeFromParent()
      }

      switch (this.backgroundType) {
        case BG_OPTIONS.Default: {
          this.scene.background = this.bgTexture
          break
        }

        case BG_OPTIONS.Color: {
          this.scene.background = this.bgColor
          break
        }

        default: {
          this.scene.background = null
          break
        }
      }
    }
  }

  /**
   * Download Env
   * @param {Object} param0
   */
  async downloadEnvironment({ exr, hdr } = {}) {
    const key = exr || hdr

    if (this.environmentType === ENV_OPTIONS.None) {
      this.envTexture = null
      return
    }

    let texture = this.envCache[key]

    if (!texture) {
      texture = exr
        ? await exrLoader.loadAsync(key, (e) => this.loadingHelper?.setGlobalProgress(key, e.loaded / e.total))
        : await rgbeLoader.loadAsync(key, (e) => this.loadingHelper?.setGlobalProgress(key, e.loaded / e.total))
      this.envCache[key] = texture
      texture.mapping = EquirectangularReflectionMapping
    }

    this.envTexture = texture
  }

  async downloadBackground({ webP, avif } = {}) {
    const key = webP || avif
    if (!(this.backgroundType === BG_OPTIONS.Default || this.backgroundType === BG_OPTIONS.GroundProjection)) {
      this.bgTexture = null
      return
    }

    if (key) {
      let texture = this.bgCache[key]
      if (!texture) {
        const blob = await fileLoader.loadAsync(key, (e) =>
          this.loadingHelper?.setGlobalProgress(key, e.loaded / e.total)
        )
        const objUrl = URL.createObjectURL(blob)
        // Load the texture using the generated blob URL
        texture = await textureLoader.loadAsync(objUrl)
        URL.revokeObjectURL(objUrl)
        this.bgCache[key] = texture
        texture.mapping = EquirectangularReflectionMapping
        texture.colorSpace = SRGBColorSpace
      }

      this.bgTexture = texture
    }
  }

  async setupEnvironment() {
    // light

    //   scene.add(this.shadowFloor)

    loadEnv(this.environmentType)
  }

  /**
   * Update env
   * @param {HDRI_LIST} envDict
   * @returns
   * @deprecated
   */
  async loadEnv(envDict) {
    if (!envDict) {
      scene.background = null
      scene.environment = null
      return
    }

    const loadExr = async () => {
      if (!envDict.exr) return
      const texture = await exrLoader.loadAsync(envDict.exr, (e) =>
        this.loadingHelper?.setGlobalProgress(envDict.exr, e.loaded / e.total)
      )
      texture.mapping = EquirectangularReflectionMapping
      scene.environment = texture
      console.log('exr loaded')
    }

    const loadHdr = async () => {
      if (!envDict.hdr) return
      const texture = await rgbeLoader.loadAsync(envDict.hdr, (e) =>
        this.loadingHelper?.setGlobalProgress(envDict.hdr, e.loaded / e.total)
      )
      texture.mapping = EquirectangularReflectionMapping
      scene.environment = texture
      console.log('hdr loaded')
    }

    const loadImg = async () => {
      const imgUrl = envDict.webP || envDict.avif
      if (imgUrl) {
        const blob = await fileLoader.loadAsync(imgUrl, (e) =>
          this.loadingHelper?.setGlobalProgress(imgUrl, e.loaded / e.total)
        )

        const objUrl = URL.createObjectURL(blob)
        // Load the texture using the generated blob URL
        const texture = await textureLoader.loadAsync(objUrl)
        URL.revokeObjectURL(objUrl)

        texture.mapping = EquirectangularReflectionMapping
        texture.colorSpace = SRGBColorSpace
        scene.background = texture

        console.log('Background loaded')

        if (params.groundProjection) loadGroundProj(params.environment)
      }
    }

    await Promise.all([loadExr(), loadHdr(), loadImg()])

    if (envDict.sunPos) {
      sunLight.visible = true
      sunLight.position.fromArray(envDict.sunPos)
    } else {
      sunLight.visible = false
    }

    if (envDict.sunColor) {
      sunLight.color.set(envDict.sunColor)
    } else {
      sunLight.color.set(0xffffff)
    }

    // if (envDict.shadowOpacity) {
    //   shadowFloor.material.opacity = envDict.shadowOpacity
    // }
  }
}

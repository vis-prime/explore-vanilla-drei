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
  sRGBEncoding,
  LinearFilter,
} from 'three'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'
import { HDRI_LIST } from '../hdri/HDRI_LIST'

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
  constructor(scene) {
    this.scene = scene

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

    this.groundProjectedEnv

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

      if (!this.groundProjectedEnv) {
        this.groundProjectedEnv = new GroundProjectedEnv(this.bgTexture)
        this.groundProjectedEnv.scale.setScalar(100)
      }

      if (data.groundProj.radius) this.gpRadius = data.groundProj.radius

      if (data.groundProj.height) this.gpHeight = data.groundProj.height
      this.bgTexture.minFilter = LinearFilter
      this.groundProjectedEnv.material.uniforms.map.value = this.bgTexture
      this.groundProjectedEnv.radius = this.gpRadius
      this.groundProjectedEnv.height = this.gpHeight

      this.scene.add(this.groundProjectedEnv)
    } else {
      if (this.groundProjectedEnv?.parent) {
        this.groundProjectedEnv.removeFromParent()
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
    console.log('download env')
    const key = exr || hdr

    if (this.environmentType === ENV_OPTIONS.None) {
      this.envTexture = null
      return
    }

    let texture = this.envCache[key]
    if (!texture) {
      texture = exr ? await exrLoader.loadAsync(key) : await rgbeLoader.loadAsync(key)
      this.envCache[key] = texture
      texture.mapping = EquirectangularReflectionMapping
    }

    this.envTexture = texture
  }

  async downloadBackground({ webP, avif } = {}) {
    console.log('download bg')
    const key = webP || avif
    if (!(this.backgroundType === BG_OPTIONS.Default || this.backgroundType === BG_OPTIONS.GroundProjection)) {
      this.bgTexture = null
      return
    }

    if (key) {
      let texture = this.bgCache[key]
      if (!texture) {
        texture = await textureLoader.loadAsync(key)
        this.bgCache[key] = texture
        texture.mapping = EquirectangularReflectionMapping
        texture.encoding = sRGBEncoding
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

    if (envDict.exr) {
      const texture = await exrLoader.loadAsync(envDict.exr)
      texture.mapping = EquirectangularReflectionMapping
      scene.environment = texture
      env = texture
      console.log('exr loaded')
    }

    if (envDict.hdr) {
      const texture = await rgbeLoader.loadAsync(envDict.hdr)
      texture.mapping = EquirectangularReflectionMapping
      scene.environment = texture
      bg = texture
      console.log('exr loaded')
    }

    if (envDict.webP || envDict.avif) {
      const texture = await textureLoader.loadAsync(envDict.webP || envDict.avif)
      texture.mapping = EquirectangularReflectionMapping
      texture.encoding = sRGBEncoding
      scene.background = texture
      console.log('bg loaded')

      if (params.groundProjection) loadGroundProj(params.environment)
    }

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

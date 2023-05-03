import * as THREE from 'three'
// import * as React from 'react'
// import { extend, ReactThreeFiber, useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial, MeshDiscardMaterial } from '@pmndrs/vanilla'

function isLight(object: any): object is THREE.Light {
  return object.isLight
}

function isGeometry(object: any): object is THREE.Mesh {
  return !!object.geometry
}

export type AccumulativeShadowsProps = {
  /** How many frames it can render, more yields cleaner results but takes more time, 40 */
  frames?: number
  /** If frames === Infinity blend controls the refresh ratio, 100 */
  blend?: number
  /** Can limit the amount of frames rendered if frames === Infinity, usually to get some performance back once a movable scene has settled, Infinity */
  limit?: number
  /** Scale of the plane,  */
  scale?: number
  /** Temporal accumulates shadows over time which is more performant but has a visual regression over instant results, false  */
  temporal?: boolean
  /** Opacity of the plane, 1 */
  opacity?: number
  /** Discards alpha pixels, 0.65 */
  alphaTest?: number
  /** Shadow color, black */
  color?: string
  /** ColorBlend, how much colors turn to black, 0 is black, 2 */
  colorBlend?: number
  /** Buffer resolution, 1024 */
  resolution?: number
  /** Texture tonemapping */
  toneMapped?: boolean
}

type SoftShadowMaterialProps = {
  map: THREE.Texture
  color?: THREE.Color
  alphaTest?: number
  blend?: number
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      softShadowMaterial: JSX.IntrinsicElements['shaderMaterial'] & SoftShadowMaterialProps
    }
  }
}

const SoftShadowMaterial = shaderMaterial(
  {
    color: new THREE.Color(),
    blend: 2.0,
    alphaTest: 0.75,
    opacity: 0,
    map: null,
  },
  `varying vec2 vUv;
   void main() {
     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
     vUv = uv;
   }`,
  `varying vec2 vUv;
   uniform sampler2D map;
   uniform vec3 color;
   uniform float opacity;
   uniform float alphaTest;
   uniform float blend;
   void main() {
     vec4 sampledDiffuseColor = texture2D(map, vUv);
     gl_FragColor = vec4(color * sampledDiffuseColor.r * blend, max(0.0, (1.0 - (sampledDiffuseColor.r + sampledDiffuseColor.g + sampledDiffuseColor.b) / alphaTest)) * opacity);
     #include <tonemapping_fragment>
     #include <encodings_fragment>
   }`
)

export type RandomizedLightProps = {
  /** How many frames it will jiggle the lights, 1.
   *  Frames is context aware, if a provider like AccumulativeShadows exists, frames will be taken from there!  */
  frames?: number
  /** Light position, [0, 0, 0] */
  position?: [x: number, y: number, z: number]
  /** Radius of the jiggle, higher values make softer light, 5 */
  radius?: number
  /** Amount of lights, 8 */
  amount?: number
  /** Light intensity, 1 */
  intensity?: number
  /** Ambient occlusion, lower values mean less AO, hight more, you can mix AO and directional light, 0.5 */
  ambient?: number
  /** If the lights cast shadows, this is true by default */
  castShadow?: boolean
  /** Default shadow bias, 0 */
  bias?: number
  /** Default map size, 512 */
  mapSize?: number
  /** Default size of the shadow camera, 10 */
  size?: number
  /** Default shadow camera near, 0.5 */
  near?: number
  /** Default shadow camera far, 500 */
  far?: number
}

// Based on "Progressive Light Map Accumulator", by [zalo](https://github.com/zalo/)
class ProgressiveLightMap {
  renderer: THREE.WebGLRenderer
  res: number
  scene: THREE.Scene
  object: THREE.Mesh | null
  buffer1Active: boolean
  progressiveLightMap1: THREE.WebGLRenderTarget
  progressiveLightMap2: THREE.WebGLRenderTarget
  discardMat: THREE.ShaderMaterial
  targetMat: THREE.MeshLambertMaterial
  previousShadowMap: { value: THREE.Texture }
  averagingWindow: { value: number }
  clearColor: THREE.Color
  clearAlpha: number
  lights: { object: THREE.Light; intensity: number }[]
  meshes: { object: THREE.Mesh; material: THREE.Material | THREE.Material[] }[]

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, res: number = 1024) {
    this.renderer = renderer
    this.res = res
    this.scene = scene
    this.buffer1Active = false
    this.lights = []
    this.meshes = []
    this.object = null
    this.clearColor = new THREE.Color()
    this.clearAlpha = 0

    // Create the Progressive LightMap Texture
    const format = /(Android|iPad|iPhone|iPod)/g.test(navigator.userAgent) ? THREE.HalfFloatType : THREE.FloatType
    this.progressiveLightMap1 = new THREE.WebGLRenderTarget(this.res, this.res, {
      type: format,
    })
    this.progressiveLightMap2 = new THREE.WebGLRenderTarget(this.res, this.res, {
      type: format,
    })

    // Inject some spicy new logic into a standard phong material
    this.discardMat = new MeshDiscardMaterial()
    this.targetMat = new THREE.MeshLambertMaterial({ fog: false })
    this.previousShadowMap = { value: this.progressiveLightMap1.texture }
    this.averagingWindow = { value: 100 }
    this.targetMat.onBeforeCompile = (shader) => {
      // Vertex Shader: Set Vertex Positions to the Unwrapped UV Positions
      shader.vertexShader =
        'varying vec2 vUv;\n' +
        shader.vertexShader.slice(0, -1) +
        'vUv = uv; gl_Position = vec4((uv - 0.5) * 2.0, 1.0, 1.0); }'

      // Fragment Shader: Set Pixels to average in the Previous frame's Shadows
      const bodyStart = shader.fragmentShader.indexOf('void main() {')
      shader.fragmentShader =
        'varying vec2 vUv;\n' +
        shader.fragmentShader.slice(0, bodyStart) +
        'uniform sampler2D previousShadowMap;\n	uniform float averagingWindow;\n' +
        shader.fragmentShader.slice(bodyStart - 1, -1) +
        `\nvec3 texelOld = texture2D(previousShadowMap, vUv).rgb;
        gl_FragColor.rgb = mix(texelOld, gl_FragColor.rgb, 1.0/ averagingWindow);
      }`

      // Set the Previous Frame's Texture Buffer and Averaging Window
      shader.uniforms.previousShadowMap = this.previousShadowMap
      shader.uniforms.averagingWindow = this.averagingWindow
    }
  }

  clear() {
    this.renderer.getClearColor(this.clearColor)
    this.clearAlpha = this.renderer.getClearAlpha()
    this.renderer.setClearColor('black', 1)
    this.renderer.setRenderTarget(this.progressiveLightMap1)
    this.renderer.clear()
    this.renderer.setRenderTarget(this.progressiveLightMap2)
    this.renderer.clear()
    this.renderer.setRenderTarget(null)
    this.renderer.setClearColor(this.clearColor, this.clearAlpha)

    this.lights = []
    this.meshes = []
    this.scene.traverse((object) => {
      if (isGeometry(object)) {
        this.meshes.push({ object, material: object.material })
      } else if (isLight(object)) {
        this.lights.push({ object, intensity: object.intensity })
      }
    })
  }

  prepare() {
    this.lights.forEach((light) => (light.object.intensity = 0))
    this.meshes.forEach((mesh) => (mesh.object.material = this.discardMat))
  }

  finish() {
    this.lights.forEach((light) => (light.object.intensity = light.intensity))
    this.meshes.forEach((mesh) => (mesh.object.material = mesh.material))
  }

  configure(object) {
    this.object = object
  }

  update(camera, blendWindow = 100) {
    if (!this.object) return
    // Set each object's material to the UV Unwrapped Surface Mapping Version
    this.averagingWindow.value = blendWindow
    this.object.material = this.targetMat
    // Ping-pong two surface buffers for reading/writing
    const activeMap = this.buffer1Active ? this.progressiveLightMap1 : this.progressiveLightMap2
    const inactiveMap = this.buffer1Active ? this.progressiveLightMap2 : this.progressiveLightMap1
    // Render the object's surface maps
    const oldBg = this.scene.background
    this.scene.background = null
    this.renderer.setRenderTarget(activeMap)
    this.previousShadowMap.value = inactiveMap.texture
    this.buffer1Active = !this.buffer1Active
    this.renderer.render(this.scene, camera)
    this.renderer.setRenderTarget(null)
    this.scene.background = oldBg
  }
}

export { SoftShadowMaterial, ProgressiveLightMap }

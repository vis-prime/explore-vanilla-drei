// Based on:
//   Kevin Kwok https://github.com/antimatter15/splat
//   Quadjr https://github.com/quadjr/aframe-gaussian-splatting
// Adapted by:
//   Paul Henschel twitter.com/0xca0a

import * as THREE from 'three'
// import { extend, useThree, useFrame, useLoader } from '@react-three/fiber'
import { SplatMaterial } from './SplatMaterial'
import { SplatLoader } from './SplatLoader'
import { SharedState, TargetMesh } from './types'

type SplatProps = {
  gl: THREE.WebGLRenderer
  camera: THREE.Camera
  src: string
  toneMapped?: boolean
  alphaTest?: number
  alphaHash?: boolean
  chunkSize?: number
}

let loader: SplatLoader
export function SplatComp({
  gl,
  camera,
  src,
  toneMapped = false,
  alphaTest = 0,
  alphaHash = false,
  chunkSize = 25000,
}: SplatProps) {
  console.log('loading', src)
  return new Promise((resolve, reject) => {
    const mesh = new THREE.Mesh()
    mesh.name = src
    const ref = <TargetMesh>mesh

    if (!loader) {
      loader = new SplatLoader()
      loader.gl = gl
    }
    loader.chunkSize = chunkSize

    let shared: SharedState

    const onLoad = (sh: SharedState) => {
      shared = sh

      console.log('loaded', src, shared)

      mesh.material = new SplatMaterial({
        transparent: !alphaHash,
        depthTest: true,
        alphaTest: alphaHash ? 0 : alphaTest,
        centerAndScaleTexture: shared.centerAndScaleTexture,
        covAndColorTexture: shared.covAndColorTexture,
        depthWrite: alphaHash ? true : alphaTest > 0,
        blending: alphaHash ? THREE.NormalBlending : THREE.CustomBlending,
        blendSrcAlpha: THREE.OneFactor,
        alphaHash: !!alphaHash,
        toneMapped: toneMapped,
      })
      shared.connect(ref)

      resolve({ mesh, update })
    }

    const onProgress = (progress) => {
      console.log(src, progress.loaded / progress.total)
    }

    loader.load(src, onLoad, onProgress)

    const update = () => {
      if (shared) {
        shared.update(ref, camera, alphaHash)
      }
    }
  })
}

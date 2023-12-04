// Based on:
//   Kevin Kwok https://github.com/antimatter15/splat
//   Quadjr https://github.com/quadjr/aframe-gaussian-splatting
// Adapted by:
//   Paul Henschel twitter.com/0xca0a

import * as THREE from 'three'
// import { extend, useThree, useFrame, useLoader } from '@react-three/fiber'
import { SplatMaterial } from './SplatMaterial'
import { SplatLoader } from './SplatLoader'
import type { TargetMesh, SharedState } from './types'

type SplatProps = {
  gl: THREE.WebGLRenderer
  camera: THREE.Camera
  src: string
  toneMapped?: boolean
  alphaTest?: number
  alphaHash?: boolean
  chunkSize?: number
}

export function SplatComp({
  gl,
  camera,
  src,
  toneMapped = false,
  alphaTest = 0,
  alphaHash = false,
  chunkSize = 25000,
}: SplatProps) {
  const mesh = new THREE.Mesh()
  mesh.frustumCulled = false
  mesh.name = src
  const ref = <TargetMesh>mesh

  const filename = src.split('/').pop()
  console.log('loading', filename)

  const spLoader = new SplatLoader()
  spLoader.gl = gl

  spLoader.chunkSize = chunkSize

  let shared: SharedState

  const onLoad = (sh: SharedState) => {
    shared = sh

    console.log('loaded', filename, shared)

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
  }

  const onProgress = (progress) => {
    console.log(filename, progress.loaded / progress.total)
  }

  spLoader.load(src, onLoad, onProgress)

  const update = () => {
    if (shared) {
      shared.update(ref, camera, alphaHash)
    }
  }

  return { mesh, update }
}

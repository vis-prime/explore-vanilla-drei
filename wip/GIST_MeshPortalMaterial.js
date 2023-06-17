// Authors:
//   N8, https://twitter.com/N8Programs
//   drcmda, https://twitter.com/0xca0a
// https://github.com/N8python/maskBlur

import * as THREE from 'three'
import * as React from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useFBO } from './useFBO'
import { RenderTexture } from './RenderTexture'
import { shaderMaterial } from './shaderMaterial'
import { FullScreenQuad } from 'three-stdlib'

const PortalMaterialImpl = shaderMaterial(
  { map: null, blend: 0, resolution: new THREE.Vector2() },
  `void main() {
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
   }`,
  `uniform sampler2D map;   
   uniform vec2 resolution;
   #include <packing>
   void main() {
     vec2 uv = gl_FragCoord.xy / resolution.xy;          
     gl_FragColor = texture2D(map, uv);
     #include <tonemapping_fragment>
     #include <encodings_fragment>
   }`
)

export const MeshPortalMaterial = React.forwardRef(
  ({ children, worldUnits = false, resolution = 512, ...props }, fref) => {
    extend({ PortalMaterialImpl })

    const ref = React.useRef(null)
    const { scene, size, viewport } = useThree()

    const [priority, setPriority] = React.useState(0)
    useFrame(() => {
      // If blend is > 0 then the portal is being entered, the render-priority must change
      const p = ref.current.blend > 0 ? 1 : 0
      if (priority !== p) setPriority(p)
    })

    React.useImperativeHandle(fref, () => ref.current)

    return (
      <portalMaterialImpl
        ref={ref}
        blur={blur}
        blend={0}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        toneMapped={false}
        attach="material"
        {...props}
      >
        <RenderTexture attach="map">
          {children}
          <ManagePortalScene rootScene={scene} priority={priority} material={ref} worldUnits={worldUnits} />
        </RenderTexture>
      </portalMaterialImpl>
    )
  }
)

function ManagePortalScene({ rootScene, material, priority, worldUnits }) {
  const scene = useThree((state) => state.scene)
  const buffer1 = useFBO()
  const buffer2 = useFBO()

  React.useLayoutEffect(() => {
    scene.matrixAutoUpdate = false
  }, [])

  const [quad, blend] = React.useMemo(() => {
    // This fullscreen-quad is used to blend the two textures
    const blend = { value: 0 }
    const quad = new FullScreenQuad(
      new THREE.ShaderMaterial({
        uniforms: {
          a: { value: buffer1.texture },
          b: { value: buffer2.texture },
          blend,
        },
        vertexShader: /*glsl*/ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,
        fragmentShader: /*glsl*/ `
          uniform sampler2D a;
          uniform sampler2D b;
          uniform float blend;
          varying vec2 vUv;
          #include <packing>
          void main() {
            vec4 ta = texture2D(a, vUv);
            vec4 tb = texture2D(b, vUv);
            gl_FragColor = mix(tb, ta, blend);
            #include <encodings_fragment>
          }`,
      })
    )
    return [quad, blend]
  }, [])

  useFrame((state) => {
    let parent = material?.current?.__r3f.parent
    if (parent) {
      // Move portal contents along with the parent if worldUnits is true
      if (!worldUnits) scene.matrixWorld.copy(parent.matrixWorld)
      else scene.matrixWorld.identity()

      // This bit is only necessary if the portal is blended, now it has a render-priority
      // and will take over the render loop
      if (priority) {
        if (material.current?.blend > 0 && material.current?.blend < 1) {
          // If blend is ongoing (> 0 and < 1) then we need to render both the root scene
          // and the portal scene, both will then be mixed in the quad from above
          blend.value = material.current.blend
          state.gl.setRenderTarget(buffer1)
          state.gl.render(scene, state.camera)
          state.gl.setRenderTarget(buffer2)
          state.gl.render(rootScene, state.camera)
          state.gl.setRenderTarget(null)
          quad.render(state.gl)
        } else if (material.current?.blend === 1) {
          // However if blend is 1 we only need to render the portal scene
          state.gl.render(scene, state.camera)
        }
      }
    }
  }, priority)
}

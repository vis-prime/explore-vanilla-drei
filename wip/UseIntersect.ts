// import { addEffect, addAfterEffect } from '@react-three/fiber'
import * as THREE from 'three'

export class useIntersect extends THREE.Object3D {
  constructor(onChange: (visible: boolean) => void) {
    super()
    let ref = { current: this }
    let check = { current: false }
    let temp = { current: false }
    let callback = onChange

    const init = () => {
      const obj = ref.current
      if (obj) {
        // Stamp out frustum check pre-emptively
        const unsub1 = addEffect(() => {
          check.current = false
          return true
        })
        // If the object is inside the frustum three will call onRender
        const oldOnRender = obj.onBeforeRender
        obj.onBeforeRender = () => (check.current = true)
        // Compare the check value against the temp value, if it differs set state
        const unsub2 = addAfterEffect(() => {
          if (check.current !== temp.current) callback.current?.((temp.current = check.current))
          return true
        })
        return () => {
          obj.onBeforeRender = oldOnRender
          unsub1()
          unsub2()
        }
      }
    }

    init()
  }
}

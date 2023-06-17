import * as THREE from 'three'

function createPortal(children, container: THREE.Object3D, state?: InjectState):  {
  return Portal({ key=container.uuid, children=children container=container, state} )
}

function Portal({
  state = {},
  children,
  container,
}: {
    children
  state?: InjectState
  container: THREE.Object3D
}): {

  const { events, size, ...rest } = state
  const previousRoot = useStore()
  const [raycaster] = React.useState(() => new THREE.Raycaster())
  const [pointer] = React.useState(() => new THREE.Vector2())

  const inject = React.useCallback(
    (rootState: RootState, injectState: RootState) => {
      const intersect: Partial<RootState> = { ...rootState } // all prev state props

      // Only the fields of "rootState" that do not differ from injectState
      // Some props should be off-limits
      // Otherwise filter out the props that are different and let the inject layer take precedence
      Object.keys(rootState).forEach((key) => {
        if (
          // Some props should be off-limits
          privateKeys.includes(key as PrivateKeys) ||
          // Otherwise filter out the props that are different and let the inject layer take precedence
          // Unless the inject layer props is undefined, then we keep the root layer
          (rootState[key as keyof RootState] !== injectState[key as keyof RootState] &&
            injectState[key as keyof RootState])
        ) {
          delete intersect[key as keyof RootState]
        }
      })

      let viewport = undefined
      if (injectState && size) {
        const camera = injectState.camera
        // Calculate the override viewport, if present
        viewport = rootState.viewport.getCurrentViewport(camera, new THREE.Vector3(), size)
        // Update the portal camera, if it differs from the previous layer
        if (camera !== rootState.camera) updateCamera(camera, size)
      }

      return {
        // The intersect consists of the previous root state
        ...intersect,
        // Portals have their own scene, which forms the root, a raycaster and a pointer
        scene: container as THREE.Scene,
        raycaster,
        pointer,
        mouse: pointer,
        // Their previous root is the layer before it
        previousRoot,
        // Events, size and viewport can be overridden by the inject layer
        events: { ...rootState.events, ...injectState?.events, ...events },
        size: { ...rootState.size, ...size },
        viewport: { ...rootState.viewport, ...viewport },
        ...rest,
      } as RootState
    },
    [state]
  )

  const [usePortalStore] = React.useState(() => {
    // Create a mirrored store, based on the previous root with a few overrides ...
    const previousState = previousRoot.getState()
    const store = create<RootState>((set, get) => ({
      ...previousState,
      scene: container as THREE.Scene,
      raycaster,
      pointer,
      mouse: pointer,
      previousRoot,
      events: { ...previousState.events, ...events },
      size: { ...previousState.size, ...size },
      ...rest,
      // Set and get refer to this root-state
      set,
      get,
      // Layers are allowed to override events
      setEvents: (events: Partial<EventManager<any>>) =>
        set((state) => ({ ...state, events: { ...state.events, ...events } })),
    }))
    return store
  })

  React.useEffect(() => {
    // Subscribe to previous root-state and copy changes over to the mirrored portal-state
    const unsub = previousRoot.subscribe((prev) => usePortalStore.setState((state) => inject(prev, state)))
    return () => {
      unsub()
      usePortalStore.destroy()
    }
  }, [])

  React.useEffect(() => {
    usePortalStore.setState((injectState) => inject(previousRoot.getState(), injectState))
  }, [inject])

  return 
  
}

export { createPortal }

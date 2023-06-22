import * as THREE from 'three'

function useFBO(width = 1024, height = 1024, settings = { samples: undefined, depth: undefined }) {
  var _width = width
  var _height = height
  var _settings = settings
  var samples = _settings.samples || 0
  var depth = _settings.depth
  var targetSettings = Object.assign({}, _settings)
  delete targetSettings.samples
  delete targetSettings.depth
  var target = new THREE.WebGLRenderTarget(
    _width,
    _height,
    Object.assign(
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        type: THREE.HalfFloatType,
      },
      targetSettings
    )
  )

  if (depth) {
    target.depthTexture = new THREE.DepthTexture(_width, _height, THREE.FloatType)
  }

  target.samples = samples

  //   useLayoutEffect(
  //     function () {
  //       target.setSize(_width, _height)

  //       if (samples) {
  //         target.samples = samples
  //       }
  //     },
  //     [samples, target, _width, _height]
  //   )

  //   useEffect(function () {
  //     return function () {
  //       target.dispose()
  //     }
  //   }, [])

  return target
}

export { useFBO }

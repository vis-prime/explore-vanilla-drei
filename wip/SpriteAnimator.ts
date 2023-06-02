import {
  RepeatWrapping,
  TextureLoader,
  Vector3,
  Object3D,
  Texture,
  Material,
  SpriteMaterial,
  Group,
  Sprite,
} from 'three'

export type SpriteAnimatorProps = {
  startFrame?: number
  endFrame?: number
  fps?: number
  frameName?: string
  textureDataURL?: string
  textureImageURL: string
  loop?: boolean
  numberOfFrames?: number
  autoPlay?: boolean
  animationNames?: Array<string>
  onStart?: Function
  onEnd?: Function
  onLoopEnd?: Function
  onFrame?: Function
  play?: boolean
  pause?: boolean
  flipX?: boolean
  position?: Array<number>
  alphaTest?: number
}

export const SpriteAnimator = ({
  startFrame,
  endFrame,
  fps,
  frameName,
  textureDataURL,
  textureImageURL,
  loop,
  numberOfFrames,
  autoPlay,
  animationNames,
  onStart,
  onEnd,
  onLoopEnd,
  onFrame,
  play,
  pause,
  flipX,
  alphaTest,
}) => {
  console.log({
    startFrame,
    endFrame,
    fps,
    frameName,
    textureDataURL,
    textureImageURL,
    loop,
    numberOfFrames,
    autoPlay,
    animationNames,
    onStart,
    onEnd,
    onLoopEnd,
    onFrame,
    play,
    pause,
    flipX,
    alphaTest,
  })
  // let textureData: Texture | null = null

  let timerOffset = window.performance.now()
  let currentFrame = startFrame || 0
  let currentFrameName = frameName || ''
  let totalFrames = 0

  const fpsInterval = 1000 / (fps || 30)
  const aspect = new Vector3(1, 1, 1)

  const flipOffset = flipX ? -1 : 1

  let spriteData = {
    frames: <any>[],
    meta: {
      version: '1.0',
      size: { w: 1, h: 1 },
      scale: '1',
    },
  }

  let isJsonReady = false
  const setJsonReady = (state: boolean) => {
    isJsonReady = state
  }
  let spriteTexture = new Texture()

  const matRef = new SpriteMaterial({
    toneMapped: false,
    transparent: true,
    map: spriteTexture,
    alphaTest: alphaTest ?? 0.0,
  })
  const spriteRef = new Sprite(matRef)
  const group = new Group()
  spriteRef.scale.copy(aspect)

  matRef.map = spriteTexture

  group.add(spriteRef)

  const setSpriteTexture = (texture: Texture) => {
    spriteTexture = texture
    if (matRef) {
      matRef.map = texture
    }
  }

  async function loadJsonAndTextureAndExecuteCallback(
    jsonUrl: string,
    textureUrl: string,
    callback: (json: any, texture: Texture) => void
  ): Promise<void> {
    const textureLoader = new TextureLoader()
    const jsonPromise = fetch(jsonUrl).then((response) => response.json())
    const texturePromise = new Promise<Texture>((resolve) => {
      textureLoader.load(textureUrl, resolve)
    })

    await Promise.all([jsonPromise, texturePromise]).then((response) => {
      callback(response[0], response[1])
    })
  }

  const calculateAspectRatio = (width: number, height: number) => {
    const aspectRatio = height / width
    spriteRef.scale.set(1, aspectRatio, 1)
    aspect.set(1, aspectRatio, 1)
  }

  // initial loads
  const init = async () => {
    if (textureDataURL && textureImageURL) {
      await loadJsonAndTextureAndExecuteCallback(textureDataURL, textureImageURL, parseSpriteData)
    } else if (textureImageURL) {
      // only load the texture, this is an image sprite only
      const textureLoader = new TextureLoader()
      const texture = await textureLoader.loadAsync(textureImageURL)
      parseSpriteData(null, texture)
    }
  }

  const onSpriteTextureChange = () => {
    modifySpritePosition()
  }

  const onPause = () => {
    if (autoPlay === false) {
      if (play) {
      }
    }
  }

  const pauseAnimation = () => {
    pause = true
  }

  const playAnimation = () => {
    play = true
    pause = false
  }

  const onFrameNameChange = () => {
    if (currentFrameName !== frameName && frameName) {
      currentFrame = 0
      currentFrameName = frameName
    }
  }

  const parseSpriteData = (json: any, _spriteTexture: Texture): void => {
    // sprite only case
    if (json === null) {
      if (_spriteTexture && numberOfFrames) {
        //get size from texture
        const width = _spriteTexture.image.width
        const height = _spriteTexture.image.height
        const frameWidth = width / numberOfFrames
        const frameHeight = height
        // textureData = _spriteTexture
        totalFrames = numberOfFrames
        spriteData = {
          frames: [],
          meta: {
            version: '1.0',
            size: { w: width, h: height },
            scale: '1',
          },
        }

        if (parseInt(frameWidth.toString(), 10) === frameWidth) {
          // if it fits
          for (let i = 0; i < numberOfFrames; i++) {
            spriteData.frames.push({
              frame: { x: i * frameWidth, y: 0, w: frameWidth, h: frameHeight },
              rotated: false,
              trimmed: false,
              spriteSourceSize: { x: 0, y: 0, w: frameWidth, h: frameHeight },
              sourceSize: { w: frameWidth, h: height },
            })
          }
        }
      }
    } else if (_spriteTexture) {
      spriteData = json
      spriteData.frames = Array.isArray(json.frames) ? json.frames : parseFrames()
      totalFrames = Array.isArray(json.frames) ? json.frames.length : Object.keys(json.frames).length
      // textureData = _spriteTexture

      const { w, h } = getFirstItem(json.frames).sourceSize
      calculateAspectRatio(w, h)

      if (matRef) {
        matRef.map = _spriteTexture
      }
    }

    console.log('parseSpriteData', { json, _spriteTexture })
    _spriteTexture.premultiplyAlpha = false

    setSpriteTexture(_spriteTexture)

    modifySpritePosition()
  }

  // for frame based JSON Hash sprite data
  const parseFrames = (): any => {
    const sprites: any = {}
    const data = spriteData
    const delimiters = animationNames
    if (delimiters) {
      for (let i = 0; i < delimiters.length; i++) {
        sprites[delimiters[i]] = []

        for (let innerKey in data['frames']) {
          const value = data['frames'][innerKey]
          const frameData = value['frame']
          const x = frameData['x']
          const y = frameData['y']
          const width = frameData['w']
          const height = frameData['h']
          const sourceWidth = value['sourceSize']['w']
          const sourceHeight = value['sourceSize']['h']

          if (typeof innerKey === 'string' && innerKey.toLowerCase().indexOf(delimiters[i].toLowerCase()) !== -1) {
            sprites[delimiters[i]].push({
              x: x,
              y: y,
              w: width,
              h: height,
              frame: frameData,
              sourceSize: { w: sourceWidth, h: sourceHeight },
            })
          }
        }
      }
    }

    console.log('parseFrames', { sprites })

    return sprites
  }

  // modify the sprite material after json is parsed and state updated
  const modifySpritePosition = (): void => {
    if (!spriteData) return

    const {
      meta: { size: metaInfo },
      frames,
    } = spriteData

    const { w: frameW, h: frameH } = Array.isArray(frames)
      ? frames[0].sourceSize
      : frameName
      ? frames[frameName]
        ? frames[frameName][0].sourceSize
        : { w: 0, h: 0 }
      : { w: 0, h: 0 }

    if (matRef.map) {
      matRef.map.wrapS = matRef.map.wrapT = RepeatWrapping
      matRef.map.center.set(0, 0)
      matRef.map.repeat.set((1 * flipOffset) / (metaInfo.w / frameW), 1 / (metaInfo.h / frameH))

      //const framesH = (metaInfo.w - 1) / frameW
      const framesV = (metaInfo.h - 1) / frameH
      const frameOffsetY = 1 / framesV
      matRef.map.offset.x = 0.0 //-matRef.map.repeat.x
      matRef.map.offset.y = 1 - frameOffsetY
    }

    setJsonReady(true)
    if (onStart) onStart({ currentFrameName: frameName, currentFrame: currentFrame })
  }

  // run the animation on each frame
  const runAnimation = (): void => {
    //if (!frameName) return
    const now = window.performance.now()
    const diff = now - timerOffset
    const {
      meta: { size: metaInfo },
      frames,
    } = spriteData
    const { w: frameW, h: frameH } = getFirstItem(frames).sourceSize
    const spriteFrames = Array.isArray(frames) ? frames : frameName ? frames[frameName] : []

    let finalValX = 0
    let finalValY = 0
    const _endFrame = endFrame || spriteFrames.length - 1

    if (currentFrame > _endFrame) {
      currentFrame = loop ? startFrame ?? 0 : 0
      if (loop) {
        onLoopEnd?.({
          currentFrameName: frameName,
          currentFrame: currentFrame,
        })
      } else {
        onEnd?.({
          currentFrameName: frameName,
          currentFrame: currentFrame,
        })
      }
      if (!loop) return
    }

    if (diff <= fpsInterval) return
    timerOffset = now - (diff % fpsInterval)

    calculateAspectRatio(frameW, frameH)
    const framesH = (metaInfo.w - 1) / frameW
    const framesV = (metaInfo.h - 1) / frameH
    const {
      frame: { x: frameX, y: frameY },
      sourceSize: { w: originalSizeX, h: originalSizeY },
    } = spriteFrames[currentFrame]
    const frameOffsetX = 1 / framesH
    const frameOffsetY = 1 / framesV
    if (matRef.map) {
      finalValX =
        flipOffset > 0
          ? frameOffsetX * (frameX / originalSizeX)
          : frameOffsetX * (frameX / originalSizeX) - matRef.map.repeat.x
      finalValY = Math.abs(1 - frameOffsetY) - frameOffsetY * (frameY / originalSizeY)

      matRef.map.offset.x = finalValX
      matRef.map.offset.y = finalValY
    }

    currentFrame += 1
  }

  // *** Warning! It runs on every frame! ***

  const useFrame = () => {
    if (!spriteData?.frames || !matRef?.map) {
      return
    }

    if (pause) {
      return
    }

    if (autoPlay || play) {
      runAnimation()
      onFrame && onFrame({ currentFrameName: currentFrameName, currentFrame: currentFrame })
    }
  }

  // utils
  const getFirstItem = (param: any): any => {
    if (Array.isArray(param)) {
      return param[0]
    } else if (typeof param === 'object' && param !== null) {
      const keys = Object.keys(param)
      return param[keys[0]][0]
    } else {
      return { w: 0, h: 0 }
    }
  }

  const getJsonStatus = () => {
    return isJsonReady
  }

  const returnDictionary = {
    group,
    init,
    useFrame,
    pauseAnimation,
    playAnimation,
  }

  return returnDictionary
}

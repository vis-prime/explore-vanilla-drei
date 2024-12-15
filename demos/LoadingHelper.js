export class LoadingHelper {
  constructor({ debug = false } = {}) {
    this.progress = 0
    this.container = null
    this.textElement = null
    this.multiProgress = new Map()
    this.debug = debug
  }

  _createLoadingDiv() {
    this.container = document.createElement('div')
    this.textElement = document.createElement('div')

    // Set container styles
    Object.assign(this.container.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #333333, #111111)', // Pleasant dull gradient
      zIndex: '1000',
      opacity: '0.9',
      transition: 'opacity 0.3s ease',
    })

    // Set text styles
    Object.assign(this.textElement.style, {
      color: '#ffffff99',
      fontSize: '3rem',
    })

    this.container.appendChild(this.textElement)
    document.body.appendChild(this.container)
  }

  updateProgress(value) {
    // Ensure value is clamped between 0 and 1
    this.progress = Math.min(Math.max(value, 0), 1)

    if (this.progress > 0 && !this.container) {
      this._createLoadingDiv()
    }

    if (this.container) {
      this.textElement.textContent = `Loading ${Math.floor(this.progress * 100)}%`
    }

    if (this.progress === 1) {
      this._removeLoadingDiv()
    }
  }

  setGlobalProgress(id = '', progress = 0) {
    this.multiProgress.set(id, progress)

    let allDone = true
    for (const val of this.multiProgress.values()) {
      if (val !== 1) {
        allDone = false
        break
      }
    }

    if (allDone) {
      this.multiProgress.clear()
      this.updateProgress(1)

      if (this.debug) {
        const str = `${100}% items:${this.multiProgress.size} id:${id.slice(0, 30)}=>${progress.toFixed(2)} `
        console.log(str)
      }

      return
    }
    // Calculate total progress
    const totalProgress =
      [...this.multiProgress.values()].reduce((sum, value) => sum + value, 0) / this.multiProgress.size
    this.updateProgress(totalProgress)

    if (this.debug) {
      const str = `${totalProgress.toFixed(2)} size:${this.multiProgress.size} id:${id.slice(
        0,
        30
      )}=>${progress.toFixed(2)} `
      console.log(str)
    }
  }

  _removeLoadingDiv() {
    if (this.container) {
      document.body.removeChild(this.container)
      this.container = null
      this.textElement = null
    }
  }
}

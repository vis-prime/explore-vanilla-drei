export class LoadingHelper {
  constructor() {
    this.progress = 0
    this.container = null
    this.textElement = null
    this.multiProgress = new Map()
  }

  _createLoadingDiv() {
    this.container = document.createElement('div')
    this.textElement = document.createElement('div')

    // Set container styles
    Object.assign(this.container.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
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

    if (this.multiProgress.get(id) === 1) {
      this.multiProgress.delete(id)
    }

    if (this.multiProgress.size === 0) {
      this.updateProgress(1)
      return
    }
    // Calculate total progress
    const totalProgress =
      [...this.multiProgress.values()].reduce((sum, value) => sum + value, 0) / this.multiProgress.size
    this.updateProgress(totalProgress)

    // console.log(id.slice(0, 30), progress.toFixed(2), totalProgress.toFixed(2), this.multiProgress)
  }

  _removeLoadingDiv() {
    if (this.container) {
      document.body.removeChild(this.container)
      this.container = null
      this.textElement = null
    }
  }
}

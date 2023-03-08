import { SSGIEffect } from "realism-effects"
import { GUI } from "lil-gui"
// import copy from "copy-to-clipboard"

export class SSGIDebugGUI {
  constructor(gui, ssgiEffect, params = SSGIEffect.DefaultOptions) {
    const pane = gui.addFolder("SSGIDebugGUI")
    pane.open()
    this.pane = pane

    pane.onChange((ev) => {
      const { property, value } = ev

      ssgiEffect[property] = value
    })

    params = { ...SSGIEffect.DefaultOptions, ...params }

    const generalFolder = pane.addFolder("General")
    generalFolder.add(params, "distance", 0.001, 10, 0.01)
    generalFolder.add(params, "autoThickness")
    generalFolder.add(params, "thickness", 0, 5, 0.01)

    generalFolder.add(params, "maxRoughness", 0, 1, 0.01)
    generalFolder.add(params, "envBlur", 0, 1, 0.01)
    generalFolder.add(params, "importanceSampling")
    generalFolder.add(params, "maxEnvLuminance", 0, 100, 1)

    const temporalResolveFolder = pane.addFolder("Temporal Resolve")

    temporalResolveFolder.add(params, "blend", 0, 1, 0.001)
    const denoiseFolder = pane.addFolder("Denoise")
    denoiseFolder.add(params, "denoiseIterations", 0, 5, 1)
    denoiseFolder.add(params, "denoiseKernel", 1, 5, 1)
    denoiseFolder.add(params, "denoiseDiffuse", 0, 50, 0.01)
    denoiseFolder.add(params, "denoiseSpecular", 0, 50, 0.01)
    denoiseFolder.add(params, "depthPhi", 0, 15, 0.001)
    denoiseFolder.add(params, "normalPhi", 0, 50, 0.001)
    denoiseFolder.add(params, "roughnessPhi", 0, 100, 0.001)

    const definesFolder = pane.addFolder("Tracing")

    definesFolder.add(params, "steps", 0, 256, 1)
    definesFolder.add(params, "refineSteps", 0, 16, 1)
    definesFolder.add(params, "spp", 1, 32, 1)
    definesFolder.add(params, "missedRays")

    const resolutionFolder = pane.addFolder("Resolution")
    resolutionFolder.add(params, "resolutionScale", 0.25, 1, 0.25)

    // pane
    //   .addButton({
    //     "Copy to Clipboard",
    //   )
    //   .on("click", () => {
    //     const json = {}

    //     for (const prop of Object.keys(SSGIEffect.DefaultOptions)) {
    //       json[prop] = ssgiEffect[prop]
    //     }

    //     const output = JSON.stringify(json, null, 2)
    //     // copy(output)
    //     navigator.clipboard.writeText(output)
    //   )
  }
}

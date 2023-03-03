import ulmer_muensterEXR from "./ulmer_muenster_1k.exr?url"
import ulmer_muensterWebP from "./ulmer_muenster.webp?url"
import wide_street1EXR from "./wide_street_01_1k.exr?url"
import wide_street1WebP from "./wide_street_01.webp?url"
import wide_street2EXR from "./wide_street_02_1k.exr?url"
import wide_street3WebP from "./wide_street_02.webp?url"

export const HDRI_LIST = {
  ulmer_muenster: {
    exr: ulmer_muensterEXR,
    webP: ulmer_muensterWebP,
    sunPos: [17, 14, 12],
    sunCol: "#ffffeb",
    shadowOpacity: 0.72,
    groundProj: { radius: 25, height: 2 },
  },

  wide_street1: {
    exr: wide_street1EXR,
    webP: wide_street1WebP,
    sunPos: [15, 24, 11],
    sunCol: "#ffffeb",
    shadowOpacity: 0.85,
    groundProj: { radius: 12, height: 2 },
  },

  wide_street2: {
    exr: wide_street2EXR,
    webP: wide_street3WebP,
    sunPos: [16, 8, 12],
    sunCol: "#ffffeb",
    shadowOpacity: 0.55,
    groundProj: { radius: 25, height: 2 },
  },
}

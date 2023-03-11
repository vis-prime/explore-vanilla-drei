import ulmer_muensterEXR from "./ulmer_muenster_1k.exr?url"
import ulmer_muensterWebP from "./ulmer_muenster.webp?url"
import wide_street1EXR from "./wide_street_01_1k.exr?url"
import wide_street1WebP from "./wide_street_01.webp?url"
import wide_street2EXR from "./wide_street_02_1k.exr?url"
import wide_street3WebP from "./wide_street_02.webp?url"
import kloppenheimEXR from "./kloppenheim_02_1k.exr?url"
import kloppenheimWEBP from "./kloppenheim_02.webp?url"
import dry_cracked_lakeAvif from "./dry_cracked_lake.avif?url"
import dry_cracked_lakeHDR from "./dry_cracked_lake_1k.hdr?url"
import round_platform_avif from "./round_platform.avif?url"
import round_platform_exr from "./round_platform_1k.exr?url"
import skidpan_avif from "./skidpan.avif?url"
import skidpan_hdr from "./skidpan_1k.hdr?url"
import dancing_avif from "./dancing_hall.avif?url"
import dancing_exr from "./dancing_hall_1k.exr?url"
import empty_warehouse_avif from "./empty_warehouse_01.avif?url"
import empty_warehouse_exr from "./empty_warehouse_01_1k.exr?url"
import old_hall_avif from "./old_hall.avif?url"
import old_hall_exr from "./old_hall_1k.exr?url"

/**
 * @enum
 */
export const HDRI_LIST = {
  ulmer_muenster: {
    exr: ulmer_muensterEXR,
    webP: ulmer_muensterWebP,
    sunPos: [17, 14, 12],
    sunColor: "#ffffeb",
    shadowOpacity: 0.72,
    groundProj: { radius: 25, height: 2 },
  },

  wide_street1: {
    exr: wide_street1EXR,
    webP: wide_street1WebP,
    sunPos: [15, 24, 11],
    sunColor: "#ffffeb",
    shadowOpacity: 0.85,
    groundProj: { radius: 12, height: 2 },
  },

  wide_street2: {
    exr: wide_street2EXR,
    webP: wide_street3WebP,
    sunPos: [16, 8, 12],
    sunColor: "#ffffeb",
    shadowOpacity: 0.55,
    groundProj: { radius: 25, height: 2 },
  },
  kloppenheim: {
    exr: kloppenheimEXR,
    webP: kloppenheimWEBP,
    groundProj: { radius: 25, height: 2 },
  },
  dry_cracked_lake: {
    hdr: dry_cracked_lakeHDR,
    avif: dry_cracked_lakeAvif,
    groundProj: { radius: 20, height: 2 },
  },

  round_platform: {
    exr: round_platform_exr,
    avif: round_platform_avif,
    groundProj: { radius: 10, height: 2.5 },
  },

  skidpan: {
    hdr: skidpan_hdr,
    avif: skidpan_avif,
    groundProj: { radius: 50, height: 4.5 },
  },

  dancing_hall: {
    avif: dancing_avif,
    exr: dancing_exr,
    groundProj: { radius: 20, height: 3 },
  },
  empty_warehouse: {
    avif: empty_warehouse_avif,
    exr: empty_warehouse_exr,
    groundProj: { radius: 19, height: 6 },
  },
  old_hall: {
    avif: old_hall_avif,
    exr: old_hall_exr,
    groundProj: { radius: 13, height: 4 },
  },
}

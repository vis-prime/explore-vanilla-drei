import { defineConfig } from "vite"
import viteCompression from "vite-plugin-compression"
import gltf from "vite-plugin-gltf"
import { prune, dedup, textureCompress, draco } from "@gltf-transform/functions"
import sharp from "sharp"

// https://vitejs.dev/config/
const resolution = 1024

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
  },
  publicDir: "public",
  base: "./",
  server: {
    port: 3000,
  },
  plugins: [
    gltf({
      transforms: [
        // remove unused resources
        prune(),

        // combine duplicated resources
        dedup(),

        textureCompress({
          targetFormat: "avif",
          encoder: sharp,
          resize: [resolution, resolution],
        }),

        // compress mesh geometry
        draco(),
      ],
    }),

    viteCompression(),
  ],
})

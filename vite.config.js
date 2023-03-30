import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
  },
  publicDir: 'public',
  base: './',
  server: {
    port: 3000,
  },
  plugins: [viteCompression()],
})

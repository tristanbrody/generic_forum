import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  // devServer: {
  //   proxy: {
  //   target: 'http://localhost:5173',
  //   public: '0.0.0.0:5173',
  //   host: '0.0.0.0',
  //   port: 5173
  //   }
  // },
  plugins: [vue(), vueJsx()],
  server: {
    port: 5173,
    host: true
    // strictPort: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

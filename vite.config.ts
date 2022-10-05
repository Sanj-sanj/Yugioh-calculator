import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // following added to get HMR to work, didnt work out of the box... weird. https://github.com/vitejs/vite/issues/1153#issuecomment-785467271
  server: {
    watch: {
      usePolling: true
    }
  }
})

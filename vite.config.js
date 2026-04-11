import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Whenever our app sees "/api", it routes it to the Vercel backend securely
      '/api': {
        target: 'https://devika-backend.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
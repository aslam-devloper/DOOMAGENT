import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed at https://doomagent.vercel.app (root path)
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})

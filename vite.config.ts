import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    // Make sure the output directory is set to 'dist'
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'date-fns'],
        }
      }
    }
  },
  server: {
    host: true, 
    port: 5173,
  },
  base: '/',
})
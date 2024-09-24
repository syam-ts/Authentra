import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
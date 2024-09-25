import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5173, // keep the default port for React dev server
    proxy: {
      '/api': {
        target: 'http://localhost:3005', // proxy requests to Node.js server on port 3005
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
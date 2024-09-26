import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3005',
                changeOrigin: true,
                secure: false,
            },
            '/admin/api': {
                target: 'http://localhost:3005',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [react()],
});

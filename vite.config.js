import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false,
    proxy: {
      // Proxy for Shopify API
      '/api/shopify': {
        target: 'https://sellerpulse.myshopify.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/shopify/, ''),
      },
      // Proxy for local backend
      '/api/backend': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/backend/, ''),
      },
    },
  },
});

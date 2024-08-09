import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      routes: '/src/routes',
      stores: '/src/stores',
      theme: '/src/theme',
      forms: '/src/forms',
      types: '/src/types',
      layouts: '/src/layouts',
      components: '/src/components',
      api: '/src/api',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://student-labs-2024-vidialbackend-1232.twc1.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader(
              'Access-Control-Allow-Methods',
              'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            );
            proxyReq.setHeader(
              'Access-Control-Allow-Headers',
              'Origin, Content-Type, X-Auth-Token',
            );
            proxyReq.setHeader('Access-Control-Allow-Credentials', 'true');
          });
        },
      },
    },
  },
});

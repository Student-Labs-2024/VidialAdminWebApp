import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
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
    },
  },
});

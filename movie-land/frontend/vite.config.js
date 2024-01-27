import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'react-router-dom',
        '@mui/icons-material',
        '@mui/icons-material/Home',
      ],
    },
    outDir: 'dist',
  },
  plugins: [react()],
  loader: { '.js': 'jsx' },
  define: {
    global: 'globalThis',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:9090',
    },
  },
});

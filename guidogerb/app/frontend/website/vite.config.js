import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    }
  },
  plugins: [
    react()
  ],
  server: {
    port: 8080,
    open: false,
  },
  preview: {
    port: 9180,
  },
  resolve: {
    alias: {
      'design-system': path.resolve(__dirname, '../design-system'),
      'design-system-header': path.resolve(__dirname, '../design-system-header'),
    }
  },
  publicDir: 'src/static'
});

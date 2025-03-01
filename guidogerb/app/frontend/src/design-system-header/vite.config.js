import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  },
  build: {
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystemHeader',
      formats: ['es', 'umd'],
      fileName: (format) => `design-system-header.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'design-system'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'design-system': 'DesignSystem'
        }
      }
    }
  }
});

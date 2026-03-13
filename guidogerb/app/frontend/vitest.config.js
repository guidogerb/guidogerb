import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      all: true,
      exclude: [
        '**/App.jsx',
        '**/main.jsx',
        '**/components/demo',
        '**/HomeLanding.jsx',
        '**/PlaceHolderDocumentation.jsx',
        '**/FoundationLanding.jsx',
        '**/GuidelinesLanding.jsx',
        '**/LibraryLanding.jsx',
        '**/websiteContent/resources',
        '**/enums',
        '**/colors.js',
      ],
      provider: 'istanbul',
      reporter: ['text', 'json', 'lcov'],
    },
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      'design-system': path.resolve(__dirname, './src/design-system/index.js'),
      'design-system-header': path.resolve(__dirname, './src/design-system-header/src/index.js'),
    }
  },
});

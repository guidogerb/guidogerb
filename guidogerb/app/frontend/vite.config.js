//import react from '@vitejs/plugin-react-swc'
import {VitePWA} from 'vite-plugin-pwa';

import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    // throw new Error(`website mode: '${mode}'`);
    return {
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                scss: {
                    api: 'modern'
                }
            }
        },
        resolve: {
            // mode is `development`, `production`, and this allows a custom condition (otherwise it defaulted back to development)
            conditions: [mode]
        },
        plugins: [react(),
            // fail on eslint errors for build, but don't slow dev down
            mode === 'production-website' ? eslintPlugin() : null,
            mkcert({
                force: true,
                hosts: ['127.0.0.1', 'localhost'],
            }),
            VitePWA({
                strategies: 'injectManifest', // Change to use custom service worker
                injectManifest: {
                    swSrc: 'public/sw.js', // Your custom service worker
                    swDest: 'dist/sw.js', // Output location
                    injectionPoint: null // Don't use injection point
                },
                manifest: {
                    name: 'GuidoGerb Publishing PWA',
                    short_name: 'GuidoGerbPWA',
                    description: 'All of your publishing needs',
                    theme_color: '#000000',
                    background_color: '#ffffff',
                    display: 'standalone',
                    scope: '/',
                    start_url: '/',
                    orientation: 'portrait',
                    icons: [
                        {
                            src: '/icons/icon-192x192.png',
                            sizes: '72x72',
                            type: 'image/png',
                            purpose: 'any maskable'
                        },
                        // ... other icons
                    ]
                },
                workbox: {
                    globPatterns: [
                        "**/*.{js,css,html,ico}",
                        "**/*.{png,jpg,jpeg,gif,svg,webp}",
                        "**/*.{mp3,wav,ogg}",
                        "**/*.{mp4,webm,ogv}",
                        "**/*.{woff,woff2,ttf,eot}"
                    ], // Adjust these patterns to match your assets
                },
            })
        ],
        build: {
            minify: false,
            sourcemap: "inline",
            outDir: 'build', emptyOutDir: true, rollupOptions: {
                output: {
                    manualChunks: undefined // Ensure consistent chunk naming
                },
                input: {
                    main: './index.html',
                },
            },
        },
        server: {
            https: true,
            host: '127.0.0.1',
            port: 9180,
            open: true,
            proxy: {
                '/api': 'http://localhost:8080',
            }
        }
    }
})

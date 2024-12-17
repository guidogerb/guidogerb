import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {VitePWA} from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(),
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
/*                    {
                        src: '/icons/icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },*/
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
    ], build: {
        outDir: 'build', emptyOutDir: true, rollupOptions: {
            output: {
                manualChunks: undefined // Ensure consistent chunk naming
            },
            input: {
                main: './index.html',
            },
        },
    }, server: {
        proxy: {
            '/api': 'http://localhost:8080',
        }
    }
})

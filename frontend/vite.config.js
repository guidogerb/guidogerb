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
                name: 'Chatbot Pro',
                short_name: 'ChatPro',
                description: 'AI chatting like a professional',
                theme_color: '#000000',
                background_color: '#ffffff',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                orientation: 'portrait',
                icons: [
                    {
                        src: '/icons/icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },
                    // ... other icons
                ]
            }
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

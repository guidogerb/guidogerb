// workbox-config.cjs
module.exports = {
    globDirectory: "dist/",
    globPatterns: [
        "**/*.{js,css,html,png,jpg,svg,ico}"
    ],
    swDest: "dist/sw.js",
    sourcemap: false,
    mode: 'production',
    navigateFallback: '/index.html',
    runtimeCaching: [{
        urlPattern: /https://guidogerbpublishing.com/,
        handler: 'NetworkFirst',
        options: {
            // Options
        },
    }]
};

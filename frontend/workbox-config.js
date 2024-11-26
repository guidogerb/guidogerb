// workbox-config.js
module.exports = {
    globDirectory: "dist/",
    globPatterns: [
        "**/*.{js,css,html,png,jpg,svg,ico}"
    ],
    swDest: "dist/sw.js",
    sourcemap: false,
    mode: 'production',
    navigateFallback: '/index.html'
};

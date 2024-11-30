// scripts/generate-asset-manifest.js
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function generateAssetManifest() {
    const buildPath = path.join(__dirname, '../dist'); // Changed from 'build' to 'dist' for Vite
    const assetsPath = path.join(buildPath, 'assets');

    // Get all build assets
    const assets = fs.readdirSync(assetsPath)
        .filter(file => file.match(/\.(js|css|jpg|png|svg)$/))
        .map(file => `/assets/${file}`);

    // Add other static files including PWA assets
    const staticAssets = [
        '/',
        '/index.html',
        '/manifest.json',
        '/sw.js',
        '/workbox-*.cjs', // Include Workbox files if using them
    ];

    // Generate build hash
    const buildHash = crypto
        .createHash('md5')
        .update(assets.join(''))
        .digest('hex');

    const assetManifest = {
        version: buildHash,
        timestamp: Date.now(),
        assets: [...staticAssets, ...assets]
    };

    // Write asset manifest file
    fs.writeFileSync(
        path.join(buildPath, 'asset-manifest.json'),
        JSON.stringify(assetManifest, null, 2)
    );

    console.log('Asset manifest generated successfully');
}

generateAssetManifest();

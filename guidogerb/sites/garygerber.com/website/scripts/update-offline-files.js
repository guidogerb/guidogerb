import fs from 'fs/promises';
import path from 'path';

async function updateOfflineFiles() {
    try {
        // Read the build directory
        const buildDir = path.resolve('build');
        const files = await fs.readdir(path.join(buildDir, 'assets'));

        // Find the main JS and CSS files
        const jsFile = files.find(file => file.startsWith('main-') && file.endsWith('.js'));
        const cssFile = files.find(file => file.startsWith('main-') && file.endsWith('.css'));

        if (!jsFile || !cssFile) {
            throw new Error('Could not find main JS or CSS files');
        }

        // Update service worker
        let swContent = await fs.readFile('public/sw.js', 'utf-8');
        swContent = swContent.replace(
            /const INITIAL_CACHED_RESOURCES = \[([\s\S]*?)\];/,
            `const INITIAL_CACHED_RESOURCES = [
    '/',
    '/index.html',
    '/offline.html',
    '/assets/${jsFile}',
    '/assets/${cssFile}',
    '/icons/favicon.ico',
    '/manifest.json',
    '/manifest.webmanifest'
];`
        );
        await fs.writeFile('public/sw.js', swContent);

        // Update offline.html
        let offlineContent = await fs.readFile('public/offline.html', 'utf-8');
        offlineContent = offlineContent.replace(
            /const cssResponse = await fetch\('\/assets\/main-.*?\.css'\);/,
            `const cssResponse = await fetch('/assets/${cssFile}');`
        );
        offlineContent = offlineContent.replace(
            /const jsResponse = await fetch\('\/assets\/main-.*?\.js'\);/,
            `const jsResponse = await fetch('/assets/${jsFile}');`
        );
        offlineContent = offlineContent.replace(
            /cssLink\.href = '\/assets\/main-.*?\.css';/,
            `cssLink.href = '/assets/${cssFile}';`
        );
        offlineContent = offlineContent.replace(
            /script\.src = '\/assets\/main-.*?\.js';/,
            `script.src = '/assets/${jsFile}';`
        );
        await fs.writeFile('offline.html', offlineContent);

        console.log('Successfully updated offline files with new asset names');
    } catch (error) {
        console.error('Error updating offline files:', error);
        process.exit(1);
    }
}

updateOfflineFiles();
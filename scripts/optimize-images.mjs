import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

// Target directory for optimization
const ASSETS_DIR = 'public/assets';
// Supported extensions for source images
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

/**
 * Recursively gets all files in a directory
 */
async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

/**
 * Main optimization function
 */
async function optimizeImages() {
    console.log('🚀 Starting image optimization...');

    try {
        const allFiles = await getFiles(ASSETS_DIR);
        const imagesToProcess = allFiles.filter(file =>
            EXTENSIONS.includes(path.extname(file).toLowerCase())
        );

        console.log(`🔍 Found ${imagesToProcess.length} source images.`);

        let processedCount = 0;
        let upToDateCount = 0;

        for (const file of imagesToProcess) {
            const ext = path.extname(file);
            const baseName = file.substring(0, file.length - ext.length);

            const formats = [
                { ext: '.webp', type: 'webp' },
                { ext: '.avif', type: 'avif' }
            ];

            for (const format of formats) {
                const targetFile = `${baseName}${format.ext}`;

                try {
                    const sourceStats = await fs.stat(file);
                    let targetStats;

                    try {
                        targetStats = await fs.stat(targetFile);
                    } catch (e) {
                        // Target doesn't exist
                    }

                    // Generate if target doesn't exist OR source is newer
                    if (!targetStats || sourceStats.mtime > targetStats.mtime) {
                        console.log(`  📸 Optimizing: ${path.relative(process.cwd(), file)} -> ${format.ext}`);

                        await sharp(file)
                            .toFormat(format.type, { quality: 80 })
                            .toFile(targetFile);

                        processedCount++;
                    } else {
                        upToDateCount++;
                    }
                } catch (err) {
                    console.error(`  ❌ Error processing ${file} to ${format.ext}:`, err.message);
                }
            }
        }

        console.log(`\n✅ Optimization complete!`);
        console.log(`   ✨ Generated/Updated: ${processedCount}`);
        console.log(`   💤 Already up-to-date: ${upToDateCount}`);
    } catch (err) {
        console.error('💥 Critical error during optimization:', err);
        process.exit(1);
    }
}

optimizeImages();

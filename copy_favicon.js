import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, 'src', 'assets', 'brixxspace-logo.png');
const dest = path.join(__dirname, 'public', 'favicon.png');

try {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied favicon.png');
} catch (err) {
    console.error('Error copying file:', err);
    process.exit(1);
}

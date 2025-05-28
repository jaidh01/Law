import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const workerFile = path.join(__dirname, '..', 'src', 'worker.js');
const distFile = path.join(__dirname, '..', 'dist', 'worker.js');

// Check if worker.js exists
if (!fs.existsSync(workerFile)) {
  console.error('❌ worker.js does not exist in src directory');
  process.exit(1);
}

// Check if dist directory exists
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  console.error('❌ dist directory does not exist, run build first');
  process.exit(1);
}

console.log('✅ Pre-deploy checks passed');
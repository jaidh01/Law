import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const sourceFile = path.join(__dirname, '..', 'src', 'worker.js');
const destFile = path.join(__dirname, '..', 'dist', 'worker.js');

try {
  // Create dist directory if it doesn't exist
  const distDir = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(sourceFile, destFile);
  console.log(`Successfully copied worker.js to ${destFile}`);
} catch (error) {
  console.error(`Error copying worker.js: ${error.message}`);
  process.exit(1);
}
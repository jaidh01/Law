/**
 * API Configuration for different environments
 * This file provides the correct API base URL depending on the environment
 */

// Get the current host information
const currentHost = window.location.hostname;

// Detect environment and set appropriate API URL
let apiBaseUrl = '';

if (currentHost === 'law-livid-theta.vercel.app' || currentHost.includes('vercel.app')) {
  // Production environment - use the deployed API endpoint
  apiBaseUrl = 'https://law-backend-44pr.onrender.com/api/articles';
} else if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
  // Local development on same machine
  apiBaseUrl = 'http://localhost:5000/api/articles';
} else {
  // Testing on a physical device on the same network
  apiBaseUrl = `http://${currentHost}:5000/api/articles`;
}

console.log('API Base URL:', apiBaseUrl);

export default apiBaseUrl;
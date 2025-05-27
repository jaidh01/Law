/**
 * API base URL configuration
 * Always uses the production backend URL regardless of environment
 */

// Always use the production backend URL
const apiBaseUrl = 'https://law-backend-44pr.onrender.com/api/articles';

console.log(`API Configuration: Using ${apiBaseUrl}`);

export default apiBaseUrl;
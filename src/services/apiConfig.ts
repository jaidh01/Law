/**
 * API base URL configuration
 * This will use the production URL in production mode,
 * and localhost for development
 */

// Default to the production URL
const apiBaseUrl = import.meta.env.PROD || !import.meta.env.VITE_USE_LOCAL_API 
  ? 'https://law-backend-44pr.onrender.com/api/articles'
  : 'http://localhost:5000/api/articles';

export default apiBaseUrl;
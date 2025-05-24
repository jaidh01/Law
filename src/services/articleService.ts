import axios from 'axios';
import { Article } from '../types/article';

// Create an axios instance with timeout and mobile-friendly settings
const api = axios.create({
  baseURL: 'http://localhost:5000/api/articles',
  timeout: 15000, // Increased timeout for slower mobile connections
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a retry mechanism for mobile network instability
const fetchWithRetry = async (url: string, retries = 3) => {
  let lastError;
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await api.get(url);
      // When successful, store in cache
      try {
        localStorage.setItem(`cache_${url}`, JSON.stringify({
          data: response.data,
          timestamp: Date.now()
        }));
      } catch (e) {
        // Handle storage errors silently
        console.warn('Failed to cache data:', e);
      }
      return response.data;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed for ${url}:`, error);
      lastError = error;
      // Only wait if we're going to retry
      if (i < retries) {
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  }
  
  // After all retries failed, try to get from cache
  try {
    const cachedData = localStorage.getItem(`cache_${url}`);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      // Use cached data if it's less than 24 hours old
      if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        console.log(`Using cached data for ${url}`);
        return parsed.data;
      }
    }
  } catch (e) {
    console.error('Error accessing cache:', e);
  }
  
  throw lastError;
};

export const fetchFeaturedArticles = async (limit: number = 5): Promise<Article[]> => {
  try {
    const data = await fetchWithRetry(`/featured?limit=${limit}`);
    const mappedData = data.map(mapArticleResponse);
    // Store for immediate access on future loads
    try {
      localStorage.setItem('featuredArticles', JSON.stringify(mappedData));
    } catch (e) {
      console.warn('Failed to cache featured articles:', e);
    }
    return mappedData;
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    // In case of network error, try to use cached data if available
    const cachedData = localStorage.getItem('featuredArticles');
    if (cachedData) {
      console.log('Using cached featured articles');
      return JSON.parse(cachedData);
    }
    throw error;
  }
};

export const fetchArticlesByCategory = async (categorySlug: string): Promise<Article[]> => {
  try {
    const data = await fetchWithRetry(`/category/${categorySlug}`);
    const mappedData = data.map(mapArticleResponse);
    // Cache the result for future use
    try {
      localStorage.setItem(`category_${categorySlug}`, JSON.stringify(mappedData));
    } catch (e) {
      console.warn(`Failed to cache category ${categorySlug}:`, e);
    }
    return mappedData;
  } catch (error) {
    console.error(`Error fetching articles for category ${categorySlug}:`, error);
    // Try to use cached data
    const cachedData = localStorage.getItem(`category_${categorySlug}`);
    if (cachedData) {
      console.log(`Using cached data for category ${categorySlug}`);
      return JSON.parse(cachedData);
    }
    throw error;
  }
};

export const fetchArticlesByCategoryAndSubcategory = async (
  categorySlug: string, 
  subcategorySlug: string
): Promise<Article[]> => {
  try {
    const data = await fetchWithRetry(`/category/${categorySlug}/subcategory/${subcategorySlug}`);
    return data.map(mapArticleResponse);
  } catch (error) {
    console.error(`Error fetching articles for category ${categorySlug} and subcategory ${subcategorySlug}:`, error);
    throw error;
  }
};

export const fetchArticleBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const data = await fetchWithRetry(`/${slug}`);
    return mapArticleResponse(data);
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
};

export const fetchArticlesByTag = async (tagName: string): Promise<Article[]> => {
  try {
    const data = await fetchWithRetry(`/tag/${encodeURIComponent(tagName)}`);
    return data.map(mapArticleResponse);
  } catch (error) {
    console.error(`Error fetching articles for tag ${tagName}:`, error);
    return [];
  }
};

export const fetchRelatedArticles = async (category: string, currentSlug: string): Promise<Article[]> => {
  try {
    const data = await fetchWithRetry(`/related/${category}?excludeSlug=${currentSlug}`);
    return data.map(mapArticleResponse);
  } catch (error) {
    console.error(`Error fetching related articles for ${category}:`, error);
    return [];
  }
};

// Helper function to map MongoDB response to frontend Article type
const mapArticleResponse = (data: any): Article => {
  return {
    id: data._id || data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || (data.content ? data.content.substring(0, 150) + '...' : ''),
    content: data.content,
    author: data.author,
    authorBio: data.authorBio,
    date: data.published_date || data.createdAt || data.date,
    image: data.image || 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg', // Default image
    imageCaption: data.imageCaption,
    category: data.category,
    tags: data.tags || [],
    pdf_url: data.pdf_url,
    source: data.source
  };
};
import axios from 'axios';
import { Article } from '../types/article';
import apiBaseUrl from './apiConfig';
import {
  featuredArticles as mockArticles,
  getArticlesByCategory,
  getArticleBySlug as getMockArticleBySlug,
  getRelatedArticles as getMockRelatedArticles
} from '../data/articles';

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a retry mechanism for mobile network instability
const fetchWithRetry = async (url: string, retries = 3) => {
  console.log(`Fetching from ${apiBaseUrl}${url}`); // Add logging to confirm URL
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
    } catch (error: any) {
      let errorMessage = 'Unknown error occurred';
      
      // Extract meaningful error messages based on error type
      if (error.response) {
        // Server responded with error status
        errorMessage = `Server error: ${error.response.status}`;
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received (network issue)
        errorMessage = 'Network error: No response received from server';
        console.error('Network Error:', error.request);
      } else {
        // Request setup failed
        errorMessage = `Request error: ${error.message}`;
        console.error('Request Error:', error.message);
      }
      
      lastError = new Error(errorMessage);
      console.error(`Attempt ${i + 1} failed for ${url}:`, errorMessage);
      
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
  
  throw lastError || new Error('Failed to fetch data after multiple attempts');
};

export const fetchFeaturedArticles = async (limit: number = 5): Promise<Article[]> => {
  try {
    const data = await fetchWithRetry(`/featured?limit=${limit}`);
    return data.map(mapArticleResponse);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    
    // In case of network error, try to use cached data if available
    const cachedData = localStorage.getItem('featuredArticles');
    if (cachedData) {
      console.log('Using cached featured articles');
      return JSON.parse(cachedData);
    }
    
    // If no cache, use mock data as last resort
    console.log('Using mock data for featured articles');
    const featured = mockArticles
      .filter(article => 
        article.tags.includes('Featured') || 
        ['Supreme Court', 'High Courts', 'News Updates'].includes(article.category)
      )
      .slice(0, limit);
    return featured;
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
    
    // If no cached data, use mock data
    console.log(`Using mock data for category ${categorySlug}`);
    return getArticlesByCategory(categorySlug);
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
    
    // Try to use mock data as fallback
    console.log(`Using mock data for article with slug ${slug}`);
    const mockArticle = getMockArticleBySlug(slug);
    
    if (mockArticle) {
      return mockArticle;
    }
    
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
    
    // Use mock data as fallback
    console.log(`Using mock data for related articles to ${currentSlug}`);
    return getMockRelatedArticles(category, currentSlug);
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
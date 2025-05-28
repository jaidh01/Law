import { api } from './api/client';
import { Article } from '../types/article';
import { saveToCache, getFromCache, CACHE_KEYS } from './domain/cacheService';
import {
  featuredArticles as mockArticles,
  getArticlesByCategory,
  getArticleBySlug as getMockArticleBySlug,
  getRelatedArticles as getMockRelatedArticles
} from '../data/articles';
import { validateSlug } from '../utils/slugUtils';
import { getCategoryFallbackImage, getOptimizedImageUrl } from '../utils/imageUtils';

/**
 * Fetches featured articles
 */
export const fetchFeaturedArticles = async (limit: number = 5): Promise<Article[]> => {
  try {
    const data = await api.getFeaturedArticles(limit);
    const mappedData = data.map(mapArticleResponse);
    
    // Cache the results for future use
    saveToCache(CACHE_KEYS.FEATURED_ARTICLES, mappedData);
    
    return mappedData;
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    
    // In case of network error, try to use cached data if available
    const cachedData = getFromCache<Article[]>(CACHE_KEYS.FEATURED_ARTICLES);
    if (cachedData) {
      console.log('Using cached featured articles');
      return cachedData;
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

/**
 * Fetches articles by category
 */
export const fetchArticlesByCategory = async (categorySlug: string): Promise<Article[]> => {
  // Check if categorySlug is defined
  if (!categorySlug) {
    console.error('Category slug is undefined');
    return [];
  }

  try {
    const data = await api.getArticlesByCategory(categorySlug);
    const mappedData = data.map(mapArticleResponse);
    
    // Cache the result for future use
    saveToCache(CACHE_KEYS.ARTICLES_BY_CATEGORY(categorySlug), mappedData);
    
    return mappedData;
  } catch (error) {
    console.error(`Error fetching articles for category ${categorySlug}:`, error);
    
    // Try to use cached data
    const cachedData = getFromCache<Article[]>(CACHE_KEYS.ARTICLES_BY_CATEGORY(categorySlug));
    if (cachedData) {
      console.log(`Using cached data for category ${categorySlug}`);
      return cachedData;
    }
    
    // If no cached data, use mock data
    console.log(`Using mock data for category ${categorySlug}`);
    return getArticlesByCategory(categorySlug);
  }
};

/**
 * Fetches an article by slug
 */
export const fetchArticleBySlug = async (slug: string): Promise<Article | null> => {
  // Validate and sanitize the slug
  const validSlug = validateSlug(slug);
  
  if (!validSlug) {
    console.error('Invalid article slug:', slug);
    return null;
  }

  try {
    const data = await api.getArticleBySlug(validSlug);
    const article = mapArticleResponse(data);
    
    // Cache the article
    saveToCache(CACHE_KEYS.ARTICLE_BY_SLUG(validSlug), article);
    
    return article;
  } catch (error) {
    console.error(`Error fetching article with slug ${validSlug}:`, error);
    
    // Try to use cached data
    const cachedArticle = getFromCache<Article>(CACHE_KEYS.ARTICLE_BY_SLUG(validSlug));
    if (cachedArticle) {
      console.log(`Using cached article for slug ${validSlug}`);
      return cachedArticle;
    }
    
    // Try to use mock data as fallback
    console.log(`Using mock data for article with slug ${validSlug}`);
    const mockArticle = getMockArticleBySlug(validSlug);
    
    if (mockArticle) {
      return mockArticle;
    }
    
    return null;
  }
};

/**
 * Fetches articles by tag
 */
export const fetchArticlesByTag = async (tagName: string): Promise<Article[]> => {
  // Check if tagName is defined
  if (!tagName) {
    console.error('Tag name is undefined');
    return [];
  }

  try {
    const data = await api.getArticlesByTag(tagName);
    return data.map(mapArticleResponse);
  } catch (error) {
    console.error(`Error fetching articles for tag ${tagName}:`, error);
    
    // For tags, we'll return mock data that includes the tag
    return mockArticles.filter(article => 
      article.tags.some(tag => 
        tag.toLowerCase().includes(tagName.toLowerCase())
      )
    );
  }
};

/**
 * Fetches related articles
 */
export const fetchRelatedArticles = async (category: string, currentSlug: string): Promise<Article[]> => {
  // Check if category and currentSlug are defined
  if (!category || !currentSlug) {
    console.error('Category or current slug is undefined');
    return [];
  }

  try {
    const data = await api.getRelatedArticles(category, currentSlug);
    return data.map(mapArticleResponse);
  } catch (error) {
    console.error(`Error fetching related articles for ${category}:`, error);
    
    // Use mock data as fallback
    console.log(`Using mock data for related articles to ${currentSlug}`);
    return getMockRelatedArticles(category, currentSlug);
  }
};

/**
 * Helper function to map API response to frontend Article type
 */
const mapArticleResponse = (data: any): Article => {
  const category = data.category || "Uncategorized";
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
  
  // Process the image URL - use provided image or fallback to category-specific image
  const imageUrl = data.image 
    ? getOptimizedImageUrl(data.image) 
    : getCategoryFallbackImage(categorySlug);
  
  return {
    id: data._id || data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || (data.content ? data.content.substring(0, 150) + '...' : ''),
    content: data.content,
    author: data.author,
    authorBio: data.authorBio,
    date: data.published_date || data.createdAt || data.date,
    image: imageUrl,
    imageCaption: data.imageCaption || `${category} - Legal news and updates`,
    imageAlt: data.imageAlt || data.title,
    category: category,
    tags: data.tags || [],
    pdf_url: data.pdf_url,
    source: data.source
  };
};
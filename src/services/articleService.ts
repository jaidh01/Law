import axios from 'axios';
import { Article } from '../types/article';

const API_URL = 'http://localhost:5000/api/articles';

export const fetchFeaturedArticles = async (limit: number = 5): Promise<Article[]> => {
  try {
    const response = await axios.get(`${API_URL}/featured?limit=${limit}`);
    return response.data.map(mapArticleResponse);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    throw error;
  }
};

export const fetchArticlesByCategory = async (categorySlug: string): Promise<Article[]> => {
  try {
    const response = await axios.get(`${API_URL}/category/${categorySlug}`);
    return response.data.map(mapArticleResponse);
  } catch (error) {
    console.error(`Error fetching articles for category ${categorySlug}:`, error);
    throw error;
  }
};

export const fetchArticlesByCategoryAndSubcategory = async (
  categorySlug: string, 
  subcategorySlug: string
): Promise<Article[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/category/${categorySlug}/subcategory/${subcategorySlug}`
    );
    return response.data.map(mapArticleResponse);
  } catch (error) {
    console.error(`Error fetching articles for category ${categorySlug} and subcategory ${subcategorySlug}:`, error);
    throw error;
  }
};

export const fetchArticleBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const response = await axios.get(`${API_URL}/${slug}`);
    return mapArticleResponse(response.data);
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
};

export const fetchArticlesByTag = async (tagName: string): Promise<Article[]> => {
  try {
    const response = await axios.get(`${API_URL}/tag/${encodeURIComponent(tagName)}`);
    return response.data.map(mapArticleResponse);
  } catch (error) {
    console.error(`Error fetching articles for tag ${tagName}:`, error);
    return [];
  }
};

export const fetchRelatedArticles = async (category: string, currentSlug: string): Promise<Article[]> => {
  try {
    const response = await axios.get(`${API_URL}/related/${category}?excludeSlug=${currentSlug}`);
    return response.data.map(mapArticleResponse);
  } catch (error) {
    console.error(`Error fetching related articles for ${category}:`, error);
    throw error;
  }
};

// Helper function to map MongoDB response to frontend Article type
const mapArticleResponse = (data: any): Article => {
  return {
    id: data._id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || data.content.substring(0, 150) + '...',
    content: data.content,
    author: data.author,
    authorBio: data.authorBio,
    date: data.published_date || data.createdAt,
    image: data.image || 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg', // Default image
    imageCaption: data.imageCaption,
    category: data.category,
    tags: data.tags || []
  };
};
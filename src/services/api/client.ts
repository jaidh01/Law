import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_ENDPOINTS } from './endpoints';
import apiBaseUrl from '../apiConfig'; // Make sure to import apiBaseUrl here

// Use the apiBaseUrl from your config instead of hardcoding it
const BASE_URL = apiBaseUrl.replace('/api/articles', '/api');

// Default config
const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
};

// Create client instance
export const apiClient: AxiosInstance = axios.create(axiosConfig);

// API helper functions for different endpoints using our endpoint configuration
export const api = {
  getFeaturedArticles: (limit?: number) => 
    fetchWithRetry<any[]>(`/articles/featured${limit ? `?limit=${limit}` : ''}`),
  
  getArticleBySlug: (slug: string) => 
    fetchWithRetry<any>(`/articles/${slug}`),
  
  getArticlesByCategory: (categorySlug: string) => 
    fetchWithRetry<any[]>(`/articles/category/${categorySlug}`),
  
  getArticlesByTag: (tagName: string) => 
    fetchWithRetry<any[]>(`/articles/tag/${encodeURIComponent(tagName)}`),
  
  getRelatedArticles: (category: string, excludeSlug: string) => 
    fetchWithRetry<any[]>(`/articles/related/${category}?excludeSlug=${excludeSlug}`),
  
  checkHealth: () => 
    fetchWithRetry<any>('/health')
};

// API helper function with retry mechanism
export async function fetchWithRetry<T>(
  endpoint: string, 
  config?: AxiosRequestConfig, 
  retries = 3
): Promise<T> {
  console.log(`Fetching from ${BASE_URL}${endpoint}`);
  
  let lastError;
  
  for (let i = 0; i <= retries; i++) {
    try {
      const response: AxiosResponse<T> = await apiClient.get(endpoint, config);
      return response.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      lastError = new Error(errorMessage);
      
      console.error(`Attempt ${i + 1} failed for ${endpoint}:`, errorMessage);
      
      // Only wait if we're going to retry
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError || new Error('Failed to fetch data after multiple attempts');
}

// Helper to extract meaningful error messages
function getErrorMessage(error: any): string {
  if (error.response) {
    return `Server error: ${error.response.status}`;
  } else if (error.request) {
    return 'Network error: No response received from server';
  } else {
    return `Request error: ${error.message}`;
  }
}
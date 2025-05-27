interface CachedData<T> {
  data: T;
  timestamp: number;
}

export const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const CACHE_KEYS = {
  FEATURED_ARTICLES: 'featuredArticles',
  ARTICLE_BY_SLUG: (slug: string) => `article_${slug}`,
  ARTICLES_BY_CATEGORY: (categorySlug: string) => `category_${categorySlug}`,
  NETWORK_STATUS: 'networkStatus',
  PENDING_SUBSCRIBERS: 'pendingSubscribers',
};

/**
 * Saves data to the browser's localStorage with timestamp
 * @param key The cache key
 * @param data The data to cache
 * @returns Boolean indicating success
 */
export function saveToCache<T>(key: string, data: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
    return true;
  } catch (e) {
    console.warn(`Failed to cache data for key ${key}:`, e);
    return false;
  }
}

/**
 * Retrieves data from cache if it's still valid (not expired)
 * @param key The cache key
 * @returns The cached data or null if not found/expired
 */
export function getFromCache<T>(key: string): T | null {
  try {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      const parsed = JSON.parse(cachedData) as CachedData<T>;
      
      // Use cached data if it's less than CACHE_DURATION old
      if (Date.now() - parsed.timestamp < CACHE_DURATION) {
        return parsed.data;
      }
    }
    return null;
  } catch (e) {
    console.error(`Error accessing cache for key ${key}:`, e);
    return null;
  }
}

/**
 * Removes an item from the cache
 * @param key The cache key
 */
export function removeFromCache(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Error removing item from cache for key ${key}:`, e);
  }
}

/**
 * Clears all cached data
 */
export function clearCache(): void {
  try {
    localStorage.clear();
  } catch (e) {
    console.error('Error clearing cache:', e);
  }
}
/**
 * Utility functions for handling article images
 */

export const DEFAULT_FALLBACK = 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg';

// Category-specific fallback images
export const CATEGORY_FALLBACKS: Record<string, string> = {
  'supreme-court': 'https://images.pexels.com/photos/1601299/pexels-photo-1601299.jpeg',
  'high-courts': 'https://images.pexels.com/photos/1182825/pexels-photo-1182825.jpeg',
  'bare-acts': 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg',
  'international': 'https://images.pexels.com/photos/1643479/pexels-photo-1643479.jpeg',
  'law-firms': 'https://images.pexels.com/photos/2451616/pexels-photo-2451616.jpeg',
  'news-updates': 'https://images.pexels.com/photos/6077368/pexels-photo-6077368.jpeg',
  'bureaus': 'https://images.pexels.com/photos/8112139/pexels-photo-8112139.jpeg',
};

/**
 * Get fallback image based on category
 */
export const getCategoryFallbackImage = (categorySlug?: string): string => {
  if (!categorySlug) return DEFAULT_FALLBACK;
  
  const normalizedSlug = categorySlug.toLowerCase().replace(/\s+/g, '-');
  return CATEGORY_FALLBACKS[normalizedSlug] || DEFAULT_FALLBACK;
};

/**
 * Get optimized image URL with proper parameters
 */
export const getOptimizedImageUrl = (url: string, width?: number): string => {
  if (!url) return DEFAULT_FALLBACK;
  
  try {
    // Process Pexels URLs to add optimization parameters
    if (url.includes('pexels.com')) {
      const urlObj = new URL(url);
      
      // Add quality and size parameters if they don't exist
      if (!urlObj.searchParams.has('auto')) {
        urlObj.searchParams.set('auto', 'compress');
      }
      
      if (!urlObj.searchParams.has('cs')) {
        urlObj.searchParams.set('cs', 'tinysrgb');
      }
      
      // Add width parameter if provided and not already set
      if (width && !urlObj.searchParams.has('w')) {
        urlObj.searchParams.set('w', width.toString());
      }
      
      return urlObj.toString();
    }
    
    // Return the original URL for other sources
    return url;
  } catch (error) {
    console.error('Error optimizing image URL:', error);
    return url;
  }
};

/**
 * Validate if a string is a valid image URL
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  
  try {
    const parsedUrl = new URL(url);
    const validProtocols = ['http:', 'https:'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    
    // Check for valid protocol
    if (!validProtocols.includes(parsedUrl.protocol)) return false;
    
    // Check for common image extensions
    const hasValidExtension = validExtensions.some(ext => 
      parsedUrl.pathname.toLowerCase().endsWith(ext)
    );
    
    // Check if it's from known image providers
    const isKnownProvider = 
      parsedUrl.hostname.includes('pexels.com') ||
      parsedUrl.hostname.includes('unsplash.com') ||
      parsedUrl.hostname.includes('images.unsplash.com') ||
      parsedUrl.hostname.includes('picsum.photos') ||
      parsedUrl.hostname.includes('cloudinary.com') ||
      parsedUrl.hostname.includes('imgur.com');
    
    return hasValidExtension || isKnownProvider;
  } catch (error) {
    return false;
  }
};

/**
 * Simple function to optimize an image - wrapper for getOptimizedImageUrl
 */
export const optimizeImage = (url: string, width?: number): string => {
  return getOptimizedImageUrl(url, width);
};
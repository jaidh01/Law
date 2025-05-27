import { useState, useEffect } from 'react';

interface ImageOptimizationOptions {
  placeholderColor?: string;
  retryCount?: number;
  retryDelay?: number;
  lowQualityFirst?: boolean;
}

/**
 * Custom hook for optimizing image loading
 * 
 * @param imageSrc Original image source URL
 * @param options Configuration options
 * @returns Object with image loading states and helper functions
 */
export function useImageOptimization(
  imageSrc: string, 
  options: ImageOptimizationOptions = {}
) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retries, setRetries] = useState(0);
  
  const {
    retryCount = 2,
    retryDelay = 2000,
    lowQualityFirst = false
  } = options;

  // Check if the device is on a slow connection
  const isSlowConnection = (): boolean => {
    if ('connection' in navigator && (navigator as any).connection) {
      const conn = (navigator as any).connection;
      return conn.effectiveType === 'slow-2g' || 
             conn.effectiveType === '2g' || 
             conn.saveData === true;
    }
    return false;
  };

  // Preload the image
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = (e) => reject(e);
    });
  };

  // Retry loading the image if it failed
  const retryLoading = async (): Promise<boolean> => {
    if (retries >= retryCount) {
      return false;
    }
    
    setRetries(prev => prev + 1);
    
    try {
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      
      // Attempt to preload the image
      await preloadImage(imageSrc);
      
      setLoaded(true);
      setError(null);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    }
  };

  // Check if browser supports modern image formats
  const supportsWebP = (): boolean => {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      // WebP support detection
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };

  // Get optimal image URL based on device capabilities and connection
  const getOptimalImageUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      
      // Add WebP format if supported
      if (supportsWebP()) {
        // Some CDNs support format conversion via query params
        // This is just an example; adjust according to your image CDN
        urlObj.searchParams.set('format', 'webp');
      }
      
      // Lower quality for slow connections if needed
      if (isSlowConnection() || lowQualityFirst) {
        urlObj.searchParams.set('quality', '60');
      }
      
      return urlObj.toString();
    } catch (e) {
      // If URL parsing fails, return the original URL
      return url;
    }
  };

  return {
    loaded,
    error,
    retries,
    isSlowConnection: isSlowConnection(),
    retryLoading,
    preloadImage,
    optimizedSrc: getOptimalImageUrl(imageSrc),
    originalSrc: imageSrc
  };
}

export default useImageOptimization;
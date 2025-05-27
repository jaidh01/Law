import React, { useEffect, useState, useRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: number | string;
  height?: number | string;
  threshold?: number;
  lowQuality?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg',
  width,
  height,
  threshold = 0.1,
  lowQuality = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  // Reset states when source changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Set up intersection observer for visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '200px 0px',  // Start loading 200px before it enters viewport
        threshold 
      }
    );

    if (imgContainerRef.current) {
      observer.observe(imgContainerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  // Check if device is on slow connection
  const isSlowConnection = () => {
    if ('connection' in navigator && (navigator as any).connection) {
      const conn = (navigator as any).connection;
      return conn.effectiveType === 'slow-2g' || 
             conn.effectiveType === '2g' || 
             conn.saveData === true;
    }
    return false;
  };

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Calculate aspect ratio if dimensions are provided
  const aspectRatio = (width && height && typeof width === 'number' && typeof height === 'number')
    ? `${(height / width) * 100}%`
    : undefined;

  return (
    <div
      ref={imgContainerRef}
      className="relative overflow-hidden"
      style={aspectRatio ? { paddingBottom: aspectRatio } : undefined}
    >
      {/* Placeholder shown during loading */}
      {(!isVisible || !isLoaded) && (
        <div className={`w-full h-full image-loading absolute inset-0 ${className}`}>
          {isSlowConnection() && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-neutral-400 text-sm">Loading...</span>
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className={`absolute inset-0 bg-neutral-100 flex flex-col items-center justify-center ${className}`}>
          <AlertCircle className="text-neutral-400 mb-2" size={24} />
          <span className="text-sm text-neutral-500">Image not available</span>
        </div>
      )}

      {/* Only render the actual image if the container is visible */}
      {isVisible && (
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading="eager" // We're manually handling lazy loading, so don't use browser's lazy loading
          decoding="async"
        />
      )}
    </div>
  );
};

export default LazyImage;
import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: string | number;
  height?: string | number;
  lazy?: boolean;
  priority?: boolean; // For critical images above the fold
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg',
  width,
  height,
  lazy = true,
  priority = false
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Reset states when source changes
  useEffect(() => {
    setImgSrc(src);
    setLoading(true);
    setError(false);
  }, [src]);

  // Detect slow connections to show better loading state
  const isSlowConnection = () => {
    if ('connection' in navigator && (navigator as any).connection) {
      const conn = (navigator as any).connection;
      return conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g';
    }
    return false;
  };

  // Use Intersection Observer for better lazy loading
  useEffect(() => {
    // Skip for priority images or if not using lazy loading
    if (priority || !lazy) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && imgRef.current) {
            // Only set the src when the image enters the viewport
            imgRef.current.setAttribute('src', imgSrc);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '200px', // Load images when they're 200px from viewport
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [imgSrc, lazy, priority]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  // Calculate aspect ratio placeholder if width and height are provided
  const aspectRatio = (width && height && typeof width === 'number' && typeof height === 'number') 
    ? `${(height / width) * 100}%` 
    : undefined;

  return (
    <div 
      className="relative overflow-hidden"
      style={aspectRatio ? { paddingBottom: aspectRatio } : undefined}
    >
      {/* Loading state */}
      {loading && (
        <div className={`absolute inset-0 image-loading flex items-center justify-center ${className}`}>
          {isSlowConnection() && (
            <div className="text-neutral-400 animate-pulse">Loading...</div>
          )}
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className={`absolute inset-0 bg-neutral-100 flex flex-col items-center justify-center ${className}`}>
          <AlertCircle className="text-neutral-400 mb-2" size={24} />
          <span className="text-sm text-neutral-500">Image not available</span>
        </div>
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={priority || !lazy ? imgSrc : ''}
        data-src={lazy && !priority ? imgSrc : undefined}
        alt={alt}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy && !priority ? "lazy" : "eager"}
        width={width}
        height={height}
      />
    </div>
  );
};

export default ImageWithFallback;
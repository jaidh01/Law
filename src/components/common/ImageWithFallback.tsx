import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  fallback = 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg',
  className,
  onLoad,
  onError
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
    if (onError) onError();
  };

  const handleLoad = () => {
    setLoading(false);
    if (onLoad) onLoad();
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
      )}
      <img 
        src={error ? fallback : src} 
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        className={className}
        style={loading ? { opacity: 0 } : {}}
      />
    </div>
  );
};

export default ImageWithFallback;
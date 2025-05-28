import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg',
  loading = 'lazy'
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isError, setIsError] = useState<boolean>(false);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setIsError(true);
    }
  };

  if (isError) {
    return (
      <div className={`bg-neutral-100 flex flex-col items-center justify-center p-4 ${className}`}>
        <AlertCircle className="text-neutral-400 mb-2" size={24} />
        <span className="text-sm text-neutral-500 text-center">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading={loading}
    />
  );
};

export default ImageWithFallback;
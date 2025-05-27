import React from 'react';

export type LoadingSize = 'tiny' | 'small' | 'medium' | 'large';
export type LoadingType = 'spinner' | 'dots' | 'pulse';

interface LoadingProps {
  size?: LoadingSize;
  type?: LoadingType;
  message?: string;
  fullscreen?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  type = 'spinner',
  message,
  fullscreen = false,
  className = ''
}) => {
  // Size mappings
  const sizeClasses = {
    tiny: 'h-4 w-4',
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-20 w-20'
  };

  // Container classes depending on fullscreen mode
  const containerClasses = fullscreen 
    ? 'fixed inset-0 bg-white bg-opacity-80 z-50 flex flex-col items-center justify-center' 
    : 'flex flex-col items-center justify-center py-6';

  // Render the correct loading indicator based on type
  const renderLoadingIndicator = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="flex space-x-2">
            <div className={`bg-primary-500 rounded-full animate-bounce ${size === 'tiny' ? 'h-2 w-2' : 'h-3 w-3'}`} style={{ animationDelay: '0ms' }}></div>
            <div className={`bg-primary-500 rounded-full animate-bounce ${size === 'tiny' ? 'h-2 w-2' : 'h-3 w-3'}`} style={{ animationDelay: '150ms' }}></div>
            <div className={`bg-primary-500 rounded-full animate-bounce ${size === 'tiny' ? 'h-2 w-2' : 'h-3 w-3'}`} style={{ animationDelay: '300ms' }}></div>
          </div>
        );
      case 'pulse':
        return (
          <div className={`bg-primary-500 rounded-md animate-pulse ${sizeClasses[size]}`}></div>
        );
      case 'spinner':
      default:
        return (
          <div className={`animate-spin rounded-full border-t-2 border-b-2 border-primary-500 ${sizeClasses[size]}`}></div>
        );
    }
  };

  return (
    <div className={`${containerClasses} ${className}`}>
      {renderLoadingIndicator()}
      {message && <p className={`mt-4 text-neutral-600 ${size === 'tiny' || size === 'small' ? 'text-xs' : 'text-sm sm:text-base'}`}>{message}</p>}
    </div>
  );
};

export default Loading;
import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Loading...', 
  size = 'medium' 
}) => {
  const spinnerSize = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  }[size];

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-primary-500 ${spinnerSize}`}></div>
      <p className="mt-4 text-neutral-600 text-sm sm:text-base">{message}</p>
    </div>
  );
};

export default LoadingIndicator;
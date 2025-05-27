import React from 'react';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...',
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} border-t-2 border-b-2 border-primary-500 mb-4`}
      ></div>
      {message && <p className="text-neutral-600">{message}</p>}
    </div>
  );
};
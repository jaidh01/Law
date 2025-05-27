import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  subtitle, 
  image, 
  link, 
  className = '', 
  children 
}) => {
  const cardContent = (
    <div className={`card ${className}`}>
      {image && (
        <div className="card-image">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-serif font-bold mb-2 line-clamp-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
  
  if (link) {
    return (
      <Link to={link} className="block card card-hover animate-slide-up">
        {cardContent}
      </Link>
    );
  }
  
  return cardContent;
};
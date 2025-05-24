import React from 'react';
import { ChefHat, BookOpen, Scale, Award, Book, Briefcase, Globe } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  type?: 'cooking' | 'writing' | 'legal' | 'education' | 'knowThelaw' | 'lawfirm' | 'international' | 'generic';
  imageUrl?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = "Articles are cooking!", 
  message = "Our legal experts are preparing fresh content for this section.", 
  type = 'cooking',
  imageUrl
}) => {
  // Default images based on type
  const defaultImages = {
    legal: "https://images.unsplash.com/photo-1589994965851-a4f21eeeb25e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    cooking: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    writing: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    education: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    knowThelaw: "https://images.unsplash.com/photo-1622485856769-a97d194b2a71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    lawfirm: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    international: "https://images.unsplash.com/photo-1519475889208-0968e5438f7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    generic: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  };

  // Choose icon based on type
  const getIcon = () => {
    switch(type) {
      case 'legal': return <Scale size={32} className="text-primary-500" />;
      case 'cooking': return <ChefHat size={32} className="text-primary-500 animate-bounce-slow" />;
      case 'writing': return <BookOpen size={32} className="text-primary-500 animate-writing" />;
      case 'education': return <Award size={32} className="text-primary-500" />;
      case 'knowThelaw': return <Book size={32} className="text-primary-500" />;
      case 'lawfirm': return <Briefcase size={32} className="text-primary-500" />;
      case 'international': return <Globe size={32} className="text-primary-500" />;
      default: return <BookOpen size={32} className="text-primary-500" />;
    }
  };

  // Choose the hero icon for the header
  const getHeroIcon = () => {
    switch(type) {
      case 'legal': return <Scale size={80} className="text-white opacity-90" />;
      case 'cooking': return <ChefHat size={80} className="text-white opacity-90" />;
      case 'writing': return <BookOpen size={80} className="text-white opacity-90" />;
      case 'education': return <Award size={80} className="text-white opacity-90" />;
      case 'knowThelaw': return <Book size={80} className="text-white opacity-90" />;
      case 'lawfirm': return <Briefcase size={80} className="text-white opacity-90" />;
      case 'international': return <Globe size={80} className="text-white opacity-90" />;
      default: return <BookOpen size={80} className="text-white opacity-90" />;
    }
  };

  // Get the right image URL, using provided one or default based on type
  const imageSource = imageUrl || defaultImages[type] || defaultImages.generic;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-primary-900 to-primary-700 relative overflow-hidden">
          <img 
            src={imageSource}
            alt={`${type} content`}
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {getHeroIcon()}
          </div>
        </div>
      </div>
      
      <div className="p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
            {getIcon()}
          </div>
        </div>
        
        <h2 className="text-2xl font-serif font-bold mb-2">{title}</h2>
        <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">{message}</p>
        
        <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
          <span className="block w-2 h-2 rounded-full bg-primary-300 animate-pulse"></span>
          <span className="block w-2 h-2 rounded-full bg-primary-300 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
          <span className="block w-2 h-2 rounded-full bg-primary-300 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
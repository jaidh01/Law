import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found | LiveLaw';
  }, []);
  
  return (
    <div className="container-custom py-16 text-center">
      <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Page Not Found</h2>
      <p className="text-neutral-600 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary inline-block">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { navigationItems } from '../data/navigation';

const CourtsHubPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Courts | Legal Nest';
  }, []);
  
  // Find the courts navigation item
  const courtsNav = navigationItems.find(item => item.title === 'Courts');
  const courtsList = courtsNav?.children || [];
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">Courts</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold mb-4">Supreme Court</h2>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <Link 
            to="/courts/supreme-court" 
            className="text-xl font-serif font-bold text-primary-600 hover:underline"
          >
            Supreme Court of India
          </Link>
          <p className="mt-2 text-neutral-600">
            Latest judgments, orders, news and updates from the Supreme Court of India.
          </p>
        </div>
      </div>
      
      <h2 className="text-2xl font-serif font-bold mb-4">High Courts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courtsList.filter(court => court.title !== 'Supreme Court').map((court) => (
          <div key={court.url} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link 
              to={court.url} 
              className="text-lg font-serif font-bold text-primary-600 hover:underline"
            >
              {court.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtsHubPage;
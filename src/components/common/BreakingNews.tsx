import React from 'react';
import { AlertCircle } from 'lucide-react';
import { breakingNewsItems } from '../../data/news';

const BreakingNews: React.FC = () => {
  if (breakingNewsItems.length === 0) return null;
  
  return (
    <div className="bg-primary-500 text-white py-2">
      <div className="container-custom">
        <div className="flex items-center overflow-hidden">
          <div className="flex items-center mr-4 shrink-0">
            <AlertCircle size={16} className="mr-2" />
            <span className="font-bold">BREAKING:</span>
          </div>
          <div className="ticker-container overflow-hidden relative">
            <div className="ticker-wrapper whitespace-nowrap animate-ticker">
              {breakingNewsItems.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="inline-block">{item.title}</span>
                  {index < breakingNewsItems.length - 1 && (
                    <span className="mx-4 inline-block">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
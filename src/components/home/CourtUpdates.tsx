import React from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { courtUpdates } from '../../data/judgments';

const CourtUpdates: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold">Court Updates</h2>
        <Link to="/judgments" className="text-primary-500 hover:underline font-medium">
          View All
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {courtUpdates.slice(0, 5).map((judgment, index) => (
          <div 
            key={judgment.id}
            className={`p-4 md:p-6 ${
              index < courtUpdates.slice(0, 5).length - 1 ? 'border-b border-neutral-200' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded">
                    {judgment.court}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {formatDistanceToNow(new Date(judgment.date), { addSuffix: true })}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">
                  <Link to={`/judgment/${judgment.slug}`} className="hover:text-primary-500 transition-colors">
                    {judgment.title}
                  </Link>
                </h3>
                <p className="text-neutral-600 text-sm line-clamp-2">
                  {judgment.summary}
                </p>
              </div>
              
              <div className="shrink-0">
                <a 
                  href={`/judgments/${judgment.pdfFile}`}
                  className="inline-flex items-center px-4 py-2 border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  PDF
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtUpdates;
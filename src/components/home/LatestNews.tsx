import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { latestArticles } from '../../data/articles';

const LatestNews: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold">Latest News</h2>
        <Link to="/category/latest" className="text-primary-500 hover:underline font-medium">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestArticles.slice(0, 6).map((article) => (
          <article key={article.id} className="card card-hover animate-slide-up">
            <Link to={`/article/${article.slug}`} className="block">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <Link 
                to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block text-xs font-medium text-accent-500 mb-2"
              >
                {article.category}
              </Link>
              <h3 className="text-lg font-serif font-bold mb-2 line-clamp-2">
                <Link to={`/article/${article.slug}`} className="hover:text-primary-500 transition-colors">
                  {article.title}
                </Link>
              </h3>
              <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center text-xs text-neutral-500">
                <span>{article.author}</span>
                <span className="mx-2">•</span>
                <time dateTime={article.date}>
                  {formatDistanceToNow(new Date(article.date), { addSuffix: true })}
                </time>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
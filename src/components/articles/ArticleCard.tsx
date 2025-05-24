import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../../types/article';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="card card-hover animate-slide-up">
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
  );
};

export default ArticleCard;
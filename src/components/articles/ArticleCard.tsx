import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../../types/article';
import { ROUTES } from '../../constants/routes';
import ImageWithFallback from '../common/ImageWithFallback';
import { optimizeImage } from '../../utils/imageUtils';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Get category slug for fallback
  const categorySlug = article.category ? article.category.toLowerCase().replace(/\s+/g, '-') : undefined;
  
  // Optimize the image URL
  const optimizedImageUrl = optimizeImage(article.image, 600);
  
  return (
    <article className="card card-hover animate-slide-up">
      <Link to={article.slug ? ROUTES.ARTICLE_BY_SLUG(article.slug) : '#'} className="block w-full">
        <div className="aspect-video w-full overflow-hidden">
          <ImageWithFallback 
            src={optimizedImageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform"
            fallbackSrc={`https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg`}
          />
        </div>
      </Link>
      <div className="p-4 sm:p-5">
        <Link 
          to={article.category ? ROUTES.CATEGORY_BY_SLUG(article.category.toLowerCase().replace(/\s+/g, '-')) : '#'}
          className="inline-block text-xs font-medium text-accent-500 mb-2"
        >
          {article.category}
        </Link>
        <h3 className="text-base sm:text-lg font-serif font-bold mb-2 line-clamp-2 h-auto sm:h-14">
          <Link to={article.slug ? ROUTES.ARTICLE_BY_SLUG(article.slug) : '#'} className="hover:text-primary-500 transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2 hidden sm:block">
          {article.excerpt}
        </p>
        <div className="flex items-center text-xs text-neutral-500">
          <span className="truncate max-w-[100px]">{article.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={article.date} className="whitespace-nowrap">
            {formatDistanceToNow(new Date(article.date), { addSuffix: true })}
          </time>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
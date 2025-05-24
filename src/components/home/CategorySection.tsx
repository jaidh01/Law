import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { fetchArticlesByCategory } from '../../services/articleService';
import { Article } from '../../types/article';
import { ChefHat } from 'lucide-react';
import EmptyState from '../common/EmptyState';

interface CategorySectionProps {
  title: string;
  categorySlug: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, categorySlug }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticlesByCategory(categorySlug);
        setArticles(data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load ${title} articles`);
        setLoading(false);
      }
    };

    loadArticles();
  }, [categorySlug, title]);

  if (loading) {
    return <div className="mb-12 h-40 bg-gray-100 rounded-lg flex items-center justify-center">Loading {title} articles...</div>;
  }

  if (error) {
    return <div className="mb-12 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-red-500">{error}</div>;
  }

  if (articles.length === 0) {
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold">{title}</h2>
          <Link to={`/category/${categorySlug}`} className="text-primary-500 hover:underline font-medium">
            View All
          </Link>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
              <ChefHat size={24} className="text-primary-500" />
            </div>
            <div>
              <h3 className="font-serif font-bold">Content Cooking!</h3>
              <p className="text-sm text-neutral-600">Fresh {title} articles coming soon</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1, 5);
  
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold">{title}</h2>
        <Link to={`/category/${categorySlug}`} className="text-primary-500 hover:underline font-medium">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <article className="card overflow-hidden animate-slide-up">
            <Link to={`/article/${featuredArticle.slug}`} className="block">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                className="w-full h-64 object-cover"
              />
            </Link>
            <div className="p-5">
              <h3 className="text-xl font-serif font-bold mb-3">
                <Link to={`/article/${featuredArticle.slug}`} className="hover:text-primary-500 transition-colors">
                  {featuredArticle.title}
                </Link>
              </h3>
              <p className="text-neutral-600 mb-4">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center text-sm text-neutral-500">
                <span>{featuredArticle.author}</span>
                <span className="mx-2">•</span>
                <time dateTime={featuredArticle.date.toString()}>
                  {formatDistanceToNow(new Date(featuredArticle.date), { addSuffix: true })}
                </time>
              </div>
            </div>
          </article>
        </div>
        
        <div className="space-y-4">
          {otherArticles.map((article) => (
            <article key={article.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow animate-slide-up">
              <Link to={`/article/${article.slug}`} className="shrink-0">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-20 h-20 object-cover rounded"
                />
              </Link>
              <div className="min-w-0">
                <h3 className="text-base font-serif font-bold mb-1 line-clamp-2">
                  <Link to={`/article/${article.slug}`} className="hover:text-primary-500 transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <div className="flex items-center text-xs text-neutral-500">
                  <time dateTime={article.date.toString()}>
                    {formatDistanceToNow(new Date(article.date), { addSuffix: true })}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesByCategory } from '../services/articleService';
import { Article } from '../types/article';
import ArticleCard from '../components/articles/ArticleCard';
import EmptyState from '../components/common/EmptyState';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const categoryName = categorySlug
    ? categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';
    
  useEffect(() => {
    const loadArticles = async () => {
      if (!categorySlug) return;
      
      try {
        setLoading(true);
        const data = await fetchArticlesByCategory(categorySlug);
        setArticles(data);
        document.title = `${categoryName} News | LiveLaw`;
      } catch (err) {
        setError(`Failed to load ${categoryName} articles`);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [categorySlug, categoryName]);
  
  if (loading) {
    return (
      <div className="container-custom py-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">
          {categoryName}
        </h1>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading articles...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          {categoryName}
        </h1>
        <p className="text-neutral-600">
          Latest news, articles, and updates from {categoryName}.
        </p>
      </div>
      
      {error && (
        <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-8">
          {error}
        </div>
      )}
      
      {!error && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title={`${categoryName} Articles Coming Soon!`}
          message="Our editorial team is cooking up some high-quality content for this category. Check back soon!"
          type="cooking"
        />
      )}
    </div>
  );
};

export default CategoryPage;
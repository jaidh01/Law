import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesByTag } from '../services/articleService';
import { Article } from '../types/article';
import ArticleCard from '../components/articles/ArticleCard';
import EmptyState from '../components/common/EmptyState';

const CourtPage: React.FC = () => {
  const { courtSlug } = useParams<{ courtSlug: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Convert court slug to display name (e.g., "delhi-high-court" → "Delhi High Court")
  const courtName = courtSlug
    ? courtSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';
    
  useEffect(() => {
    const loadArticles = async () => {
      if (!courtSlug) return;
      
      try {
        setLoading(true);
        
        // Find articles that have tags related to this court
        // Using the court name as a tag to filter articles
        const data = await fetchArticlesByTag(courtName);
        setArticles(data);
        document.title = `${courtName} News & Updates | LiveLaw`;
      } catch (err) {
        setError(`Failed to load ${courtName} articles`);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [courtSlug, courtName]);
  
  if (loading) {
    return (
      <div className="container-custom py-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">
          {courtName}
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
          {courtName}
        </h1>
        <p className="text-neutral-600">
          Latest news, judgments, and updates from {courtName}.
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
          title={`Fresh ${courtName} Updates Coming Soon!`} 
          message={`Our legal experts are carefully preparing authoritative content on ${courtName} judgments and orders. Check back soon for the latest updates.`}
          type="legal" // Changed from 'writing' to 'legal'
        />
      )}
    </div>
  );
};

export default CourtPage;
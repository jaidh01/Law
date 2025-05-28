import { useState, useEffect } from 'react';
import { Article } from '../types/article';
import { fetchArticleBySlug, fetchArticlesByCategory, fetchRelatedArticles } from '../services/articleService';
import { validateSlug } from '../utils/slugUtils';

export function useArticle(slug: string | undefined) {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const validSlug = validateSlug(slug);
    if (!validSlug) {
      setError('Invalid article slug');
      setLoading(false);
      return;
    }
    
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const articleData = await fetchArticleBySlug(validSlug);
        
        if (articleData) {
          setArticle(articleData);
          document.title = `${articleData.title} | Legal Nest`;
          
          if (articleData.category) {
            const related = await fetchRelatedArticles(articleData.category, validSlug);
            setRelatedArticles(related);
          }
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };
    
    loadArticle();
  }, [slug]);
  
  return { article, relatedArticles, loading, error };
}
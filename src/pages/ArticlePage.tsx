import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark, Printer, Facebook, Twitter, Linkedin } from 'lucide-react';
import { format } from 'date-fns';
import { fetchArticleBySlug, fetchRelatedArticles } from '../services/articleService';
import { Article } from '../types/article';
import ArticleCard from '../components/articles/ArticleCard';

const ArticlePage: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadArticle = async () => {
      if (!articleSlug) return;
      
      try {
        setLoading(true);
        const articleData = await fetchArticleBySlug(articleSlug);
        
        if (articleData) {
          setArticle(articleData);
          document.title = `${articleData.title} | LiveLaw`;
          window.scrollTo(0, 0);
          
          // Fetch related articles
          if (articleData.category) {
            const related = await fetchRelatedArticles(articleData.category, articleSlug);
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
  }, [articleSlug]);
  
  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading article...</p>
        </div>
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Article Not Found</h1>
        <p className="text-neutral-600 mb-6">
          The article you are looking for does not exist or has been removed.
        </p>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <Link to="/" className="inline-flex items-center text-neutral-500 hover:text-primary-500 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to Home
      </Link>
      
      <article>
        <header className="mb-8">
          <Link 
            to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded mb-4"
          >
            {article.category}
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-neutral-600 mb-6">
            <span className="font-medium">{article.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={article.date.toString()}>
              {format(new Date(article.date), 'MMMM d, yyyy')}
            </time>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="inline-flex items-center px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm transition-colors">
              <Share2 size={14} className="mr-1" />
              Share
            </button>
            <button className="inline-flex items-center px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm transition-colors">
              <Bookmark size={14} className="mr-1" />
              Save
            </button>
            <button className="inline-flex items-center px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm transition-colors">
              <Printer size={14} className="mr-1" />
              Print
            </button>
          </div>
          
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-auto max-h-[500px] object-cover rounded-lg"
          />
          {article.imageCaption && (
            <p className="text-sm text-neutral-500 mt-2 text-center">
              {article.imageCaption}
            </p>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none mb-8">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        
        {article.pdf_url && (
          <div className="mb-8 p-4 border border-primary-100 rounded-lg bg-primary-50">
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <a href={article.pdf_url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                Download PDF version of this judgment
              </a>
            </p>
          </div>
        )}
        
        <footer className="mt-12 pt-6 border-t border-neutral-200">
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="text-neutral-700 font-medium">Share this article:</span>
            <div className="flex gap-2">
              <a href="#" className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div className="bg-neutral-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-serif font-bold">{article.author.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-serif font-bold">{article.author}</h3>
                <p className="text-sm text-neutral-600">Legal Correspondent</p>
              </div>
            </div>
            <p className="text-neutral-700">
              {article.authorBio || `${article.author} is a legal correspondent at LiveLaw covering the latest developments in the legal field.`}
            </p>
          </div>
        </footer>
      </article>
      
      {relatedArticles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
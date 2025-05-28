import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { formatDistanceToNow } from 'date-fns';
import { fetchFeaturedArticles } from '../../services/articleService';
import { Article } from '../../types/article';
import { RefreshCcw } from 'lucide-react';
import Loading from '../common/Loading';
import ImageWithFallback from '../common/ImageWithFallback';
import { ROUTES } from '../../constants/routes'; // Add this import

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Add custom CSS for the pagination bullets
import './FeaturedSlider.css';

interface FeaturedSliderProps {
  maxArticles?: number; // New prop to control the maximum number of articles
}

const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ maxArticles = 5 }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Try to get articles from localStorage on component mount
  useEffect(() => {
    const cachedArticles = localStorage.getItem('featuredArticles');
    if (cachedArticles) {
      try {
        const parsedArticles = JSON.parse(cachedArticles);
        setArticles(parsedArticles.slice(0, maxArticles));
        // We still fetch fresh data but at least we show something immediately
      } catch (e) {
        // Invalid cached data - we'll rely on the fetch
      }
    }
  }, [maxArticles]);

  useEffect(() => {
    const loadFeaturedArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedArticles(maxArticles);
        
        // Cache the results for future use
        localStorage.setItem('featuredArticles', JSON.stringify(data));
        
        setArticles(data.slice(0, maxArticles));
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error('Featured article fetch error:', err);
        
        // Check if we have cached articles already displayed
        if (articles.length > 0) {
          // We have cached articles, so just stop loading
          setLoading(false);
        } else {
          setError('Failed to load featured articles');
          setLoading(false);
        }
      }
    };

    loadFeaturedArticles();
  }, [maxArticles, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  // For improved mobile loading, use a fallback UI if there's an error but we have cached data
  if (error && articles.length === 0) {
    return (
      <div className="mb-12 rounded-xl overflow-hidden h-[300px] sm:h-[400px] bg-neutral-50 flex flex-col items-center justify-center text-center p-6">
        <p className="text-neutral-600 mb-4">Unable to load the latest articles.</p>
        <button 
          onClick={handleRetry} 
          className="btn btn-primary inline-flex items-center"
        >
          <RefreshCcw size={16} className="mr-2" />
          Retry
        </button>
      </div>
    );
  }

  if (loading && articles.length === 0) {
    return (
      <div className="mb-12 rounded-xl overflow-hidden h-[300px] sm:h-[400px] bg-neutral-100 flex items-center justify-center">
        <Loading size="medium" message="Loading featured articles..." />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="mb-12 rounded-xl overflow-hidden h-[300px] sm:h-[400px] bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-600">No featured articles available</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
        }}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false
        }}
        className="rounded-xl overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] featured-slider"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <div className="relative h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                <Link 
                  to={article.category ? ROUTES.CATEGORY_BY_SLUG(article.category.toLowerCase().replace(/\s+/g, '-')) : '#'}
                  className="inline-block px-3 py-1 bg-accent-500 text-white text-xs sm:text-sm font-medium rounded mb-2 sm:mb-3"
                >
                  {article.category}
                </Link>

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-white line-clamp-2">
                  <Link to={article.slug ? ROUTES.ARTICLE_BY_SLUG(article.slug) : '#'} className="hover:underline">
                    {article.title}
                  </Link>
                </h2>
                <p className="text-neutral-200 mb-3 sm:mb-4 max-w-2xl line-clamp-2 hidden sm:block">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-xs sm:text-sm text-neutral-300">
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={article.date}>
                    {formatDistanceToNow(new Date(article.date), { addSuffix: true })}
                  </time>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedSlider;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { formatDistanceToNow } from 'date-fns';
import { fetchFeaturedArticles } from '../../services/articleService';
import { Article } from '../../types/article';

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

  useEffect(() => {
    const loadFeaturedArticles = async () => {
      try {
        const data = await fetchFeaturedArticles();
        // Limit the number of articles to display
        setArticles(data.slice(0, maxArticles));
        setLoading(false);
      } catch (err) {
        setError('Failed to load featured articles');
        setLoading(false);
      }
    };

    loadFeaturedArticles();
  }, [maxArticles]);

  if (loading) {
    return <div className="h-[400px] bg-gray-200 rounded-xl flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-[400px] bg-gray-100 rounded-xl flex items-center justify-center text-red-500">{error}</div>;
  }

  if (articles.length === 0) {
    return <div className="h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">No featured articles found</div>;
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
        className="rounded-xl overflow-hidden h-[400px] md:h-[500px] featured-slider"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <div className="relative h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <Link 
                  to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-block px-3 py-1 bg-accent-500 text-white text-sm font-medium rounded mb-3"
                >
                  {article.category}
                </Link>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                  <Link to={`/article/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </h2>
                <p className="text-neutral-200 mb-4 max-w-2xl">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm text-neutral-300">
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
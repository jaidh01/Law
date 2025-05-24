import React, { useEffect } from 'react';
import FeaturedSlider from '../components/home/FeaturedSlider';
// import LatestNews from '../components/home/LatestNews';
// import CourtUpdates from '../components/home/CourtUpdates';
import SubscribeSection from '../components/home/SubscribeSection';
import CategorySection from '../components/home/CategorySection';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'LiveLaw - Legal News, Law Judgments, Law Firms News, Law School News';
  }, []);

  return (
    <div>
      <div className="container-custom py-8">
        <FeaturedSlider maxArticles={4} />
        <CategorySection 
          title="Supreme Court" 
          categorySlug="supreme-court"
        />
        <CategorySection 
          title="High Courts" 
          categorySlug="high-courts"
        />
        <CategorySection 
          title="News Updates" 
          categorySlug="news-updates"
        />
        <SubscribeSection />
        <CategorySection
          title="International"
          categorySlug="international"
        />
        <CategorySection
          title="Bare Acts"
          categorySlug="bare-acts"
        />
      </div>
    </div>
  );
};

export default HomePage;
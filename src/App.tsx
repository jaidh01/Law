import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import CourtPage from './pages/CourtPage';
import CourtsHubPage from './pages/CourtsHubPage'; 
import LawFirmsPage from './pages/LawFirmsPage';
import NetworkStatus from './components/common/NetworkStatus';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/article/:articleSlug" element={<ArticlePage />} />
        <Route path="/courts/:courtSlug" element={<CourtPage />} />
        <Route path="/courts" element={<CourtsHubPage />} />
        {/* Law Firms routes */}
        <Route path="/law-firms" element={<LawFirmsPage />} />
        <Route path="/law-firms/:subsection" element={<LawFirmsPage />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <NetworkStatus />
    </Layout>
  );
}

export default App;
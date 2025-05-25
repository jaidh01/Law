import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';

const LawFirmsPage: React.FC = () => {
  const { subsection } = useParams<{ subsection?: string }>();
  
  // Convert subsection slug to display name
  let subsectionName = '';
  let pageTitle = 'Law Firms';
  
  if (subsection) {
    subsectionName = subsection
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    pageTitle = `${subsectionName} - Law Firms`;
  }
  
  useEffect(() => {
    document.title = `${pageTitle} | Legal Nest`;
  }, [pageTitle]);
  
  // Custom messages based on subsection
  const getCustomContent = () => {
    switch(subsection) {
      case 'deals':
        return {
          title: "Law Firm Deal News Coming Soon",
          message: "Stay tuned for the latest updates on major deals, mergers, acquisitions, and transactions handled by leading law firms in India and globally."
        };
      case 'events':
        return {
          title: "Law Firm Events Coming Soon",
          message: "Our calendar of webinars, conferences, workshops, and networking events organized by top law firms is being curated by our team."
        };
      case 'foreign':
        return {
          title: "Foreign Law Firms Section Coming Soon",
          message: "We're preparing comprehensive profiles, updates, and insights about foreign law firms operating in India or working with Indian clients and businesses."
        };
      case 'internships':
        return {
          title: "Law Firm Internship Information Coming Soon",
          message: "Our team is compiling a database of internship opportunities at top law firms, along with application guides and tips for securing prestigious positions."
        };
      default:
        return {
          title: "Law Firms Section Coming Soon",
          message: "Stay tuned for comprehensive coverage of the legal industry, including law firm news, deals, rankings, hiring trends, and more."
        };
    }
  };
  
  const content = getCustomContent();
  
  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          {subsection ? `${subsectionName} - Law Firms` : 'Law Firms'}
        </h1>
        <p className="text-neutral-600">
          {subsection ? 
            `Latest news and updates about ${subsectionName.toLowerCase()} in the legal industry.` : 
            'Coverage of major law firms, legal industry trends, deals, and career opportunities.'}
        </p>
      </div>
      
      <EmptyState 
        title={content.title}
        message={content.message}
        type="lawfirm"
      />
    </div>
  );
};

export default LawFirmsPage;
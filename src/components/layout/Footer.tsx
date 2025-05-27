import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import Logo from '../common/Logo';
import { subscribeToNewsletter } from '../../services/domain/subscribeService';

const Footer: React.FC = () => {
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribeStatus, setFooterSubscribeStatus] = useState('idle');
  const [footerMessage, setFooterMessage] = useState('');

  const handleFooterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!footerEmail || !footerEmail.includes('@')) {
      setFooterMessage('Please enter a valid email');
      return;
    }
    
    setFooterSubscribeStatus('loading');
    
    try {
      const result = await subscribeToNewsletter(footerEmail);
      
      if (result.success) {
        setFooterSubscribeStatus('success');
        setFooterMessage('Subscribed successfully!');
        setFooterEmail('');
      } else {
        setFooterSubscribeStatus('error');
        setFooterMessage(result.message);
      }
      
      // Reset after 3 seconds
      setTimeout(() => {
        setFooterSubscribeStatus('idle');
        setFooterMessage('');
      }, 3000);
    } catch (error) {
      setFooterSubscribeStatus('error');
      setFooterMessage('Failed to subscribe');
      
      setTimeout(() => {
        setFooterSubscribeStatus('idle');
        setFooterMessage('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <Logo variant="light" />
            </div>
            <p className="text-neutral-300 mb-4">
              Legal Nest is India's leading legal news portal providing updates on judgments, 
              legal developments, law firms, and law schools.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-neutral-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-neutral-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-neutral-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-neutral-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/supreme-court" className="text-neutral-300 hover:text-white transition-colors">Supreme Court</Link></li>
              <li><Link to="/high-courts" className="text-neutral-300 hover:text-white transition-colors">High Courts</Link></li>
              <li><Link to="/bare-acts" className="text-neutral-300 hover:text-white transition-colors">Bare Acts</Link></li>
              <li><Link to="/law-firms" className="text-neutral-300 hover:text-white transition-colors">Law Firms</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-neutral-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="text-neutral-300 hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link to="/advertise" className="text-neutral-300 hover:text-white transition-colors">Advertise</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-4">Newsletter</h4>
            <p className="text-neutral-300 mb-4">
              Subscribe to our newsletter for daily legal updates and news.
            </p>
            <form className="space-y-3" onSubmit={handleFooterSubscribe}>
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
                  disabled={footerSubscribeStatus === 'loading'}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-full flex items-center justify-center"
                disabled={footerSubscribeStatus === 'loading'}
              >
                {footerSubscribeStatus === 'loading' ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                ) : (
                  <Mail size={16} className="mr-2" />
                )}
                Subscribe
              </button>
              {footerMessage && (
                <p className={`text-sm ${
                  footerSubscribeStatus === 'success' ? 'text-green-400' : 
                  footerSubscribeStatus === 'error' ? 'text-red-400' : ''
                }`}>
                  {footerMessage}
                </p>
              )}
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-6 text-center text-neutral-400 text-sm">
          <p>© {new Date().getFullYear()} Legal Nest. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
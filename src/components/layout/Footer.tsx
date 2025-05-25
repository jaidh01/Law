import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import Logo from '../common/Logo';

const Footer: React.FC = () => {
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
            <h4 className="text-white font-serif text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/supreme-court" className="text-neutral-300 hover:text-white transition-colors">Supreme Court</Link></li>
              <li><Link to="/category/high-courts" className="text-neutral-300 hover:text-white transition-colors">High Courts</Link></li>
              <li><Link to="/category/tribunals" className="text-neutral-300 hover:text-white transition-colors">Tribunals</Link></li>
              <li><Link to="/category/columns" className="text-neutral-300 hover:text-white transition-colors">Columns</Link></li>
              <li><Link to="/category/interviews" className="text-neutral-300 hover:text-white transition-colors">Interviews</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="text-neutral-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact-us" className="text-neutral-300 hover:text-white transition-colors">Contact Us</Link></li>
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
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full flex items-center justify-center">
                <Mail size={16} className="mr-2" />
                Subscribe
              </button>
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
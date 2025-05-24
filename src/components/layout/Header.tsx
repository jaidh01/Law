import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Globe, User } from 'lucide-react';
import { navigationItems } from '../../data/navigation';
import Logo from '../common/Logo';
import SearchBar from '../common/SearchBar';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  
  // Add a delay timer state to prevent immediate closing of dropdown
  const [dropdownTimer, setDropdownTimer] = useState<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clear any existing timers when component unmounts
      if (dropdownTimer) clearTimeout(dropdownTimer);
    };
  }, [dropdownTimer]);
  
  // Improved dropdown handling with delay
  const handleDropdownEnter = (title: string) => {
    // Clear any existing timers
    if (dropdownTimer) clearTimeout(dropdownTimer);
    setActiveDropdown(title);
  };
  
  const handleDropdownLeave = () => {
    // Set a delay before closing the dropdown
    const timer = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay gives user time to move to dropdown
    
    setDropdownTimer(timer);
  };

  // Cancel the timer if user moves back to dropdown
  const handleDropdownContentEnter = () => {
    if (dropdownTimer) {
      clearTimeout(dropdownTimer);
      setDropdownTimer(null);
    }
  };
  
  // Profile menu toggle
  const toggleProfileMenu = () => {
    setProfileOpen(!profileOpen);
  };
  
  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95'
    }`}>
      <div className="container-custom">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-neutral-200">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/hindi" className="flex items-center text-sm text-neutral-600 hover:text-primary-500">
              <Globe size={16} className="mr-1" />
              हिंदी
            </Link>
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <Search size={20} className="text-neutral-700" />
            </button>
            
            <Link to="/gift-premium" className="btn btn-outline text-sm flex items-center">
              Gift Premium
            </Link>
            <Link to="/subscribe" className="btn btn-primary text-sm">
              Subscribe
            </Link>
            
            {/* Profile Icon - Now after Subscribe button */}
            <div className="relative">
              <button 
                onClick={toggleProfileMenu}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="User profile"
              >
                <User size={20} className="text-neutral-700" />
              </button>
              
              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white shadow-lg rounded-md py-2 animate-fade-in z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-neutral-100">
                    My Profile
                  </Link>
                  <Link to="/saved-articles" className="block px-4 py-2 hover:bg-neutral-100">
                    Saved Articles
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-neutral-100">
                    Settings
                  </Link>
                  <hr className="my-2" />
                  <Link to="/logout" className="block px-4 py-2 text-accent-500 hover:bg-neutral-100">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <button 
            className="md:hidden p-2 text-neutral-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Main navigation - Desktop */}
        <nav className="hidden md:block py-4">
          <ul className="flex space-x-6">
            {navigationItems.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <div 
                    className="relative flex items-center cursor-pointer nav-link"
                    onMouseEnter={() => handleDropdownEnter(item.title)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <span>{item.title}</span>
                    <ChevronDown size={16} className="ml-1" />
                    
                    {activeDropdown === item.title && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-56 bg-white shadow-lg rounded-md py-2 animate-fade-in z-50"
                        onMouseEnter={handleDropdownContentEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            to={child.url}
                            className="block px-4 py-2 hover:bg-neutral-100"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={item.url} className="nav-link">
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[78px] bg-white z-40 animate-fade-in overflow-y-auto">
            <nav className="container-custom py-6">
              <ul className="space-y-6">
                {navigationItems.map((item) => (
                  <li key={item.title}>
                    {item.children ? (
                      <div>
                        <div 
                          className="flex justify-between items-center"
                          onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                        >
                          <span className="font-medium text-lg text-neutral-900">{item.title}</span>
                          <ChevronDown 
                            size={20} 
                            className={`transform transition-transform ${
                              activeDropdown === item.title ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                        
                        {activeDropdown === item.title && (
                          <ul className="mt-4 ml-4 space-y-4">
                            {item.children.map((child) => (
                              <li key={child.title}>
                                <Link
                                  to={child.url}
                                  className="block nav-link"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.url}
                        className="block font-medium text-lg text-neutral-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              
              {/* Mobile profile section - Updated order */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <Link 
                  to="/subscribe" 
                  className="block w-full btn btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Subscribe
                </Link>
                <Link 
                  to="/profile" 
                  className="block w-full btn btn-outline text-center flex items-center justify-center mt-3 mb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  My Profile
                </Link>
                <button 
                  className="mt-4 w-full btn btn-outline flex items-center justify-center"
                  onClick={() => {
                    setSearchOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Search size={20} className="mr-2" />
                  Search
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Search overlay */}
      {searchOpen && (
        <SearchBar onClose={() => setSearchOpen(false)} />
      )}
    </header>
  );
};

export default Header;
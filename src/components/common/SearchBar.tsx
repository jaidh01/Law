import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Focus the input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Add escape key listener to close search
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', query);
    // For now, just close the search
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-start justify-center pt-20 z-50 animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-serif font-bold">Search Legal Nest</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X size={24} className="text-neutral-700" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for news, judgments, or articles..."
            className="form-input text-lg"
          />
          <div className="mt-4 flex justify-end">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
        
        {query && (
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <p className="text-sm text-neutral-500 mb-2">
              Popular searches:
            </p>
            <div className="flex flex-wrap gap-2">
              {['Supreme Court', 'Constitution', 'Criminal Law', 'Family Law', 'Property Law'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
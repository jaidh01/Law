import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

interface LogoProps {
  variant?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-primary-500';
  
  return (
    <Link to="/" className="flex items-center">
      <Scale size={28} className={`${textColor} mr-2`} />
      <span className={`font-serif font-bold text-2xl ${textColor}`}>
        Legal Nest
      </span>
    </Link>
  );
};

export default Logo;
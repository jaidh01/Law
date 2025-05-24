import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, X } from 'lucide-react';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [visible, setVisible] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setVisible(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection quality
    const checkConnectionQuality = () => {
      if ('connection' in navigator && (navigator as any).connection) {
        const conn = (navigator as any).connection;
        if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
          setVisible(true);
          setTimeout(() => setVisible(false), 5000);
        }
      }
    };
    
    checkConnectionQuality();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 p-3 rounded-md shadow-lg flex items-center justify-between ${
      isOnline ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
    }`}>
      <div className="flex items-center">
        {isOnline ? (
          <Wifi className="mr-2" size={18} />
        ) : (
          <WifiOff className="mr-2" size={18} />
        )}
        <span className="text-sm">
          {isOnline 
            ? 'Back online. Some content has been cached for offline use.' 
            : 'You are offline. Showing previously loaded content.'}
        </span>
      </div>
      <button 
        onClick={() => setVisible(false)}
        className="text-sm font-medium flex items-center"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default NetworkStatus;
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [visible, setVisible] = useState<boolean>(false);

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

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 p-3 rounded-md shadow-lg flex items-center justify-between ${
      isOnline ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
    }`}>
      <div className="flex items-center">
        {isOnline ? (
          <Wifi className="mr-2" size={18} />
        ) : (
          <WifiOff className="mr-2" size={18} />
        )}
        <span>{isOnline ? 'Back online' : 'You are offline. Some content may not be available.'}</span>
      </div>
      {isOnline && (
        <button 
          onClick={() => setVisible(false)}
          className="text-sm font-medium"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

export default NetworkStatus;
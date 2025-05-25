import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, X, AlertCircle } from 'lucide-react';
import apiBaseUrl from '../../services/apiConfig';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [visible, setVisible] = useState<boolean>(!navigator.onLine);
  const [apiError, setApiError] = useState<boolean>(false);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setVisible(true);
      checkApiConnection(); // Check API when coming back online
      setTimeout(() => setVisible(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setApiError(false); // Reset API error when offline
      setVisible(true);
    };
    
    // Check API connectivity
    const checkApiConnection = async () => {
      if (!navigator.onLine) return;
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        // Use the health check endpoint
        const healthEndpoint = apiBaseUrl.replace('/api/articles', '/api/health');
        await fetch(healthEndpoint, { signal: controller.signal });
        
        clearTimeout(timeoutId);
        setApiError(false);
      } catch (err) {
        console.error('API connection test failed:', err);
        setApiError(true);
        setVisible(true);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial API check
    if (navigator.onLine) {
      checkApiConnection();
    }
    
    // Check connection quality
    const checkConnectionQuality = () => {
      if ('connection' in navigator && (navigator as any).connection) {
        const conn = (navigator as any).connection;
        if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
          setVisible(true);
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
      isOnline && !apiError ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
    }`}>
      <div className="flex items-center">
        {isOnline && !apiError ? (
          <Wifi className="mr-2" size={18} />
        ) : isOnline && apiError ? (
          <AlertCircle className="mr-2" size={18} />
        ) : (
          <WifiOff className="mr-2" size={18} />
        )}
        <span className="text-sm">
          {isOnline && !apiError 
            ? 'Connected. Content has been cached for offline use.' 
            : isOnline && apiError
            ? 'Cannot connect to server. Using cached content.'
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
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, X, AlertCircle } from 'lucide-react';
import { 
  checkApiConnection,
  getNetworkStatus,
  setupNetworkListeners,
  isLowQualityConnection
} from '../../services/domain/networkService';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [visible, setVisible] = useState<boolean>(!navigator.onLine);
  const [apiError, setApiError] = useState<boolean>(false);
  
  useEffect(() => {
    // Handle online status change
    const handleOnline = () => {
      setIsOnline(true);
      setVisible(true);
      
      // Check API connectivity when coming back online
      checkApiConnection()
        .then(connected => {
          setApiError(!connected);
          setTimeout(() => setVisible(false), 3000);
        })
        .catch(() => {
          setApiError(true);
        });
    };

    // Handle offline status change
    const handleOffline = () => {
      setIsOnline(false);
      setApiError(false); // Reset API error when offline
      setVisible(true);
    };
    
    // Set up network event listeners using our service
    const cleanup = setupNetworkListeners(handleOnline, handleOffline);
    
    // Initial API check
    if (navigator.onLine) {
      checkApiConnection()
        .then(connected => setApiError(!connected))
        .catch(() => setApiError(true));
    }
    
    // Check connection quality
    if (isLowQualityConnection()) {
      setVisible(true);
    }
    
    // Poll the API connection every minute when online
    const intervalId = setInterval(() => {
      if (navigator.onLine) {
        checkApiConnection()
          .then(connected => {
            const wasDisconnected = apiError;
            setApiError(!connected);
            
            // Show notification if connection state changed
            if (wasDisconnected && connected) {
              setVisible(true);
              setTimeout(() => setVisible(false), 3000);
            } else if (!wasDisconnected && !connected) {
              setVisible(true);
            }
          })
          .catch(() => setApiError(true));
      }
    }, 60000);

    // Cleanup function
    return () => {
      cleanup(); // Remove network listeners
      clearInterval(intervalId); // Clear polling interval
    };
  }, [apiError]);

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
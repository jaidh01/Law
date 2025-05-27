/**
 * Network status service for tracking online/offline status and API connectivity
 */
import apiBaseUrl from '../apiConfig';

interface NetworkStatus {
  isOnline: boolean;
  apiConnected: boolean;
  lastChecked: number;
  connectionType?: string;
  effectiveType?: string;
}

const NETWORK_STATUS_CACHE_KEY = 'networkStatus';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Checks the API connectivity
 * @returns Promise resolving to true if API is reachable
 */
export const checkApiConnection = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    // Use the health check endpoint with the correct domain
    const healthEndpoint = apiBaseUrl.replace('/api/articles', '/api/health');
    console.log(`Checking API health at: ${healthEndpoint}`);
    
    const response = await fetch(healthEndpoint, { 
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    const isConnected = response.ok;
    updateNetworkStatus({ apiConnected: isConnected });
    
    return isConnected;
  } catch (err) {
    console.error('API connection test failed:', err);
    updateNetworkStatus({ apiConnected: false });
    return false;
  }
};

/**
 * Gets the current network status
 * @returns Current network status
 */
export const getNetworkStatus = (): NetworkStatus => {
  const defaultStatus: NetworkStatus = {
    isOnline: navigator.onLine,
    apiConnected: false,
    lastChecked: Date.now(),
  };
  
  // Add connection info if available
  if ('connection' in navigator && (navigator as any).connection) {
    const conn = (navigator as any).connection;
    defaultStatus.connectionType = conn.type;
    defaultStatus.effectiveType = conn.effectiveType;
  }
  
  try {
    const cachedStatusStr = localStorage.getItem(NETWORK_STATUS_CACHE_KEY);
    if (cachedStatusStr) {
      const cachedStatus = JSON.parse(cachedStatusStr) as NetworkStatus;
      
      // Only use cached status if it's recent
      if (Date.now() - cachedStatus.lastChecked < CACHE_DURATION) {
        return cachedStatus;
      }
    }
  } catch (e) {
    console.error('Error retrieving network status from cache:', e);
  }
  
  return defaultStatus;
};

/**
 * Updates the network status
 * @param updates Partial network status updates
 */
export const updateNetworkStatus = (updates: Partial<NetworkStatus>): void => {
  try {
    const currentStatus = getNetworkStatus();
    const newStatus: NetworkStatus = {
      ...currentStatus,
      ...updates,
      lastChecked: Date.now()
    };
    
    localStorage.setItem(NETWORK_STATUS_CACHE_KEY, JSON.stringify(newStatus));
  } catch (e) {
    console.error('Error updating network status in cache:', e);
  }
};

/**
 * Checks if the connection is low-quality
 * @returns True if the connection is slow
 */
export const isLowQualityConnection = (): boolean => {
  if ('connection' in navigator && (navigator as any).connection) {
    const conn = (navigator as any).connection;
    return conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g';
  }
  return false;
};

/**
 * Sets up event listeners for online/offline events
 * @param onOnline Callback for when the browser comes online
 * @param onOffline Callback for when the browser goes offline
 * @returns Cleanup function to remove event listeners
 */
export const setupNetworkListeners = (
  onOnline?: () => void,
  onOffline?: () => void
): () => void => {
  const handleOnline = () => {
    updateNetworkStatus({ isOnline: true });
    if (onOnline) onOnline();
  };

  const handleOffline = () => {
    updateNetworkStatus({ isOnline: false, apiConnected: false });
    if (onOffline) onOffline();
  };
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Check connection quality changes if supported
  if ('connection' in navigator && (navigator as any).connection) {
    const conn = (navigator as any).connection;
    if ('addEventListener' in conn) {
      conn.addEventListener('change', () => {
        updateNetworkStatus({
          connectionType: conn.type,
          effectiveType: conn.effectiveType
        });
      });
    }
  }
  
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
    
    if ('connection' in navigator && (navigator as any).connection) {
      const conn = (navigator as any).connection;
      if ('removeEventListener' in conn) {
        conn.removeEventListener('change', () => {});
      }
    }
  };
};
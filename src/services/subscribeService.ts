import apiBaseUrl from './apiConfig';

interface SubscribeResponse {
  success: boolean;
  message: string;
}

/**
 * Sends a subscription request to the backend API
 * @param email The email address to subscribe
 * @returns Promise with subscription response
 */
export const subscribeToNewsletter = async (email: string): Promise<SubscribeResponse> => {
  try {
    // Extract the base API URL without the "/articles" part
    const baseApiUrl = apiBaseUrl.replace('/api/articles', '/api');
    const subscribeUrl = `${baseApiUrl}/subscribe`;
    
    const response = await fetch(subscribeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe');
    }
    
    return {
      success: true,
      message: data.message || 'Thank you for subscribing to Legal Nest updates!'
    };
  } catch (error) {
    console.error('Subscription error:', error);
    
    // Attempt to store locally if backend is unavailable
    try {
      // Get existing subscribers from localStorage or initialize empty array
      const storedSubscribers = localStorage.getItem('pendingSubscribers');
      const subscribers = storedSubscribers ? JSON.parse(storedSubscribers) : [];
      
      // Add new subscriber
      subscribers.push({
        email,
        timestamp: new Date().toISOString()
      });
      
      // Save back to localStorage
      localStorage.setItem('pendingSubscribers', JSON.stringify(subscribers));
      
      return {
        success: true,
        message: 'Thank you for subscribing to Legal Nest updates! (Saved locally)'
      };
    } catch (localStorageError) {
      return {
        success: false,
        message: 'Something went wrong. Please try again later.'
      };
    }
  }
};

/**
 * Syncs locally stored subscribers to the backend when connectivity is restored
 */
export const syncLocalSubscribers = async (): Promise<void> => {
  try {
    const storedSubscribers = localStorage.getItem('pendingSubscribers');
    if (!storedSubscribers) return;
    
    const subscribers = JSON.parse(storedSubscribers);
    if (!subscribers.length) return;
    
    // Extract the base API URL without the "/articles" part
    const baseApiUrl = apiBaseUrl.replace('/api/articles', '/api');
    const bulkSubscribeUrl = `${baseApiUrl}/subscribe/bulk`;
    
    const response = await fetch(bulkSubscribeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscribers }),
    });
    
    if (response.ok) {
      // Clear locally stored subscribers after successful sync
      localStorage.removeItem('pendingSubscribers');
      console.log('Successfully synced local subscribers with the server');
    } else {
      console.error('Failed to sync subscribers:', await response.text());
    }
  } catch (error) {
    console.error('Failed to sync local subscribers:', error);
  }
};
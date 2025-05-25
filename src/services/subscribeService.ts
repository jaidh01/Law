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
  // Mock the subscription instead of making an actual API request
  try {
    console.log('Subscription requested for:', email);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store locally in localStorage
    try {
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
        message: 'Thank you for subscribing! (Saved locally only)'
      };
    } catch (localStorageError) {
      console.error('Local storage error:', localStorageError);
      return {
        success: false,
        message: 'Could not save your subscription. Please try again later.'
      };
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    };
  }
};

/**
 * Syncs locally stored subscribers to the backend when connectivity is restored
 * Currently disabled - only logs the subscribers that would be synced
 */
export const syncLocalSubscribers = async (): Promise<void> => {
  try {
    const storedSubscribers = localStorage.getItem('pendingSubscribers');
    if (!storedSubscribers) {
      console.log('No pending subscribers to sync');
      return;
    }
    
    const subscribers = JSON.parse(storedSubscribers);
    console.log(`Found ${subscribers.length} locally stored subscribers (sync disabled):`, subscribers);
    
    // Don't actually sync with backend for now
    // No API calls will be made
    
  } catch (error) {
    console.error('Error checking local subscribers:', error);
  }
};

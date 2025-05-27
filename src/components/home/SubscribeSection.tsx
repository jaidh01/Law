import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { subscribeToNewsletter } from '../../services/domain/subscribeService';

type SubscriptionStatus = 'idle' | 'loading' | 'success' | 'error';

const SubscribeSection: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<SubscriptionStatus>('idle');
  const [message, setMessage] = useState<string>('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }
    
    setStatus('loading');
    
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.message);
      }
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error in subscription process:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div className="mb-12 bg-primary-100 text-primary-700 rounded-xl overflow-hidden shadow-lg">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <h2 className="text-4xl font-serif font-bold mb-5 text-primary-600">
              Get Legal Updates Delivered
            </h2>
            <p className="text-primary-600 mb-8 text-lg">
              Subscribe to our newsletter and receive daily updates on court judgments, 
              legal developments, and breaking legal news - directly to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
              <div className="flex-grow">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-md text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 border border-primary-200"
                  placeholder="Enter your email address"
                  required
                  disabled={status === 'loading'}
                />
              </div>
              <button 
                type="submit" 
                className={`btn ${
                  status === 'loading' ? 'bg-neutral-400' : 
                  status === 'success' ? 'bg-green-500 hover:bg-green-600' : 
                  status === 'error' ? 'bg-red-500 hover:bg-red-600' : 
                  'bg-accent-500 hover:bg-accent-600'
                } text-white flex items-center justify-center px-8 py-4 rounded-md min-w-[160px] transition-colors`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Subscribing...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={20} className="mr-2" />
                    Subscribed!
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle size={20} className="mr-2" />
                    Try Again
                  </>
                ) : (
                  <>
                    <Mail size={20} className="mr-2" />
                    Subscribe
                  </>
                )}
              </button>
            </form>
            
            {message && (
              <div className={`mt-4 p-3 rounded-md ${
                status === 'success' ? 'bg-green-100 text-green-700' : 
                status === 'error' ? 'bg-red-100 text-red-700' : ''
              }`}>
                {message}
              </div>
            )}
            
            <p className="text-sm mt-5 text-primary-500">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="relative w-80 h-80">
              <img 
                src="https://cdn3d.iconscout.com/3d/premium/thumb/female-lawyer-5708429-4779532.png"
                alt="Lawyer illustration" 
                className="w-full h-full object-contain animate-bounce-slow"
              />
              <div className="absolute -inset-2 rounded-full bg-primary-200/50 blur-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
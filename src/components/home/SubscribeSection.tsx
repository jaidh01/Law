import React from 'react';
import { Mail } from 'lucide-react';

const SubscribeSection: React.FC = () => {
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
            
            <form className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow">
                <input
                  type="email"
                  id="email"
                  className="w-full px-5 py-4 rounded-md text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 border border-primary-200"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn bg-accent-500 hover:bg-accent-600 text-white flex items-center justify-center px-8 py-4 rounded-md"
              >
                <Mail size={20} className="mr-2" />
                Subscribe
              </button>
            </form>
            
            <p className="text-sm mt-5 text-primary-500">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="relative w-80 h-80">
              {/* Larger animated lawyer image */}
              <img 
                src="https://cdn3d.iconscout.com/3d/premium/thumb/female-lawyer-5708429-4779532.png"
                alt="Lawyer illustration" 
                className="w-full h-full object-contain animate-bounce-slow"
              />
              {/* Add a subtle animation effect */}
              <div className="absolute -inset-2 rounded-full bg-primary-200/50 blur-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;




// import React from 'react';
// import { Mail } from 'lucide-react';

// const SubscribeSection: React.FC = () => {
//   return (
//     <div className="mb-12 bg-primary-500 text-white rounded-xl overflow-hidden">
//       <div className="container-custom py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//           <div>
//             <h2 className="text-3xl font-serif font-bold mb-4">
//               Stay Updated with Legal News
//             </h2>
//             <p className="text-primary-100 mb-6">
//               Subscribe to our newsletter and receive daily updates on court judgments, 
//               legal developments, law firm news, and more - directly to your inbox.
//             </p>
//             <ul className="space-y-2 mb-6">
//               {[
//                 'Daily Supreme Court & High Court Updates',
//                 'Analysis of Landmark Judgments',
//                 'Legal News Alerts & Notifications',
//                 'Special Reports & Interviews'
//               ].map((benefit, index) => (
//                 <li key={index} className="flex items-start">
//                   <span className="inline-block mr-2 mt-1 text-primary-200">✓</span>
//                   <span>{benefit}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <div className="bg-primary-600 p-8 rounded-lg">
//             <h3 className="text-xl font-serif font-bold mb-4">
//               Sign Up for Free
//             </h3>
//             <form className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   className="w-full px-3 py-2 bg-primary-700 border border-primary-400 rounded-md text-white placeholder-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-200"
//                   placeholder="Enter your name"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium mb-1">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-3 py-2 bg-primary-700 border border-primary-400 rounded-md text-white placeholder-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-200"
//                   placeholder="Enter your email"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="profession" className="block text-sm font-medium mb-1">
//                   Profession
//                 </label>
//                 <select
//                   id="profession"
//                   className="w-full px-3 py-2 bg-primary-700 border border-primary-400 rounded-md text-white placeholder-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-200"
//                 >
//                   <option value="">Select your profession</option>
//                   <option value="advocate">Advocate</option>
//                   <option value="judge">Judge</option>
//                   <option value="student">Law Student</option>
//                   <option value="academic">Academic</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
              
//               <button type="submit" className="w-full btn bg-accent-500 hover:bg-accent-600 text-white flex items-center justify-center">
//                 <Mail size={16} className="mr-2" />
//                 Subscribe Now
//               </button>
              
//               <p className="text-xs text-primary-200 text-center mt-4">
//                 By subscribing, you agree to our Privacy Policy and Terms of Service.
//                 You can unsubscribe at any time.
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscribeSection;
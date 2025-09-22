'use client'
import Image from 'next/image';
import { useState } from 'react';

const SubscriptionSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Subscribed with email:', email);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Left - Subscription Form */}
        <div className="md:w-1/2 w-full">
          <div className="max-w-md mx-auto md:mx-0">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Stay <span className="text-blue-600">Informed</span> with Our Updates
            </h2>
            <p className="text-blue-700 mb-8 leading-relaxed">
              Join our community of professionals who receive exclusive insights, 
              industry news, and special offers directly to their inbox.
            </p>
            
            {subscribed ? (
              <div className="bg-blue-100 border-l-4 border-blue-600 text-blue-800 p-4 rounded-md mb-6">
                <p>Thank you for subscribing! Check your email for confirmation.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your professional email"
                    className="w-full p-4 pl-12 rounded-lg bg-white text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
                    required
                  />
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Subscribe Now
                  <svg 
                    className="inline-block ml-2 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </form>
            )}
            
            <p className="text-sm text-blue-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Right - Image */}
        <div className="md:w-1/2 w-full">
          <div className="relative overflow-hidden rounded-xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-700/10 z-10"></div>
            <Image
              src="/image/s2.png" // Replace with your actual image path
              alt="Professional subscription benefits"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
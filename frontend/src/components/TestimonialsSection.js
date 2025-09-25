import React, { useState } from 'react'
import {Star, Plus, Users} from 'lucide-react';

const TestimonialsSection = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div>
       {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600 max-w-6xl mx-auto">Real success stories from businesses that have transformed with our solutions</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                  alt="Raj Patel" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-bold text-lg text-gray-900">Raj Patel</div>
                  <div className="text-gray-600">CEO, TechVenture Inc.</div>
                </div>
              </div>
              <div className="flex mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">"MeraSoftware transformed our business operations completely. Their ongoing support and innovative approach have been instrumental in our 300% growth over the past two years."</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                  alt="Priya Sharma" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-bold text-lg text-gray-900">Priya Sharma</div>
                  <div className="text-gray-600">Founder, Digital Solutions</div>
                </div>
              </div>
              <div className="flex mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">"The enterprise-grade solutions and exceptional support team make MeraSoftware our trusted technology partner. Their expertise in modern frameworks is unmatched."</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                  alt="Amit Kumar" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-bold text-lg text-gray-900">Amit Kumar</div>
                  <div className="text-gray-600">CTO, E-commerce Pro</div>
                </div>
              </div>
              <div className="flex mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">"Working with MeraSoftware has been a game-changer. Their scalable solutions and proactive approach to technology challenges have exceeded all our expectations."</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 font-semibold flex items-center mx-auto shadow-lg border border-gray-100 transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Share Your Experience
            </button>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-600">Sign in to share your experience with our community</p>
            </div>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
              <div className="flex space-x-4 pt-4">
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestimonialsSection;

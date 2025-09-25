import React from 'react'

const BusinessSpecificCloudSection = () => {
  return (
    <div>
      {/* Business-Specific Cloud Software Section */}
<section className="py-20 bg-gray-50">
  
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        Business-Specific Cloud Software We've Created
      </h2>
      <p className="text-xl text-gray-600 max-w-5xl mx-auto">
        Professional software solutions designed for specific industries to streamline operations and boost productivity.
      </p>
    </div>
    
    <div className="grid lg:grid-cols-3 gap-8">
      {/* CRM Card */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group relative">
        {/* Arrow - appears on CTA hover */}
        <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 cta-arrow">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </div>
        
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
              All Businesses
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Customer Relationship Management
            </h3>
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">☁️ Cloud Based</span>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">🆓 Free License</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Complete CRM solution for managing customers, leads, and sales. Essential for every business with zero software cost.
            </p>
          </div>
          
          {/* Target Industries */}
          <div className="border-t border-gray-100 pt-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Target Industries:</h4>
            <p className="text-sm text-purple-600 font-medium">
              Suitable for All Business Types
            </p>
          </div>
          
          {/* Pricing & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">Free</div>
              <div className="text-sm text-gray-500">Setup & Forever Use</div>
            </div>
            <button className="cta-button group/btn relative bg-gradient-to-br from-purple-500 to-purple-900 hover:from-purple-600 hover:to-purple-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:border hover:border-purple-700 hover:shadow-lg">
              <span className="flex items-center">
                Get Started
                <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Complaint Management Card */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group relative">
        {/* Arrow - appears on CTA hover */}
        <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 cta-arrow">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </div>
        
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-block bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
              Service Industries
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Complaint Management System
            </h3>
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">☁️ Cloud Based</span>
              <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">📱 WhatsApp API</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Advanced complaint tracking with WhatsApp integration. Automated notifications, status updates, and customer communication.
            </p>
          </div>
          
          {/* Target Industries */}
          <div className="border-t border-gray-100 pt-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Target Industries:</h4>
            <p className="text-sm text-emerald-600 font-medium">
              Service Businesses (repair/maintenance)
            </p>
          </div>
          
          {/* Pricing & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-emerald-600">₹499</div>
              <div className="text-sm text-gray-500">per month</div>
            </div>
            <button className="cta-button group/btn relative bg-gradient-to-br from-emerald-500 to-emerald-900 hover:from-emerald-600 hover:to-emerald-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:border hover:border-emerald-700 hover:shadow-lg">
              <span className="flex items-center">
                Get Started
                <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Staff Management Card */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group relative">
        {/* Arrow - appears on CTA hover */}
        <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 cta-arrow">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </div>
        
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
              Enterprise Companies
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Staff Management System
            </h3>
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">☁️ Cloud Based</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">💼 CRM Integration</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Complete employee tracking and management solution. Monitor work progress, attendance, and performance metrics.
            </p>
          </div>
          
          {/* Target Industries */}
          <div className="border-t border-gray-100 pt-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Target Industries:</h4>
            <p className="text-sm text-blue-600 font-medium">
              Sales & Service Enterprises
            </p>
          </div>
          
          {/* Pricing & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-600">₹899</div>
              <div className="text-sm text-gray-500">per month</div>
            </div>
            <button className="cta-button group/btn relative bg-gradient-to-br from-blue-500 to-blue-900 hover:from-blue-600 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:border hover:border-blue-700 hover:shadow-lg">
              <span className="flex items-center">
                Get Started
                <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style jsx>{`
    /* Style for normal card hover - only shadow effect */
    .group:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    
    /* Styles for CTA hover effects */
    .group:has(.cta-button:hover) {
      transform: translateY(-4px);
      transition: transform 0.3s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out;
    }
    
    /* Border colors for each card on CTA hover */
    .group:has(.cta-button:hover):nth-child(1) {
      border-color: rgb(147 51 234); /* purple-600 */
    }
    
    .group:has(.cta-button:hover):nth-child(2) {
      border-color: rgb(5 150 105); /* emerald-600 */
    }
    
    .group:has(.cta-button:hover):nth-child(3) {
      border-color: rgb(37 99 235); /* blue-600 */
    }
    
    /* Show arrow on CTA hover */
    .group:has(.cta-button:hover) .cta-arrow {
      opacity: 1;
      transform: translateX(0);
    }
  `}</style>
</section>
    </div>
  )
}

export default BusinessSpecificCloudSection;

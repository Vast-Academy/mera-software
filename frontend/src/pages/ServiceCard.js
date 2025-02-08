import React from 'react'
import websiteImage from '../assest/website-types/portfolio-static-website-va-computers-amritsar.jpg'

const ServiceCard = () => {
    return (
      <div className="p-2">
        <div className="flex bg-white shadow-sm rounded-lg overflow-hidden w-96 h-72">
          {/* Left Image Section */}
          <div className="w-3/5 h-full">
            <img 
              src={websiteImage}
              alt="Dynamic Website Development"
              className="w-full h-full object-cover"
            />
          </div>
  
          {/* Right Content Section */}
          <div className="flex-1 p-2.5 flex flex-col">
            {/* Title & Tag */}
            <div className="flex items-start gap-1 mb-2">
              <h3 className="text-sm font-bold text-gray-900 leading-tight">
                Dynamic Website Package
              </h3>
              {/* <span className="bg-red-500 text-white text-xs px-1.5 rounded-sm whitespace-nowrap">
                20% Off
              </span> */}
            </div>
  
            {/* Price Section */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-lg font-bold text-gray-900">₹15,999</span>
              <span className="text-sm text-gray-500 line-through">₹19,999</span>
              <span className="text-xs text-green-600">Save ₹4,000</span>
            </div>
  
            {/* Best For Section */}
            <div className="mb-2">
              <p className="text-xs font-medium text-gray-700 mb-1">Best For:</p>
              <div className="text-xs text-gray-600 space-y-0.5">
                <p>• E-commerce & Business Websites</p>
                <p>• Service Based Companies</p>
                <p className="text-blue-600 cursor-pointer hover:underline">+3 more</p>
              </div>
            </div>
  
            {/* Specs Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                Unlimited Pages
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                Admin Panel
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                +more
              </span>
            </div>
  
            {/* Subtle CTA Link */}
            <div className="mt-auto">
            <button className="w-full bg-blue-600 text-white text-sm px-3 py-2 rounded font-medium hover:bg-blue-700 transition-colors">
              View Details
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ServiceCard;


import React from 'react';
import { FileText, Clock, ExternalLink, ChevronRight, Activity } from 'lucide-react';

const UpdateCardUnique = () => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-lg overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-red-500 to-purple-500"></div>
      
      <div className="flex p-6">
        {/* Left Section - All Details */}
        <div className="flex-1 pr-8">
          <div className="flex flex-col gap-6">
            {/* Header with Icon */}
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-12 h-12 bg-orange-100 rounded-lg rotate-6"></div>
                <div className="absolute -top-1 -left-1 w-12 h-12 bg-red-100 rounded-lg -rotate-3"></div>
                <div className="relative w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-100">
                  <FileText className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    six updates
                  </h2>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    #81fa3
                  </span>
                </div>
                <p className="text-gray-600">website updates</p>
              </div>
            </div>

            {/* Progress Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Updates Progress</span>
                <span className="text-sm font-medium text-orange-600">0 of 4</span>
              </div>
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 opacity-20"></div>
                <div className="relative flex gap-1">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 h-2 border-r-2 border-white last:border-r-0"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status and Time Section */}
            <div className="flex gap-8 py-4 border-y border-gray-100">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Time Left</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold text-orange-600">28</span>
                  <span className="text-sm text-gray-500">days</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Current Status</span>
                <div className="flex items-center gap-2 mt-1">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>Started: 21 Feb 2025</span>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <button className="relative flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:text-gray-900 transition-colors">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Image Frame with Margins */}
        <div className="relative w-[300px]">
          <div className="absolute inset-4 bg-gradient-to-br from-orange-100 to-purple-100 rounded-2xl"></div>
          <div className="h-[280px] bg-gray-100 rounded-xl overflow-hidden relative mx-4 my-4 shadow-md">
            <img 
              src="/api/placeholder/300/280" 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCardUnique;
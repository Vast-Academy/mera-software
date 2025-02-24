import React from 'react';
import { Search, Monitor, Smartphone, Cloud, Plus, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from '../assest/website-types/business-dynamic-website-va-computers-amritsar.jpg'


const DesktopLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src="/api/placeholder/120/40" alt="Mera Software" className="h-8" />
            <div className="relative">
              <input
                type="text"
                placeholder="search product here..."
                className="w-96 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white p-1.5 rounded-md hover:bg-red-700 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-red-50 py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Transform Your Ideas Into <span className="text-red-600">Digital Reality</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We build custom solutions that help businesses grow and succeed in the digital world.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg transition-colors">
                Get Started →
              </button>
            </div>
            <div className="w-1/2 flex justify-end">
              <img src={dynamic} alt="Hero" className="rounded-lg shadow-xl " />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600">Choose from our range of professional digital solutions</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-blue-600 bg-opacity-95 text-white p-8 rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-lg group">
              <Monitor className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-3">Websites Development</h3>
              <p className="text-blue-100 mb-6">Explore Custom Website Plans for Your Business</p>
              <button className="text-white group-hover:translate-x-2 transition-transform inline-flex items-center">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="bg-green-600 bg-opacity-95 text-white p-8 rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-lg group">
              <Smartphone className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-3">Mobile Apps</h3>
              <p className="text-green-100 mb-6">View Plans to Develop Any Type of Mobile App</p>
              <button className="text-white group-hover:translate-x-2 transition-transform inline-flex items-center">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="bg-purple-600 bg-opacity-95 text-white p-8 rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-lg group">
              <Cloud className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-3">Cloud Softwares</h3>
              <p className="text-purple-100 mb-6">Get Software Developed to Automate Your Business</p>
              <button className="text-white group-hover:translate-x-2 transition-transform inline-flex items-center">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="bg-orange-600 bg-opacity-95 text-white p-8 rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-lg group">
              <Plus className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-3">Feature Upgrades</h3>
              <p className="text-orange-100 mb-6">Add Features and Data to Your Existing projects</p>
              <button className="text-white group-hover:translate-x-2 transition-transform inline-flex items-center">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner/Carousel Section */}
      <div className="py-16 bg-gradient-to-r from-orange-500 via-white to-green-500">
        <div className="container mx-auto px-6 relative">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-12">
              <div className="w-1/3">
                <img src="/api/placeholder/300/300" alt="Mobile Apps" className="mx-auto transform hover:scale-105 transition-transform" />
              </div>
              <div className="w-1/3 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Build Your<br />Dream<br />Mobile App!
                </h2>
                <button className="text-red-600 font-medium hover:text-red-700 transition-colors inline-flex items-center">
                  Check Our Plans <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
              <div className="w-1/3 flex justify-center">
                <img src="/api/placeholder/150/150" alt="Logo" className="transform hover:scale-105 transition-transform" />
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          
          {/* Carousel Dots */}
          <div className="flex justify-center mt-6 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
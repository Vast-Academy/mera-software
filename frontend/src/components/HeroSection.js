import React, { useState, useEffect } from 'react'
import { ChevronRight, Shield, Award, Globe, Smartphone, Settings, Search, Code, UserCheck, X} from 'lucide-react';
import { Link } from 'react-router-dom';


const HeroSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleStartProjectClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Handle Esc key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isPopupOpen) {
        handleClosePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isPopupOpen]);

  // Handle backdrop click
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClosePopup();
    }
  };

  return (
    <div >
       {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="w-4 h-4 mr-2" />
                Trusted by 100+ Businesses
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                We Build Software
                <span className="block text-blue-600">That Fits Your Needs</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                We start by understanding your business challenges, then design and develop software tailored to your exact requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartProjectClick}
                  className="bg-gradient-to-br from-blue-500 to-blue-900 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-900 font-semibold flex items-center justify-center transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Start Your Project <ChevronRight className="ml-2 w-5 h-5" />
                </button>
                <Link to={"/our-portfolio"}>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-purple-600 hover:text-purple-600 font-semibold transition-colors">
                  View Portfolio
                </button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Client Retention</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Professional team working on software development" 
                  className="rounded-3xl shadow-3xl border-4 mb-20 border-teal-600"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-900 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">99.9% Uptime</div>
                    <div className="text-sm text-gray-600">Enterprise Grade Security</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={handleBackdropClick}
        >
          <div className="bg-white w-full max-w-4xl relative animate-slideUp shadow-2xl rounded-2xl border border-gray-200">

            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Content */}
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">How Can We Help You?</h2>
                <p className="text-gray-600">Choose the service that best fits your needs</p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

                {/* Website */}
                <div className="group bg-white hover:bg-blue-50 p-6 rounded-xl border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg cursor-pointer text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Website</h3>
                  <p className="text-gray-600 text-sm">Professional business websites</p>
                </div>

                {/* Web Software */}
                <div className="group bg-white hover:bg-purple-50 p-6 rounded-xl border border-gray-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg cursor-pointer text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Web Software</h3>
                  <p className="text-gray-600 text-sm">Custom business solutions</p>
                </div>

                {/* Mobile App */}
                <div className="group bg-white hover:bg-teal-50 p-6 rounded-xl border border-gray-200 hover:border-teal-400 transition-all duration-300 hover:shadow-lg cursor-pointer text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Mobile App</h3>
                  <p className="text-gray-600 text-sm">iOS & Android apps</p>
                </div>

                {/* Digital Marketing */}
                <div className="group bg-white hover:bg-cyan-50 p-6 rounded-xl border border-gray-200 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg cursor-pointer text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Digital Marketing</h3>
                  <p className="text-gray-600 text-sm">SEO & Google promotion</p>
                </div>

                {/* Hire Developer */}
                <div className="group bg-white hover:bg-pink-50 p-6 rounded-xl border border-gray-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg cursor-pointer text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Hire Developer</h3>
                  <p className="text-gray-600 text-sm">Dedicated team members</p>
                </div>

                {/* Maintenance */}
                <div className="group bg-white hover:bg-indigo-50 p-6 rounded-xl border border-gray-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg cursor-pointer text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Maintenance</h3>
                  <p className="text-gray-600 text-sm">Update existing projects</p>
                </div>
                </div>

              {/* Contact Options */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-center text-gray-600 mb-4">Need personalized guidance?</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                    <span className="mr-2">📞</span> Get Free Consultation
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
                    <span className="mr-2">💬</span> Live Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroSection;

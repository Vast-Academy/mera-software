import React from 'react'
import { ChevronRight, Users, Globe, Smartphone, Database, Code, UserCheck, Search, Settings, Link, Star, Plus, MapPin, Phone, Mail, Shield, Clock, Award, ArrowRight, TrendingUp, Zap } from 'lucide-react';

const ExistingCustomersSection = () => {
  return (
    <div>
       {/* Existing Customer Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    {/* Section Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
        <Shield className="w-4 h-4 mr-2" />
        For Our Valued Clients
      </div>
      <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-3">
        Your Project,
        <span className=" text-blue-600"> Always Under Your Watch</span>
      </h2>
      <p className="text-xl text-gray-600 leading-relaxed max-w-7xl mx-auto">
        Log in to your client portal to check progress, share updates with your developer, and raise support requests whenever needed.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Image Side */}
      <div className="relative">
        <div className="relative z-10">
          <img 
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Customer Dashboard Interface" 
            className="rounded-2xl shadow-2xl mt-12 mb-20 w-full h-full"
          />
        </div>
        {/* Floating Stats Card */}
        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900">100+ Active</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
        {/* Floating Feature Card */}
        <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Live Dashboard</span>
          </div>
        </div>
      </div>

      {/* Information & Directions Side */}
      <div className="space-y-8">

        {/* Direction Cards */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            {/* Arrow - appears on CTA hover */}
            <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 cta-arrow">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">Track Your Project Progress</h3>
                <p className="text-gray-600">Access your dashboard to see how much work has been completed.</p>
              </div>
              <button className="cta-button group/btn relative bg-gradient-to-br from-blue-500 to-blue-900 hover:from-blue-600 hover:to-blue-900 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-all duration-300 hover:border hover:border-blue-700 hover:shadow-lg w-36">
                <span className="flex items-center">
                  Dashboard
                  <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                    →
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            {/* Arrow - appears on CTA hover */}
            <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 cta-arrow">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">Share Data & Updates</h3>
                <p className="text-gray-600">Directly connect with your project developer – share files & chat.</p>
              </div>
              <button className="cta-button group/btn relative bg-gradient-to-br from-emerald-500 to-emerald-900 hover:from-emerald-600 hover:to-emerald-900 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-all duration-300 hover:border hover:border-emerald-700 hover:shadow-lg w-36">
                <span className="flex items-center">
                  Open Portal
                  <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                    →
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            {/* Arrow - appears on CTA hover */}
            <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 cta-arrow">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">Get Help & Support</h3>
                <p className="text-gray-600">Submit tickets for any issues and get quick help from our team.</p>
              </div>
              <button className="cta-button group/btn relative bg-gradient-to-br from-purple-500 to-purple-900 hover:from-purple-600 hover:to-purple-900 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-all duration-300 hover:border hover:border-purple-700 hover:shadow-lg w-36">
                <span className="flex items-center">
                  Support
                  <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                    →
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">100+</div>
            <div className="text-sm text-gray-600">Projects Managed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <div className="text-sm text-gray-600">Tickets Resolved on Time</div>
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
    .space-y-4 .group:has(.cta-button:hover):nth-child(1) {
      border-color: rgb(37 99 235); /* blue-600 */
    }
    
    .space-y-4 .group:has(.cta-button:hover):nth-child(2) {
      border-color: rgb(5 150 105); /* emerald-600 */
    }
    
    .space-y-4 .group:has(.cta-button:hover):nth-child(3) {
      border-color: rgb(147 51 234); /* purple-600 */
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

export default ExistingCustomersSection;

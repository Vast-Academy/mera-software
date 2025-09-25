import React from 'react'
import { ChevronRight, Users, Globe, Smartphone, Database, Code, UserCheck, Search, Settings, Link, Star, Plus, MapPin, Phone, Mail, Shield, Clock, Award, ArrowRight, TrendingUp, Zap } from 'lucide-react';

const ContactSection = () => {
  return (
    <div>
      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Build Something Amazing Together</h2>
            <p className="text-xl text-gray-600 max-w-7xl mx-auto">Ready to transform your business with cutting-edge technology? Get in touch with our expert team</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-10 rounded-3xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Start Your Project</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Business Email</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Project Details</label>
                  <textarea 
                    rows={5} 
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white resize-none"
                    placeholder="Tell us about your project requirements and goals..."
                  ></textarea>
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 font-semibold text-lg transition-colors transform hover:scale-105">
                  Send Project Inquiry
                </button>
              </div>
            </div>
            
            {/* Map and Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-100 rounded-3xl h-80 flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Office Location" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-600 bg-opacity-80 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Visit Our Office</h4>
                    <p>Interactive map integration available</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Head Office</h4>
                      <p className="text-gray-600 text-sm">Tech Hub, Innovation District</p>
                    </div>
                  </div>
                  <p className="text-gray-700">123 Business Street, Tech City, TC 12345</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Call Us</h4>
                      <p className="text-gray-600 text-sm">Business Hours: 9 AM - 7 PM</p>
                    </div>
                  </div>
                  <p className="text-gray-700">+91 98765 43210</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Us</h4>
                      <p className="text-gray-600 text-sm">Quick Response Guaranteed</p>
                    </div>
                  </div>
                  <p className="text-gray-700">hello@merasoftware.com</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Support</h4>
                      <p className="text-gray-600 text-sm">24/7 Technical Assistance</p>
                    </div>
                  </div>
                  <p className="text-gray-700">support@merasoftware.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactSection;

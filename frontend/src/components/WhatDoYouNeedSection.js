import React from 'react'
import { ChevronRight, Globe, Smartphone, Settings, Users, FileText, GraduationCap, Wrench, UserCheck,Zap, Shield, Award, Search, Code} from 'lucide-react';
import { Link} from 'react-router-dom';

const WhatDoYouNeedSection = () => {
  return (
    <div>
     <section className="py-20 bg-white">
       <div className="max-w-7xl mx-auto px-6">
         <div className="text-center mb-16">
           <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Business?</h2>
           <p className="text-xl text-gray-600 max-w-6xl mx-auto">Explore the options and choose the solution that matches your need.</p>
         </div>
         <div className="bg-gray-50 p-10 rounded-3xl shadow-xl max-w-6xl mx-auto border border-gray-100">
           <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">What's Your Primary Business Goal?</h3>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
               {/* Arrow - appears on hover */}
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                 <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                 </svg>
               </div>
               
               <div className="bg-gradient-to-br from-blue-500 to-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                 <Globe className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Simple Website</h3>
               <p className="text-gray-600 mb-4">Professional business website with modern design</p>
               <div className="text-blue-800 font-medium group-hover:text-blue-600">Starting from ₹5,999</div>
             </div>
             
             <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-purple-100 hover:border-purple-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
               {/* Arrow - appears on hover */}
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                 <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                 </svg>
               </div>
               
               <div className="bg-gradient-to-br from-purple-500 to-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                 <Settings className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Web Software</h3>
               <p className="text-gray-600 mb-4">Custom business management systems</p>
               <div className="text-purple-800 font-medium group-hover:text-purple-600">Starting from ₹19,999</div>
             </div>
             
             <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-teal-100 hover:border-teal-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
               {/* Arrow - appears on hover */}
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                 <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                 </svg>
               </div>
               
               <div className="bg-gradient-to-br from-teal-500 to-teal-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                 <Smartphone className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile App</h3>
               <p className="text-gray-600 mb-4">Native iOS and Android applications</p>
               <div className="text-teal-800 font-medium group-hover:text-teal-600">Starting from ₹59,999</div>
             </div>
             
             <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-cyan-100 hover:border-cyan-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
               {/* Arrow - appears on hover */}
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                 <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                 </svg>
               </div>
               
               <div className="bg-gradient-to-br from-cyan-500 to-cyan-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                 <Search className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Promote Business on Google</h3>
               <p className="text-gray-600 mb-4">SEO optimization and Google business promotion</p>
               <div className="text-cyan-800 font-medium group-hover:text-cyan-600">Starting from ₹4,999</div>
             </div>
             
             <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100 hover:border-pink-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
               {/* Arrow - appears on hover */}
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                 <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                 </svg>
               </div>
               
               <div className="bg-gradient-to-br from-pink-500 to-pink-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                 <UserCheck className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Hire a Developer</h3>
               <p className="text-gray-600 mb-4">Dedicated developers for your project needs</p>
               <div className="text-pink-800 font-medium group-hover:text-pink-600">Lower cost than in-house</div>
             </div>
             
             <div className="group bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-indigo-100 hover:border-indigo-800 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
               {/* Arrow - appears on hover */}
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                 <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                 </svg>
               </div>
               
               <div className="bg-gradient-to-br from-indigo-500 to-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                 <Code className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Update Your Website/App</h3>
               <p className="text-gray-600 mb-4">Maintenance and updates for existing projects</p>
               <div className="text-indigo-800 font-medium group-hover:text-indigo-600">Explore our pricing plans</div>
             </div>
           </div>
         </div>
       </div>
     </section>
    </div>
  )
}

export default WhatDoYouNeedSection;
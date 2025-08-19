import React from 'react'
import { ChevronRight, Globe, Smartphone, Settings, Users, FileText, GraduationCap, Wrench, UserCheck,Zap, Shield, Award, Search, Code} from 'lucide-react';
import { Link} from 'react-router-dom';

const WhatDoYouNeedSection = () => {
  return (
    <div>
     {/* What Do You Need - From 2nd Code */}
             <section className="py-16 bg-white">
               <div className="max-w-6xl mx-auto px-6">
                 <div className="text-center mb-12">
                   <h2 className="text-3xl font-bold text-gray-900 mb-4">What Do You Need?</h2>
                   <p className="text-gray-600 text-xl">Tell us your requirements and we'll build it</p>
                 </div>
                 
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Link to={"/local-business-setup"}>
                   <div className="text-center p-6 rounded-xl border border-blue-200 hover:border-blue-600 hover:shadow-lg transition-all cursor-pointer group">
                     <div className="bg-gradient-to-r from-blue-500 to-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Globe className="w-8 h-8 text-white" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Simple Website</h3>
                     <p className="text-gray-600 mb-4">Professional business website with modern design</p>
                     <div className="text-blue-800 font-medium group-hover:text-blue-600">Starting from ₹15,000</div>
                   </div>
                   </Link>
       
                   <div className="text-center p-6 rounded-xl border border-purple-200 hover:border-purple-600 hover:shadow-lg transition-all cursor-pointer group">
                     <div className="bg-gradient-to-r from-purple-500 to-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Settings className="w-8 h-8 text-white" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Web Software</h3>
                     <p className="text-gray-600 mb-4">Custom business management systems</p>
                     <div className="text-purple-800 font-medium group-hover:text-purple-600">Starting from ₹50,000</div>
                   </div>
       
                   <div className="text-center p-6 rounded-xl border border-teal-200 hover:border-teal-600 hover:shadow-lg transition-all cursor-pointer group">
                     <div className="bg-gradient-to-r from-teal-500 to-teal-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Smartphone className="w-8 h-8 text-white" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile App</h3>
                     <p className="text-gray-600 mb-4">Native iOS and Android applications</p>
                     <div className="text-teal-800 font-medium group-hover:text-teal-600">Starting from ₹1,00,000</div>
                   </div>
     
                    <div className="text-center p-6 rounded-xl border border-cyan-200 hover:border-cyan-600 hover:shadow-lg transition-all cursor-pointer group">
                     <div className="bg-gradient-to-r from-cyan-500 to-cyan-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Search className="w-8 h-8 text-white" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Promote Business on Google</h3>
                     <p className="text-gray-600 mb-4">SEO optimization and Google business promotion</p>
                     <div className="text-cyan-800 font-medium group-hover:text-cyan-600">Starting from ₹15,000</div>
                   </div>
       
                  <div className="text-center p-6 rounded-xl border border-pink-200 hover:border-pink-600 hover:shadow-lg transition-all cursor-pointer group">
                                  <div className="bg-gradient-to-r from-pink-500 to-pink-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UserCheck className="w-8 h-8 text-white" />
                                  </div>
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">Hire a Developer</h3>
                                  <p className="text-gray-600 mb-4">Dedicated developers for your project needs</p>
                                  <div className="text-pink-800 font-medium group-hover:text-pink-600">Starting from ₹30,000</div>
                  </div>
       
                   <div className="text-center p-6 rounded-xl border border-indigo-200 hover:border-indigo-600 hover:shadow-lg transition-all cursor-pointer group">
                     <div className="bg-gradient-to-r from-indigo-500 to-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Code className="w-8 h-8 text-white" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Update Your Website/App</h3>
                     <p className="text-gray-600 mb-4">Maintenance and updates for existing projects</p>
                     <div className="text-indigo-800 font-medium group-hover:text-indigo-600">Starting from ₹5,000</div>
                   </div>
                 </div>
               </div>
             </section>
    </div>
  )
}

export default WhatDoYouNeedSection;
import React, { useState } from 'react';
import { Share2, ExternalLink, Calendar, Globe, Code, Monitor, Layers } from 'lucide-react';
import slncollege from '../assets/slncollege.jpg';
import sln1 from '../assets/sln1.jpg'
import sln2 from '../assets/sln2.jpg'
import sln3 from '../assets/sln3.jpg'
import sln4 from '../assets/sln4.jpg'
import sln5 from '../assets/sln5.jpg'
import sln6 from '../assets/sln6.jpg'
import slnOld1 from '../assets/sln-old-1.jpg'
import slnOld2 from '../assets/sln-old-2.jpg'
import {Link} from 'react-router-dom';

const Portfolio1 = () => {
  const [activeTab, setActiveTab] = useState('specification');

  const tabs = [
    // { id: 'overview', label: 'Overview' },
    { id: 'specification', label: 'Specifications' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Portfolio</span>
            <span>/</span>
            <span>Educational Websites</span>
            <span>/</span>
            <span className="text-gray-900">Shree Lakshmi Narayan College</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Main Image */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-600 to-teal-400 rounded-lg p-3">
                <img 
                  src={slncollege} 
                  alt="Website Screenshot"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              
              {/* Thumbnail */}
              <div className="flex justify-center">
               
              </div>
            </div>

            {/* Right - Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-sm text-gray-600 mb-1">SLNAC-WEB-2024</h2>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Shree Lakshmi Narayan Ayurvedic College<br />
                  Educational Institution Website
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm text-gray-600">Share:</span>
                  <div className="flex space-x-2">
                    <Share2 className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer" />
                    <ExternalLink className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Live URL</p>
                    <p className="font-medium">https://www.slnaycollege.com/</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Website Type</p>
                    <p className="font-medium">Static Educational Website</p>
                  </div>
                </div>

                 <div className="flex items-center space-x-3">
                  <Layers className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Technologies Used</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    HTML CSS
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    Node.js
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    Express
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    MongoDB
                  </span>
              </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Layers className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Total Pages</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    Static: 20
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    Dynamic: 2
                  </span>
                  </div>
                    {/* <p className="font-medium">  </p> */}
                  </div>
                </div>

                    <div className='flex justify-between'>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Launch Date</p>
                    <p className="font-medium">22-08-2024</p>
                  </div>
                </div>

                <div className="flex space-x-4 mr-8">
                    <Link to="https://www.slnaycollege.com/">
                <button className="cta-button group/btn px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
                <span className="flex items-center">
                  View Live
                  <span className="ml-2 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </span>
                </button>
                </Link>

                <button className="cta-button group/btn px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-md ">
                  <span className="flex items-center">
                    Free Quote
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
        </div>

{/* Client Story */}
        <div className="mb-8 p-3 bg-white rounded-lg border-l-4 border-blue-500">
            <h1 className='text-2xl font-semibold mb-4'>Stuck with Outdated Design and No Support</h1>
            <p className="text-lg text text-gray-700 mt-2 mb-1">Disappointed with the old website’s look and unsatisfied with their previous developer’s service.</p>
          <p className="text-md italic text-gray-700">"The client was not happy with the look and functionality of their old website. It loaded very slowly, content often took time to appear, and even images sometimes looked blurred. Although the website was built on a powerful platform that provided an admin panel, there was no proper support from the developer. This left the college staff with the responsibility of updating everything themselves, which made the website bulky and outdated over time."
        </p>
        <p className="text-lg text text-gray-700 mt-4"> What the client really wanted was a professional team who could handle updates, maintain the site regularly, and ensure it stayed modern and efficient. That’s when they approached us — and we were glad to provide exactly what they were looking for.</p>
        </div>

        {/* specification Tabs */}
        {/* <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h3>
                <div className="space-y-3 text-gray-700">
                  <p>• Modern responsive design optimized for all devices</p>
                  <p>• Clean and professional layout reflecting educational excellence</p>
                  <p>• SEO optimized content structure for better search visibility</p>
                  <p>• Fast loading static website with optimized performance</p>
                  <p>• User-friendly navigation with intuitive menu structure</p>
                  <p>• Contact forms and admission inquiry functionality</p>
                  <p>• Gallery sections for showcasing college facilities</p>
                  <p>• Course information and curriculum details</p>
                  <p>• Faculty profiles and academic achievements</p>
                  <p>• News and events section for regular updates</p>
                  <p>• Alumni section and success stories</p>
                  <p>• Downloadable prospectus and application forms</p>
                </div>
              </div>
            )}

            {activeTab === 'specification' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="space-y-3 text-gray-700">
                  <p>• Frontend: HTML5, CSS3, JavaScript</p>
                  <p>• Framework: Bootstrap 5 for responsive design</p>
                  <p>• Performance: Google PageSpeed Score 95+</p>
                  <p>• Compatibility: Cross-browser compatible (Chrome, Firefox, Safari, Edge)</p>
                  <p>• Mobile Responsiveness: Fully responsive design</p>
                  <p>• SEO: Meta tags, structured data, sitemap</p>
                  <p>• Security: SSL certificate implemented</p>
                  <p>• Hosting: Cloud-based hosting with CDN</p>
                  <p>• Load Time: Average 2.3 seconds</p>
                  <p>• Accessibility: WCAG 2.1 compliant</p>
                </div>
              </div>
            )}
          </div>
        </div> */}

        {/* Website Highlights */}
        <div className="bg-orange-50 border border-orange-300 rounded-lg shadow-sm p-8 mb-8">
          <h3 className="text-lg font-semibold  mb-6">Old Website Screenshots</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="text-center">
              <img 
                src={slnOld1} 
                alt="Website Performance Analytics"
                className="w-full h-full rounded-lg shadow mb-3 border border-orange-300"
              />
              <p className="text-md font-semibold text-red-600">Outdated & Bulky</p>
              <p className="text-sm text-gray-600">The website was outdated, bulky, and poorly organized, making it confusing.</p>
            </div>
            
            <div className="text-center">
              <img 
                src={slnOld2} 
                alt="Mobile Responsive Design"
                className="w-full h-full rounded-lg shadow mb-3 border border-orange-300"
              />
              <p className="text-md font-semibold text-red-600">Poor Performance</p>
              <p className="text-sm text-gray-600">Performance was so poor that data failed to load.</p>
            </div>
          </div>
        </div>

        {/* Website Screenshots */}
        <div className="bg-white  rounded-lg shadow-sm p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">New Website Screenshots</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img 
              src={sln1} 
              alt="Homepage Design"
              className="w-full h-full object-cover rounded-lg shadow border "
            />
            
            <img 
              src={sln6} 
              alt="About Section"
              className="w-full h-full object-cover rounded-lg shadow border "
            />
            
            <img 
              src={sln5} 
              alt="Courses Page"
              className="w-full h-full object-cover rounded-lg shadow border "
            />
            
            <img 
              src={sln4} 
              alt="Contact Page"
              className="w-full h-full object-cover rounded-lg shadow border "
            />
            
            <img 
              src={sln2}
              alt="Faculty Section"
              className="w-full h-full object-cover rounded-lg shadow border "
            />
            
            <img 
              src={sln3}
              alt="Gallery Page"
              className="w-full h-full object-cover rounded-lg shadow border "
            />
          </div>
        </div>

        {/* Available Versions */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Versions</h3>
          <p className="text-gray-600 mb-4">Current Version: SLNAC-WEB-2024 (Static Website with 22 Pages)</p>
          <div className="text-sm text-gray-500">
            Development completed on 22-08-2024 | Status: Live & Operational
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
      </div>
    </div>
  );
};

export default Portfolio1;
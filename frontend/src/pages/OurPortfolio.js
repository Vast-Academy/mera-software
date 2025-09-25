import React, { useState, useRef, useEffect } from 'react';
import {Link} from 'react-router-dom';
// Import portfolio images
import slncollegewebsite from '../assets/slncollegewebsite.jpg';
import cmsMain from '../assets/cms-main.jpg';
import ezingMain from '../assets/ezing-main.jpg'
import crmMain from '../assets/crm-main.jpg'
import vaComputersMain from '../assets/va-computers-main.jpg'

// Portfolio data with professional project details
const portfolioData = {
  stats: {
    totalProjects: 127,
    happyClients: 85,
    yearsExperience: 5,
    technologiesUsed: 24
  },
  
  categories: [
    { id: 'all', name: 'All Projects' },
    { id: 'static', name: 'Static Websites' },
    { id: 'semi-dynamic', name: 'Semi-Dynamic' },
    { id: 'dynamic', name: 'Dynamic Websites' },
    { id: 'cloud', name: 'Cloud Software' },
    { id: 'mobile', name: 'Mobile Apps' }
  ],

  projects: [
    {
      id: 1,
      title: "College Website",
      projectType: "semi-dynamic",
      client: "Shree Lakshmi Narayan Ayurvedic College",
      story: "Disappointed with the old website’s look and unsatisfied with their previous developer’s service.",
      image: slncollegewebsite,
      year: "2024",
      status: "Live",
      specs: {
        staticPages: 20,
        dynamicPages: 2,
        technology: ["HTML CSS", "Node.js", "Express", "MongoDB"],
        features: ["Student Portal", "Admin Panel", "Course Management", "News & Updates"]
      },
      liveUrl: "sln",
      url: "https://www.slnaycollege.com/",
      category: "Educational"
    },
    {
      id: 2,
      title: "Complaint Management System",
      projectType: "cloud",
      client: "3G Digital",
      story: "The owner faced lack of accountability from the staff, along with theft by employees.",
      image: cmsMain,
      year: "2025",
      status: "Live",
      specs: {
        softwareType: "Cloud Software",
        modules: ["Patient Management", "Doctor Portal", "Billing", "Pharmacy", "Reports"],
        technology: ["React", "Node.js", "Express","MongoDB"],
        users: "Multi-user with Role-based Access",
        features: ["Real-time Updates", "Data Backup", "Security Compliant"]
      },
      liveUrl: "./cms-3gdigital",
      category: "IT Solutions"
    },
    {
      id: 3,
      title: "Project Management App For Technician",
      projectType: "mobile",
      client: "3G Digital",
      story: "Staff shifts from manual to app-based work.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      year: "2025",
      status: "Live",
      specs: {
        platforms: ["Android"],
        technology: ["React Native", "Node.js", "PostgreSQL", "Firebase"],
        features: ["Real-time Tracking", "Payment Integration", "Push Notifications", "Reviews & Ratings"],
        userTypes: ["Customer App", "Restaurant App", "Delivery Partner App"],
        integrations: ["Google Maps", "Razorpay", "SMS Gateway"]
      },
      liveUrl: "app-3gdigital",
      category: "Food & Delivery"
    },
    {
      id: 4,
      title: "Immigration Website",
      projectType: "dynamic",
      client: "Ezing Overseas",
      story: "They gained local trust, but without online presence, even less experienced names moved ahead — so they decided to win trust online too.",
      image: ezingMain,
      year: "2024",
      status: "Live",
      specs: {
        pages: "18",
        products: "Content Management Panel",
        adminPanel: true,
        paymentGateway: ["Razorpay", "PayPal", "Stripe"],
        technology: ["HTML CSS", "Node.js", "Express", "MongoDB"],
        features: ["User Management", "Order Tracking", "Inventory", "Analytics"]
      },
      liveUrl: "ezing",
      category: "E-commerce"
    },
    {
      id: 5,
      title: "Customer Relationship Management",
      projectType: "cloud",
      client: "Global Movers Consultants",
      story: "Manual team management turned automated with CRM, reducing effort and boosting output.",
      image: crmMain,
      year: "2024",
      status: "Live",
      specs: {
        softwareType: "Cloud Software",
        modules: ["Patient Management", "Doctor Portal", "Billing", "Pharmacy", "Reports"],
        technology: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
        users: "Multi-user with Role-based Access",
        features: ["Real-time Updates", "Data Backup", "Security Compliant"]
      },
      liveUrl: "crm-software",
      category: "Healthcare"
    },
    {
      id: 6,
      title: "Portfolio Website",
      projectType: "dynamic",
      client: "VA Computers",
      story: "They work in digital marketing and built websites on WordPress, but with limited functionality, they moved to coding-based solutions.",
      image: vaComputersMain,
      year: "2024",
      status: "Live",
      specs: {
        pages: 12,
        technology: ["HTML CSS JS", "Node.js", "Express", "MongoDB"],
        language: ["React", "Tailwind CSS", "Framer Motion"],
        features: ["Modern Design", "Contact Forms", "Portfolio Showcase", "Team Profiles"],
        loadTime: "< 1.5 seconds"
      },
      liveUrl: "va-computers",
      url: "https://www.vacomputers.com/",
      category: "Corporate"
    }
  ]
};

// Animation hook for intersection observer
function useIntersectionObserver(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  
  return isIntersecting;
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, isVisible }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);
  
  return count;
}

// Project Card Component
function ProjectCard({ project }) {
  const getProjectTypeColor = (type) => {
    const colors = {
      'static': 'bg-green-100 text-green-800',
      'semi-dynamic': 'bg-blue-100 text-blue-800',
      'dynamic': 'bg-purple-100 text-purple-800',
      'cloud': 'bg-orange-100 text-orange-800',
      'mobile': 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const renderSpecs = (project) => {
    const { projectType, specs } = project;
    
    switch (projectType) {
      case 'static':
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Pages:</span>
              <span className="font-medium">{specs.totalPages}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Load Time:</span>
              <span className="font-medium text-green-600">{specs.loadTime}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Technology:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {specs.language.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'semi-dynamic':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Static:</span>
                <span className="ml-1 font-medium">{specs.staticPages} pages</span>
              </div>
              <div>
                <span className="text-gray-600">Dynamic:</span>
                <span className="ml-1 font-medium">{specs.dynamicPages} pages</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Technology:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {specs.technology.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'dynamic':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Pages:</span>
                <span className="ml-1 font-medium text-blue-600">{specs.pages}</span>
              </div>
              <div>
                <span className="text-gray-600">Admin Panel</span>
                {/* <span className="ml-1 font-medium text-blue-600">{specs.products}</span> */}
              </div>
            </div>
            {/* <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Admin Panel:</span>
              <span className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Yes
              </span>
            </div> */}
            <div className="text-sm">
              <span className="text-gray-600">Technology:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {specs.technology.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {/* <div className="text-sm">
              <span className="text-gray-600">Payment:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {specs.paymentGateway.slice(0, 2).map(gateway => (
                  <span key={gateway} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    {gateway}
                  </span>
                ))}
              </div>
            </div> */}
          </div>
        );
      
      case 'cloud':
        return (
          <div className="space-y-2">
            {/* <div className="text-sm">
              <span className="text-gray-600">Software Type:</span>
              <span className="ml-1 font-medium text-orange-600">{specs.softwareType}</span>
            </div> */}
            {/* <div className="text-sm">
              <span className="text-gray-600">Modules:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {specs.modules.slice(0, 3).map(module => (
                  <span key={module} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                    {module}
                  </span>
                ))}
                {specs.modules.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    +{specs.modules.length - 3}
                  </span>
                )}
              </div>
            </div> */}
            <div className="text-sm">
              <span className="text-gray-600">Access:</span>
              <span className="ml-1 font-medium">{specs.users}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Technology:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {specs.technology.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'mobile':
        return (
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-gray-600">Platforms: {specs.platforms}</span>
              {/* <div className="flex gap-1 mt-1">
                {specs.platforms.map(platform => (
                  <span key={platform} className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded">
                    {platform}
                  </span>
                ))}
              </div> */}
            </div>
            {/* <div className="text-sm">
              <span className="text-gray-600">User Types:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {specs.userTypes.slice(0, 2).map(type => (
                  <span key={type} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {type}
                  </span>
                ))}
                {specs.userTypes.length > 2 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    +{specs.userTypes.length - 2}
                  </span>
                )}
              </div>
            </div> */}
            <div className="text-sm">
              <span className="text-gray-600">Technology:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {specs.technology.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Project Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            project.status === 'Live' 
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white'
          }`}>
            {project.status}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getProjectTypeColor(project.projectType)}`}>
            {project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1).replace('-', ' ')}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium">
            {project.year}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Project Title & Client */}
        <div className="mb-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer" className="cursor-pointer">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-blue-600">{project.client}</p>
          </a>
          {/* <p className="text-xs text-gray-500 mt-1">{project.category}</p> */}
        </div>

        {/* Client Story */}
        <div className="mb-2 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm italic text-gray-700">"{project.story}"</p>
        </div>

        {/* Project Specifications */}
        <div className="mb-4 p-3 bg-white  rounded-lg">
          {/* <h4 className="text-sm font-semibold text-gray-900 mb-2">Specs:</h4> */}
          {renderSpecs(project)}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button group/btn flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium text-center flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
            >
             <span className="flex items-center">
                  View Project
                  <span className="ml-1 opacity-0 group-hover/btn:opacity-100 transform translate-x-1 group-hover/btn:translate-x-0 transition-all duration-300">
                    →
                  </span>
                </span>
            </a>
          ) : (
            <button className="flex-1 bg-gray-300 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
              Private Project
            </button>
          )}

          {project.url ? (
           <a
              href={project.url}
              target="_blank"
               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
          </a>
          ) : (
            <button className="bg-gray-300 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          )}
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
  );
}

export default function ProfessionalPortfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const statsRef = useRef();
  const isStatsVisible = useIntersectionObserver(statsRef);

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.projectType === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">Our Professional Portfolio</h1>
            <p className='text-xl'>Every project tells a story of challenges, creativity, and results. Here, we highlight our most notable works.</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div ref={statsRef} className="bg-gradient-to-r from-blue-600 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter end={portfolioData.stats.totalProjects} isVisible={isStatsVisible} />+
              </div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter end={portfolioData.stats.happyClients} isVisible={isStatsVisible} />+
              </div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter end={portfolioData.stats.yearsExperience} isVisible={isStatsVisible} />+
              </div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter end={portfolioData.stats.technologiesUsed} isVisible={isStatsVisible} />+
              </div>
              <div className="text-blue-100">Technologies</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Filter Section */}
      <div className='w-full bg-gradient-to-r from-stone-100 to-gray-100'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        {/* <div className="flex flex-wrap justify-center gap-3 mb-8">
          {portfolioData.categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:scale-102'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div> */}

        {/* Projects Grid */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {activeCategory === 'all' ? 'Highlights of Our Work' : 
               portfolioData.categories.find(cat => cat.id === activeCategory)?.name}
            </h2>
            <p className="text-lg text-gray-900">
              The solutions that made a real impact for our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} 
              className=""/>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Please select a different category</p>
          </div>
        )}
      </div>
</div>
      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 85+ satisfied clients who trusted us with their digital transformation journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Get Started Today
            </button>
            <button className="bg-transparent text-white px-8 py-3 rounded-lg border border-white hover:bg-white hover:text-gray-900 transition-colors font-medium">
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
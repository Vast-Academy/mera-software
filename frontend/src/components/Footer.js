import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlusCircle, Home, UserCircle, Wallet, MessageSquare } from 'lucide-react';
import Context from '../context';
import SummaryApi from '../common';

const Footer = () => {
  const user = useSelector(state => state?.user?.user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const context = useContext(Context);
  const navigate = useNavigate();
  const [activeProjectId, setActiveProjectId] = useState(null);

  useEffect(() => {
    // Fetch active project when user is logged in
    const fetchActiveProject = async () => {
      if (!user?._id) return;
      
      try {
        const response = await fetch(SummaryApi.ordersList.url, {
          method: SummaryApi.ordersList.method,
          credentials: 'include'
        });
        
        const data = await response.json();
        if (data.success) {
          // Get all orders
          const allOrders = data.data || [];
          
          // Filter website projects
          const websiteProjects = allOrders.filter(order => {
            const category = order.productId?.category?.toLowerCase();
            return ['standard_websites', 'dynamic_websites', 'web_applications', 'mobile_apps'].includes(category);
          });
          
          // Find active (in-progress) project
          const activeProj = websiteProjects.find(project => 
            project.projectProgress < 100 || project.currentPhase !== 'completed'
          );
          
          if (activeProj) {
            setActiveProjectId(activeProj._id);
          }
        }
      } catch (error) {
        console.error('Error fetching active project:', error);
      }
    };

    fetchActiveProject();
  }, [user?._id]);
  
  // Handle click on My Project button
  const handleMyProjectClick = (e) => {
    e.preventDefault();
    setActiveTab('project');
    
    if (activeProjectId) {
      navigate(`/project-details/${activeProjectId}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <>
       {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-bold">MeraSoftware</span>
              </div>
              <p className="text-gray-300 text-lg mb-6 max-w-md">Building enterprise-grade software solutions that drive business growth and digital transformation for forward-thinking companies.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm font-bold">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm font-bold">in</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Services</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise Software</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cloud Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Solutions</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">CRM Systems</a></li>
                <li><a href="#" className="hover:text-white transition-colors">E-commerce Platforms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portfolio Websites</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Automation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Development</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 MeraSoftware. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
      {/* Mobile Footer Navigation - Hidden on desktop */}
      <div className="md:hidden mt-24">
        {/* Bottom Navigation */}
        <footer className="bg-white border-t fixed bottom-0 left-0 right-0 z-10">
          <div className="flex justify-between items-center px-2">
            <Link to={"/"}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('home')}
            >
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </Link>
            
            <Link to={user?._id ? "/wallet" : "/login"}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === 'wallet' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('wallet')}
            >
              <Wallet size={20} />
              {user?._id ? (
                <span className="text-xs mt-1">
                  ₹{context?.walletBalance || 0}
                </span>
              ) : (
                <span className="text-xs mt-1">Wallet</span>
              )}
            </Link>
            
            <Link to={"/start-new-project"} 
              className="flex flex-col items-center py-2 px-4"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center -mt-5 shadow-lg">
                <PlusCircle size={24} className="text-white" />
              </div>
              <span className="text-xs mt-1 text-blue-600">Explore</span>
            </Link>
            
            {/* My Project - Using onClick handler to navigate to active project */}
            <Link to={"/support"}
            className={`flex flex-col items-center py-2 px-4 ${activeTab === 'orders' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('orders')}
          >
            <MessageSquare size={20} />
            <span className="text-xs mt-1">Support</span>
          </Link>
            
            {/* User Profile - Show profile image if logged in and image exists */}
            <Link to={user?._id ? "/profile" : "/login"}
              className={`flex flex-col items-center py-2 px-4 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('profile')}
            >
              {user?._id ? (
                <>
                  {user?.profilePic ? (
                    <img src={user.profilePic} className="w-6 h-6 rounded-full" alt={user?.name} />
                  ) : (
                    <UserCircle size={20} />
                  )}
                  <span className="text-xs mt-1">You</span>
                </>
              ) : (
                <>
                  <UserCircle size={20} />
                  <span className="text-xs mt-1">Login</span>
                </>
              )}
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
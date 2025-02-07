import React, { useState, useEffect } from 'react';
import { FiArrowRight } from "react-icons/fi";
import { LuSmartphone } from "react-icons/lu";
import { BsFillBarChartFill, BsCalendar3 } from "react-icons/bs";
import { IoBarChartSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';

const AppConvertingBanner = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); 

  const handleOrderClick = (orderId) => {
    navigate(`/project-details/${orderId}`);
  };
  
  // Get user from Redux store
  const user = useSelector(state => state?.user?.user);

  // Fetch orders when user is logged in
  useEffect(() => {
    if (user?._id) {
      fetchOrders();

      // Set up polling for updates every 3 seconds
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true); 
    try {
      const response = await fetch(SummaryApi.ordersList.url, {
        method: SummaryApi.ordersList.method,
        credentials: 'include',
      });
      const data = await response.json();
      
      if (data.success) {
        // Filter only website related orders
        const websiteOrders = data.data.filter(order => 
          ['static_websites', 'standard_websites', 'dynamic_websites'].includes(
            order.productId?.category?.toLowerCase()
          )
        );
        setOrders(websiteOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // Data fetch hone ke baad loading false kar do
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Minimum swipe distance and slides remain same as before
  const minSwipeDistance = 50;
  const slides = [
    {
      title: "Welcome Dear Client",
      subtitle: "Track Your Project Progress",
      description: "Login to view your website development progress",
      icon: <BsFillBarChartFill className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Convert Website to Mobile App",
      subtitle: "Expand Your Reach",
      description: "Transform your website into a mobile application",
      icon: <LuSmartphone className="w-12 h-12 text-blue-500" />,
    }
  ];

  // Touch handlers remain same as before
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Rendering Logic Fix
  if (loading ) {
    return (
      <div className='container mx-auto px-4'>
        <div className="bg-white rounded-xl py-6 px-2 shadow-lg max-w-xl mx-auto">
          <div className="animate-pulse px-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='container mx-auto px-4'>
    <div className="bg-white rounded-xl py-6 px-2 shadow-lg max-w-xl mx-auto overflow-hidden">
      <div className="relative">
        {user?._id && orders.length > 0 ? (
         <div className="px-4">
         <div
           className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4"
           onClick={() => handleOrderClick(orders[0]._id)}
         >
           {/* Main container with two columns */}
           <div className="flex justify-between items-start">
             {/* Left column with order details */}
             <div className="flex-1 pr-4">
               <div className="mb-4">
                 <h3 className="font-medium text-gray-900">
                   {orders[0].productId?.serviceName}
                 </h3>
                 <p className="text-sm text-gray-500">
                  • {orders[0].productId?.category?.split('_').join(' ')}
                 </p>
                 <p className="text-sm text-gray-500">
                   #{orders[0]._id.slice(-6)} 
                 </p>
               </div>
               
               {/* Project Start Info */}
               <div className="flex items-center text-sm text-gray-600">
                 <BsCalendar3 className="h-4 w-4 text-blue-500 mr-2" />
                 <div>
                 <span>Started:</span>
                 <span>{formatDate(orders[0].createdAt)} at {formatTime(orders[0].createdAt)}</span>
                 </div>
               </div>
             </div>
     
             {/* Right column with larger progress circle */}
             <div className="relative w-24 h-24 flex-shrink-0">
               <svg className="w-full h-full" viewBox="0 0 36 36">
                 <path
                   d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                   fill="none"
                   stroke="#E5E7EB"
                   strokeWidth="3"
                 />
                 <path
                   d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                   fill="none"
                   stroke="#3B82F6"
                   strokeWidth="3"
                   strokeDasharray={`${orders[0].projectProgress}, 100`}
                   strokeLinecap="round"
                 />
                 <text
                   x="18"
                   y="20.35"
                   className="font-base"
                   textAnchor="middle"
                   fill="#374151"
                   style={{ fontSize: '9px' }}
                 >
                   {orders[0].projectProgress}%
                 </text>
               </svg>
             </div>
           </div>
         </div>
       </div>
        ) : user?._id ? (
          <div className="px-4 py-2">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Welcome back, {user?.name || 'User'}!
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Explore our services and start building your dream project today.
            </p>
            <div className="flex gap-4">
              <Link to="/services" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                Explore Services
                <FiArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        ) :  (
          // Slider for non-logged-in users
          <>
          <div
            className="transition-all duration-500 ease-in-out flex"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 flex flex-col items-center px-2">
                <h2 className="text-xl font-bold text-gray-800 mb-2 text-left">{slide.title}</h2>
                <p className="text-gray-600 mb-6 text-xs text-left">{slide.description}</p>
                <div className="flex gap-4">
                  <Link to="/login">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                      Login
                      <FiArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </Link>
                  {index === 1 && (
                    <Link to="/sign-up">
                      <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                        Sign Up
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          </>
        )}
      </div>
    </div>

    {/* Slide Indicators */}
    {!user?._id && (
      <div className="flex justify-center mt-3 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-blue-500 w-4' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    )}
  </div>
);
}

export default AppConvertingBanner;
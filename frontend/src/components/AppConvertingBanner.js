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

  const handleOrderClick = (orderId) => {
    navigate(`/project-details/${orderId}`);
  };
  
  // Get user from Redux store
  const user = useSelector(state => state?.user?.user);

  // Fetch orders when user is logged in
  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
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

  return (
    <div className='container mx-auto px-4'>
      <div className="bg-white rounded-xl py-6 px-2 shadow-lg max-w-xl mx-auto overflow-hidden">
        <div className="relative">
          {user?._id ? (
            orders.length > 0 ? (
              <div className="px-4">
                <div 
                  className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleOrderClick(orders[0]._id)}
                >
                  <div className="bg-gray-50 p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-semibold">
                          {orders[0].productId?.serviceName}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {orders[0].productId?.category?.split('_').join(' ')}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        Order #{orders[0]._id.slice(-6)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-6">
                      {orders[0].projectProgress === 0 ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-700 text-center font-medium">
                            Congratulations! Your website project has been initiated successfully.
                          </p>
                        </div>
                      ) : (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-700 text-center font-medium">
                            Your project is in progress. Check updates below.
                          </p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3">
                          <BsCalendar3 className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Project Start</p>
                            <p className="font-medium">{formatDate(orders[0].createdAt)}</p>
                            <p className="text-sm text-gray-500">{formatTime(orders[0].createdAt)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <IoBarChartSharp className="h-5 w-5 text-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-500">Project Progress</p>
                            <div className="mt-2">
                              <div className="h-2 w-full bg-gray-200 rounded-full">
                                <div 
                                  className="h-2 bg-blue-500 rounded-full transition-all duration-1000" 
                                  style={{ width: `${orders[0].projectProgress}%` }}
                                />
                              </div>
                              <p className="text-sm font-medium mt-1">{orders[0].projectProgress}% Complete</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Show welcome message if no website orders
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
            )
          ) : (
            // Original slider for non-logged in users
            <div
              className="transition-all duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 flex flex-col items-center px-2"
                >
                  <div className=''>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 text-left">
                      {slide.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-xs text-left">
                      {slide.description}
                    </p>
                  </div>
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
          )}
        </div>
      </div>
      
      {/* Slide Indicators - only show when not logged in */}
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
};

export default AppConvertingBanner;
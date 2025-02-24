import React, { useState, useEffect } from 'react';
import { FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { useOnlineStatus } from '../App';
import StorageService from '../utils/storageService';
import { FileText, Clock, ExternalLink } from "lucide-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import dynamic from '../assest/website-types/business-dynamic-website-va-computers-amritsar.jpg'

const AppConvertingBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOnline, isInitialized } = useOnlineStatus();
  
  // States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [orders, setOrders] = useState(null);
  const [guestSlides, setGuestSlides] = useState(null);
  const [userWelcome, setUserWelcome] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataInitialized, setDataInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const user = useSelector(state => state?.user?.user);
  const initialized = useSelector(state => state?.user?.initialized);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper functions
  const filterWebsiteOrders = (orders) => {
    if (!orders) return [];
  
    // Get all relevant orders (both website projects and updates)
    const relevantOrders = orders.filter(order => {
      const category = order.productId?.category?.toLowerCase();
      return (
        category === 'website_updates' ||
        ['standard_websites', 'dynamic_websites', 'web_applications', 'mobile_apps'].includes(category)
      );
    });
  
    // Sort orders by date (most recent first)
    const sortedOrders = relevantOrders.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  
    // If there's an active update plan, show it first
    const activeUpdatePlan = sortedOrders.find(order => 
      order.productId?.category === 'website_updates' && 
      order.isActive
    );
  
    if (activeUpdatePlan) {
      return [activeUpdatePlan];
    }
  
    // Otherwise, show the most recent website project
    const websiteProject = sortedOrders.find(order => 
      ['standard_websites', 'dynamic_websites', 'web_applications', 'mobile_apps'].includes(
        order.productId?.category?.toLowerCase()
      )
    );
  
    return websiteProject ? [websiteProject] : [];
  };

  // Clear all banner states
  const clearBannerStates = () => {
    setOrders(null);
    setGuestSlides(null);
    setUserWelcome(null);
    setCurrentSlide(0);
    setDataInitialized(false);
    setIsLoading(true);
  };
  
  // Effect to handle user state changes
  useEffect(() => {
    const handleUserStateChange = async () => {
      if (!isInitialized) return;

      // Clear states when user changes
      clearBannerStates();

      if (!user?._id) {
        // Load guest slides
        await loadGuestSlides();
      } else {
        // Start fresh load for logged-in users
        setIsLoading(true);
        setDataInitialized(false);
      }
    };
    
    handleUserStateChange();
  }, [isInitialized, user?._id, initialized]);

  const loadGuestSlides = async () => {
    if (!isInitialized) return;
    
    try {
      // Try to get from localStorage first
      const cachedSlides = StorageService.getGuestSlides();
      
      if (cachedSlides) {
        setGuestSlides(cachedSlides);
        setDataInitialized(true);
        setIsLoading(false);
        
        // If online, fetch fresh data
        if (isOnline) {
          fetchFreshGuestSlides();
        }
        return;
      }
      
      // If online and no cache, fetch fresh
      if (isOnline) {
        await fetchFreshGuestSlides();
      } else {
        setIsLoading(false);
        setDataInitialized(true);
      }
    } catch (error) {
      console.error('Error in loadGuestSlides:', error);
      setIsLoading(false);
      setDataInitialized(true);
    }
  };

  const fetchFreshGuestSlides = async () => {
    if (!isOnline) return null;
    
    try {
      const response = await fetch(SummaryApi.guestSlides.url);
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setGuestSlides(data.data);
        setDataInitialized(true);
        
        // Store in localStorage
        StorageService.setGuestSlides(data.data);
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching fresh slides:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Combined data fetching effect
  useEffect(() => {
    const loadData = async () => {
      if (!isInitialized || !initialized) return;
      
      if (!user?._id) {
        await loadGuestSlides();
        return;
      }
      
      // Handle logged-in user data
      try {
        // Check localStorage first
        const cachedOrders = StorageService.getUserOrders(user._id);
        const cachedWelcome = StorageService.getUserWelcome();
        
        // Process orders if they exist
        if (cachedOrders) {
          const filteredOrders = filterWebsiteOrders(cachedOrders);
          setOrders(filteredOrders);
        }
        
        // Process welcome data if it exists
        if (cachedWelcome) {
          setUserWelcome(cachedWelcome);
        }
        
        setDataInitialized(true);
        setIsLoading(false);
        
        // If online, fetch fresh data
        if (isOnline) {
          // Fetch fresh data in parallel
          await Promise.all([
            fetchUserOrders(),
            fetchUserWelcome()
          ]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
        setDataInitialized(true);
      }
    };
    
    loadData();
  }, [user?._id, initialized, isInitialized, isOnline]);

  const fetchUserOrders = async () => {
    try {
      const response = await fetch(SummaryApi.ordersList.url, {
        method: SummaryApi.ordersList.method,
        credentials: 'include'
      });
      
      const data = await response.json();
      if (data.success) {
        const filteredOrders = filterWebsiteOrders(data.data);
        setOrders(filteredOrders);
        setDataInitialized(true);
        
        // Store in localStorage
        StorageService.setUserOrders(user._id, data.data);
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return null;
    }
  };

  const fetchUserWelcome = async () => {
    try {
      const response = await fetch(SummaryApi.userWelcome.url);
      const data = await response.json();
      
      if (data.success && data.data) {
        setUserWelcome(data.data);
        
        // Store in localStorage
        StorageService.setUserWelcome(data.data);
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user welcome:', error);
      return null;
    }
  };

  const loadUserWelcome = async () => {
    try {
      // First check localStorage
      const cachedWelcome = StorageService.getUserWelcome();
      if (cachedWelcome) {
        setUserWelcome(cachedWelcome);
        // Don't set dataInitialized here to avoid race condition
        
        // Background refresh if online
        if (isOnline) {
          try {
            const welcomeResponse = await fetch(SummaryApi.userWelcome.url);
            const welcomeData = await welcomeResponse.json();
            if (welcomeData.success && welcomeData.data) {
              setUserWelcome(welcomeData.data);
              StorageService.setUserWelcome(welcomeData.data);
            }
          } catch (error) {
            console.error('Error fetching fresh welcome data:', error);
          }
        }
        return cachedWelcome;
      }
      
      // If no cache and online, fetch from API
      if (isOnline) {
        const welcomeResponse = await fetch(SummaryApi.userWelcome.url);
        const welcomeData = await welcomeResponse.json();
        if (welcomeData.success && welcomeData.data) {
          setUserWelcome(welcomeData.data);
          StorageService.setUserWelcome(welcomeData.data);
          return welcomeData.data;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching welcome data:', error);
      return null;
    }
  };

 
  // Helper functions remain the same
const isWebsiteService = (category = '') => {
  return ['static_websites', 'standard_websites', 'dynamic_websites'].includes(category?.toLowerCase());
};

const isUpdatePlan = (category = '') => {
  return category?.toLowerCase() === 'website_updates';
};

const calculateRemainingDays = (order) => {
  if (!order.createdAt || !order.productId?.validityPeriod) return 0;
  
  // No need to convert months to days anymore
  const validityInDays = order.productId.validityPeriod;
  
  const startDate = new Date(order.createdAt);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + validityInDays);
  
  const today = new Date();
  const remainingDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  
  return Math.max(0, remainingDays);
};


  const handleOrderClick = (orderId) => {
    navigate(`/project-details/${orderId}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Touch handlers for guest slides
  const minSwipeDistance = 50;

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

    if (isLeftSwipe && currentSlide < guestSlides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };
  
 // Check if system isn't initialized yet
 if (!isInitialized || !initialized) {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-white rounded-xl py-6 px-2 shadow-lg max-w-xl mx-auto overflow-hidden">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Guest Slides Desktop View
const GuestSlidesDesktop = ({ slide }) => (
  <div className="bg-gradient-to-r from-blue-50 to-red-50 py-16 ">
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            {slide.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {slide.description}
          </p>
          <div className="flex gap-4">
            {slide.ctaButtons?.map((button, btnIndex) => (
              <a key={btnIndex} href={button.link}>
                <button 
                  className={`${
                    button.type === 'primary' 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'border border-red-600 text-red-600 hover:bg-red-50'
                  } px-8 py-3 rounded-lg text-lg transition-colors flex items-center`}
                >
                  {button.text}
                  {button.type === 'primary' && <ArrowRight className="ml-2 w-5 h-5" />}
                </button>
              </a>
            ))}
          </div>
        </div>
        <div className="w-1/2 flex justify-end">
          <img src={dynamic} alt="Hero" className="rounded-lg shadow-xl" />
        </div>
      </div>
    </div>
  </div>
);

// Guest Slides Mobile View
const GuestSlidesMobile = ({ slide }) => (
  <div className='px-4 rounded-xl shadow-sm '>
  <div className="bg-gradient-to-r rounded-xl  from-blue-50 to-red-50 px-4 py-5">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2 text-left">
        {slide.title}
      </h1>
      <p className="text-sm text-gray-600 mb-3 text-left">
        {slide.description}
      </p>
      <div className="flex flex-col gap-3">
        {slide.ctaButtons?.map((button, btnIndex) => (
          <a key={btnIndex} href={button.link} className="w-full flex justify-center">
            <button 
              className={`${
                button.type === 'primary' 
                  ? 'bg-blue-500 hover:bg-blue-700 text-white' 
                  : 'border bg-blue-500 hover:bg-red-50'
              } px-6 py-2.5 rounded-lg text-sm transition-colors flex items-center text-center justify-center`}
            >
              {button.text}
              {button.type === 'primary' && <ArrowRight className="ml-2 mt-1 w-3 h-3" />}
            </button>
          </a>
        ))}
      </div>
    </div>
  </div>
  </div>
);

// If we have guest slides, show them immediately (even if other data is still loading)
if (!user?._id && guestSlides?.length > 0) {
  return (
    <>
     {/* <div className='container mx-auto px-4'>
       <div className="bg-white rounded-xl py-5 max-w-xl mx-auto overflow-hidden">
         <div className="relative"> */}
          <div className="relative container mx-auto">
          <div
            className="transition-all duration-500 ease-in-out flex"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
           {isMobile ? (
            <GuestSlidesMobile slide={guestSlides[currentSlide]} />
          ) : (
            <GuestSlidesDesktop slide={guestSlides[currentSlide]} />
          )}
        </div>

        {/* Navigation Arrows - Only show on desktop */}
        {!isMobile && guestSlides.length > 1 && (
          <>
            <button 
              onClick={() => currentSlide > 0 && setCurrentSlide(prev => prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button 
              onClick={() => currentSlide < guestSlides.length - 1 && setCurrentSlide(prev => prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </>
        )}


          {/* Slide Indicators */}
          {guestSlides.length > 1 && (
            <div className="flex justify-center mt-3 gap-2">
              {guestSlides.map((_, index) => (
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
          </>
    //     </div>
    //   </div>
    // </div>
  );
}

// Only show loading if we're still loading AND have no data
if (isLoading && !dataInitialized) {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-white rounded-xl py-6 px-2 shadow-lg max-w-xl mx-auto overflow-hidden">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// For everything else, show the main content structure
return (
  <div className='container mx-auto px-4'>
    <div className="bg-white rounded-xl py-5 max-w-xl mx-auto overflow-hidden">
      <div className="relative">
        {/* Guest Slides View - Show when user is not logged in */}
        {!user?._id && dataInitialized && guestSlides?.length > 0 && (
          <>
            <div
              className="transition-all duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {guestSlides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 flex flex-col items-center px-2">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 text-left">
                      {slide.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-xs text-left">
                      {slide.description}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {slide.ctaButtons?.map((button, btnIndex) => (
                      <Link key={btnIndex} to={button.link}>
                        <button 
                          className={`px-6 py-2 ${
                            button.type === 'primary' 
                              ? 'bg-blue-500 text-white hover:bg-blue-600' 
                              : 'border border-blue-500 text-blue-500 hover:bg-blue-50'
                          } rounded-lg transition-colors flex items-center`}
                        >
                          {button.text}
                          {button.type === 'primary' && <FiArrowRight className="w-4 h-4 ml-2" />}
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            {guestSlides.length > 1 && (
              <div className="flex justify-center mt-3 gap-2">
                {guestSlides.map((_, index) => (
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
          </>
        )}

        {/* Orders View - Show when user has orders */}
        {user?._id && dataInitialized && orders?.length > 0 &&(
         <div className="px-4">
         <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
           <div className="p-4">
             <div className="flex justify-between items-start">
               <div>
                 <div className="flex items-center">
                   <FileText className="h-5 w-5 text-teal-500 mr-2" />
                   <h2 className="text-base font-bold text-gray-800">
                     {orders[0].productId?.serviceName}
                   </h2>
                 </div>
                 <p className="text-sm text-gray-500 mt-0.5 ml-7">
                   {orders[0].productId?.category?.split('_').join(' ')}
                 </p>
               </div>
               <div className="bg-gray-50 rounded-md px-2 py-0.5 border border-gray-200">
                 <span className="text-xs text-gray-500">#{orders[0]._id.slice(-6)}</span>
               </div>
             </div>
             
             {(() => {
  const order = orders[0];
  
  if (isUpdatePlan(order.productId?.category)) {
    // Calculate remaining days using our new function
    const remainingDays = calculateRemainingDays(order);
    
    // Calculate validity percentage
    const validityInDays = order.productId.validityPeriod * 30;
    const startDate = new Date(order.createdAt);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + validityInDays);
    const today = new Date();
    const totalDuration = endDate - startDate;
    const elapsed = today - startDate;
    const validityPercentage = Math.max(0, Math.min(100, 
      ((totalDuration - elapsed) / totalDuration) * 100
    ));
    
    // Calculate update metrics
    const totalUpdates = order.productId?.updateCount || 0;
    const usedUpdates = order.updatesUsed || 0;
    
    return (
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Validity</span>
            <span className="text-sm font-bold text-teal-600">
              {remainingDays}d left
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div 
              className="h-full bg-teal-500 rounded-full transition-all duration-1000"
              style={{ 
                width: `${validityPercentage}%` 
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Updates</span>
            <span className="text-sm font-bold text-teal-600">
              {`${usedUpdates}/${totalUpdates}`}
            </span>
          </div>
          <div className="flex items-end h-6 space-x-1">
            {Array.from({ length: totalUpdates }).map((_, i) => (
              <div 
                key={i} 
                className={`w-1 rounded-t ${i < usedUpdates ? 'bg-teal-500' : 'bg-gray-200'}`}
                style={{ height: `${((i + 1) / totalUpdates) * 100}%` }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <span className="text-sm font-bold text-teal-600">
              {order.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="relative h-6 flex items-center">
            <div 
              className={`w-full py-1 px-2 text-xs text-center rounded ${
                order.isActive 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {order.isActive ? 'Plan Active' : 'Plan Inactive'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original website project metrics
  return (
    <div className="mt-5 grid grid-cols-3 gap-3">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-bold text-teal-600">{order.projectProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div 
            className="h-full bg-teal-500 rounded-full transition-all duration-1000"
            style={{ width: `${order.projectProgress}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Tasks</span>
          <span className="text-sm font-bold text-teal-600">
            {order.checkpoints ? 
              `${order.checkpoints.filter(cp => cp.completed).length}/${order.checkpoints.length}` : 
              "0/0"}
          </span>
        </div>
        <div className="flex items-end h-6 space-x-1">
          {[15, 25, 40, 30, 42, 35, 50, 45, 60].map((height, i) => (
            <div 
              key={i} 
              className="w-1 bg-teal-500 rounded-t"
              style={{height: `${height}%`}}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Time</span>
          <span className="text-sm font-bold text-teal-600">8d left</span>
        </div>
        <div className="relative h-6 flex items-center">
          <div className="h-1 w-full bg-gray-200 rounded"></div>
          <div className="absolute h-1 w-2/3 bg-teal-500 rounded" />
        </div>
      </div>
    </div>
  );
})()}
             
             <div className="mt-4 pt-3 border-t border-gray-100">
               <div className="flex justify-between items-center">
                 <div className="flex items-center text-sm text-gray-500">
                   <Clock className="h-4 w-4 mr-1.5 text-teal-500" />
                   <span>Started: {formatDate(orders[0].createdAt)}</span>
                 </div>
                 <button 
                   className="flex items-center text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors"
                   onClick={() => handleOrderClick(orders[0]._id)}
                 >
                   <span>View Details</span>
                   <ExternalLink className="ml-1 h-4 w-4" />
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
     )}

        {/* User Welcome View - Show when user is logged in but has no orders */}
        {user?._id && dataInitialized && orders?.length === 0 && userWelcome &&(
          <div className="px-4 py-2">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {userWelcome.title.replace('{username}', user?.name || 'User')}
            </h2>
            <p className="text-gray-600 mb-4 text-sm">{stripHtmlTags(userWelcome.description)}</p>
            <div className="flex gap-4">
              <Link 
                to={userWelcome.cta.link} 
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                {userWelcome.cta.text}
                <FiArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        )}

        {/* Empty state - if we're initialized but have no content to show */}
        {dataInitialized && !isLoading && 
         !guestSlides?.length && 
         !(user?._id && orders?.length > 0) && 
         !(user?._id && orders?.length === 0 && userWelcome) && (
          <div className="px-4 py-6 text-center">
            <p className="text-gray-500">No content available</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default AppConvertingBanner;
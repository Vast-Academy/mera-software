import React, { useState, useEffect } from 'react';
import { FiArrowRight } from "react-icons/fi";
import { BsCalendar3 } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { setUserDetails } from '../store/userSlice';
import SummaryApi from '../common';
import { useDatabase } from '../context/DatabaseContext';
import StorageService from '../utils/storageService';
import { FileText, Clock, ExternalLink } from "lucide-react";

const AppConvertingBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [orders, setOrders] = useState(null);
  const [guestSlides, setGuestSlides] = useState(null);
  const [userWelcome, setUserWelcome] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataInitialized, setDataInitialized] = useState(false);
  // const [isCacheChecked, setIsCacheChecked] = useState(false);
  // const [shouldShowGuest, setShouldShowGuest] = useState(false);
  
  // const { db, isCacheValid, isInitialized } = useDatabase();
  const { hybridCache, isInitialized, isOnline } = useDatabase();
  const user = useSelector(state => state?.user?.user);
  const initialized = useSelector(state => state?.user?.initialized);

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
  // Update your useEffect for user state changes
useEffect(() => {
  const handleUserStateChange = async () => {
    if (!isInitialized) return;

    // Clear states when user changes
    clearBannerStates();

    if (!user?._id) {
      // Load guest slides for non-logged in users
      await loadGuestSlides();
    } else {
      // Start fresh load for logged-in users
      setIsLoading(true);
      setDataInitialized(false);
    }
  };
  
  handleUserStateChange();
}, [isInitialized, user?._id, initialized]); // Add initialized as dependency


 // Constants
// const GUEST_SLIDES_STORAGE_KEY = 'guestSlides';
// const GUEST_SLIDES_SESSION_KEY = 'sessionGuestSlides';
// const GUEST_SLIDES_INDEXED_DB_KEY = 'indexedDBGuestSlides';
// const LAST_LOGOUT_TIMESTAMP = 'lastLogoutTimestamp';

const CACHE_KEYS = {
  GUEST_SLIDES: 'guest_slides',
  USER_ORDERS: 'user_orders',
  USER_WELCOME: 'user_welcome'
};

const CACHE_DURATION = {
  GUEST_SLIDES: 24 * 60 * 60 * 1000, // 24 hours
  USER_ORDERS: 30 * 60 * 1000,       // 30 minutes
  USER_WELCOME: 12 * 60 * 60 * 1000  // 12 hours
};


// ----- Enhanced loadGuestSlides function -----
const loadGuestSlides = async () => {
  if (!isInitialized) return;
  
  try {
    // Try to get from hybrid cache first
    const cachedData = await hybridCache.get('apiCache', CACHE_KEYS.GUEST_SLIDES);
    
    if (cachedData?.data) {
      console.log('Found slides in cache:', cachedData.data.length);
      setGuestSlides(cachedData.data);
      setDataInitialized(true);
      setIsLoading(false);
      
      // Only fetch fresh data if online and cache is old
      if (isOnline && !hybridCache.isValid(cachedData.timestamp, CACHE_DURATION.GUEST_SLIDES)) {
        fetchFreshGuestSlides().catch(console.error);
      }
      return;
    }
    
    // If online and no valid cache, fetch fresh
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

// Enhanced fetchFreshGuestSlides to handle errors better
const fetchFreshGuestSlides = async () => {
  if (!isOnline) return null;
  
  try {
    const response = await fetch(SummaryApi.guestSlides.url);
    const data = await response.json();
    
    if (data.success && Array.isArray(data.data)) {
      setGuestSlides(data.data);
      setDataInitialized(true);
      
      // Store in hybrid cache
      await hybridCache.store('apiCache', CACHE_KEYS.GUEST_SLIDES, data.data, 'high');
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
        // Load both orders and welcome data in parallel
        const [cachedOrders, cachedWelcome] = await Promise.all([
          hybridCache.get('apiCache', `${CACHE_KEYS.USER_ORDERS}_${user._id}`),
          hybridCache.get('apiCache', CACHE_KEYS.USER_WELCOME)
        ]);
        
        // Process orders if they exist
        if (cachedOrders?.data) {
          const filteredOrders = filterWebsiteOrders(cachedOrders.data);
          setOrders(filteredOrders);
        }
        
        // Process welcome data if it exists
        if (cachedWelcome?.data) {
          setUserWelcome(cachedWelcome.data);
        }
        
        setDataInitialized(true);
        setIsLoading(false);
        
        // If online, refresh stale data
        if (isOnline) {
          const refreshPromises = [];
          
          // Check if orders cache is stale
          if (!cachedOrders?.data || !hybridCache.isValid(cachedOrders.timestamp, CACHE_DURATION.USER_ORDERS)) {
            refreshPromises.push(fetchUserOrders());
          }
          
          // Check if welcome cache is stale
          if (!cachedWelcome?.data || !hybridCache.isValid(cachedWelcome.timestamp, CACHE_DURATION.USER_WELCOME)) {
            refreshPromises.push(fetchUserWelcome());
          }
          
          // Refresh stale data in background
          Promise.all(refreshPromises).catch(console.error);
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
  
  // 6. Add these new functions for fetching user data
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
        
        // Store in cache
        await hybridCache.store(
          'apiCache', 
          `${CACHE_KEYS.USER_ORDERS}_${user._id}`, 
          data.data, 
          'high'
        );
        
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return null;
    }
  };
  
  // Add new function for fetching user welcome data
  const fetchUserWelcome = async () => {
    try {
      const response = await fetch(SummaryApi.userWelcome.url);
      const data = await response.json();
      
      if (data.success && data.data) {
        setUserWelcome(data.data);
        
        // Store in cache
        await hybridCache.store(
          'apiCache',
          CACHE_KEYS.USER_WELCOME,
          data.data,
          'medium'
        );
        
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user welcome:', error);
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

// If we have guest slides, show them immediately (even if other data is still loading)
if (!user?._id && guestSlides?.length > 0) {
  return (
    <div className='container mx-auto px-4'>
      <div className="bg-white rounded-xl py-5 max-w-xl mx-auto overflow-hidden">
        <div className="relative">
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
        </div>
      </div>
    </div>
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
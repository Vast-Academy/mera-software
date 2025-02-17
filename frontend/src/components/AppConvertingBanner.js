import React, { useState, useEffect } from 'react';
import { FiArrowRight } from "react-icons/fi";
import { BsCalendar3 } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { setUserDetails } from '../store/userSlice';
import SummaryApi from '../common';
import { useDatabase } from '../context/DatabaseContext';
import StorageService from '../utils/storageService';

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
    return orders?.filter(order => 
      ['standard_websites', 'dynamic_websites', 'web_applications', 'mobile_apps'].includes(
        order.productId?.category?.toLowerCase()
      )
    ) || [];
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

      if (!user?._id) {
        // Clear only user-specific states
        setOrders(null);
        setUserWelcome(null);
        
        // Load guest slides without clearing them first
        await loadGuestSlides();
      }
    };
    handleUserStateChange();
  }, [isInitialized, user?._id]);


  const loadGuestSlides = async () => {
    if (!isInitialized) return;
    
    setIsLoading(true);
    
    try {
      // Pehle localStorage se check karo
      const cachedSlides = StorageService.getGuestSlides();
      if (cachedSlides) {
        setGuestSlides(cachedSlides);
        setDataInitialized(true);
        setIsLoading(false);
  
        // Background mein API se fresh data fetch karo
        if (isOnline) {
          try {
            const response = await fetch(SummaryApi.guestSlides.url);
            const data = await response.json();
            
            if (data.success && data.data) {
              // Compare new data with cached data
              const isDataDifferent = JSON.stringify(data.data) !== JSON.stringify(cachedSlides);
              
              if (isDataDifferent) {
                setGuestSlides(data.data);
                StorageService.setGuestSlides(data.data);
              }
            }
          } catch (error) {
            console.error('Error fetching fresh guest slides:', error);
            // No need to set cached data again as it's already set
          }
        }
        return; // Exit early if we have cache
      }
  
      // If no cache, then fetch from API
      if (isOnline) {
        const response = await fetch(SummaryApi.guestSlides.url);
        const data = await response.json();
        
        if (data.success && data.data) {
          setGuestSlides(data.data);
          StorageService.setGuestSlides(data.data);
          setDataInitialized(true);
        }
      }
    } catch (error) {
      console.error('Error in loadGuestSlides:', error);
    } finally {
      setIsLoading(false);
    }
  };


  // Combined data fetching effect
  useEffect(() => {
    const loadData = async () => {
      if (!isInitialized || !initialized) return;
  
      try {
        setIsLoading(true);

        if (!user?._id) {
          await loadGuestSlides();
          return;
        }
     
        // For logged in users
        const cachedOrders = StorageService.getUserOrders(user._id);
        
        // Fetch welcome message immediately for logged-in users
        await loadUserWelcome();
        
        if (cachedOrders) {
          const filteredOrders = filterWebsiteOrders(cachedOrders);
          setOrders(filteredOrders);
          setDataInitialized(true);
        }

        // Background mein fresh data fetch karo
        if (isOnline) {
          try {
            const ordersResponse = await fetch(SummaryApi.ordersList.url, {
              method: SummaryApi.ordersList.method,
              credentials: 'include'
            });
            const ordersData = await ordersResponse.json();
             
            if (ordersData.success) {
              StorageService.setUserOrders(user._id, ordersData.data);
              const userOrders = filterWebsiteOrders(ordersData.data);
              setOrders(userOrders);
            }
          } catch (error) {
            console.error('Error fetching fresh orders:', error);
          }
        }
      } catch (error) {
        console.error('Error in data fetching:', error);
      } finally {
        setIsLoading(false);
      }
    };
      
    loadData();
  }, [user?._id, initialized, isInitialized, isOnline]);
  
  const loadUserWelcome = async () => {
    try {
      // Pehle localStorage se check karo
      const cachedWelcome = StorageService.getUserWelcome();
      if (cachedWelcome) {
        setUserWelcome(cachedWelcome);
        setDataInitialized(true);
      }
      
      // Background mein fresh data fetch karo
      if (isOnline) {
        const welcomeResponse = await fetch(SummaryApi.userWelcome.url);
        const welcomeData = await welcomeResponse.json();
        if (welcomeData.success && welcomeData.data) {
          setUserWelcome(welcomeData.data);
          StorageService.setUserWelcome(welcomeData.data);
        }
      }
    } catch (error) {
      console.error('Error fetching welcome data:', error);
    }
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
  
  if (!isInitialized || !initialized || (isLoading && !dataInitialized)) {
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

  // No data state
  // if (!guestSlides || guestSlides.length === 0) {
  //   return null;
  // }



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
              <div
                className="bg-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer p-3"
                onClick={() => handleOrderClick(orders[0]._id)}
              >
                {/* Order content */}
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="mb-4">
                      <h3 className="text-xl font-medium text-gray-900">
                        {orders[0].productId?.serviceName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        • {orders[0].productId?.category?.split('_').join(' ')}
                      </p>
                      <p className="text-sm text-gray-500">
                        #{orders[0]._id.slice(-6)}
                      </p>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <BsCalendar3 className="h-4 w-4 text-blue-500 mr-2" />
                      <div>
                        <span>Started: </span>
                        <span>{formatDate(orders[0].createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Circle */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
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
        </div>
      </div>
    </div>
  );
};

export default AppConvertingBanner;
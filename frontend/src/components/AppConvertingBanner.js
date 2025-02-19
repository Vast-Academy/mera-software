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
const GUEST_SLIDES_STORAGE_KEY = 'guestSlides';
const GUEST_SLIDES_SESSION_KEY = 'sessionGuestSlides';
const GUEST_SLIDES_INDEXED_DB_KEY = 'indexedDBGuestSlides';
const LAST_LOGOUT_TIMESTAMP = 'lastLogoutTimestamp';

// ----- Enhanced loadGuestSlides function -----
const loadGuestSlides = async () => {
  if (!isInitialized) return;
 
  setIsLoading(true);
  let hasLoadedData = false;
 
  try {
    // Check if this is first load after logout (within last 10 seconds)
    const lastLogout = localStorage.getItem(LAST_LOGOUT_TIMESTAMP);
    const isRecentLogout = lastLogout && (Date.now() - parseInt(lastLogout)) < 10000;
   
    // 1. First priority: Try to set slides from storage IMMEDIATELY
    try {
      // Use a more direct way to check storage first before the async function
      let quickSlides = null;
      
      // Try sessionStorage first (fastest)
      const sessionData = sessionStorage.getItem(GUEST_SLIDES_SESSION_KEY);
      if (sessionData) {
        try {
          const parsed = JSON.parse(sessionData);
          quickSlides = Array.isArray(parsed) ? parsed : (parsed.data || null);
        } catch (e) {}
      }
      
      // Then try localStorage
      if (!quickSlides) {
        const localData = localStorage.getItem(GUEST_SLIDES_STORAGE_KEY);
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            quickSlides = Array.isArray(parsed) ? parsed : (parsed.data || null);
          } catch (e) {}
        }
      }
      
      // If found slides through quick check, set them immediately
      if (quickSlides && quickSlides.length > 0) {
        console.log('Quick-found slides in storage, setting immediately');
        setGuestSlides(quickSlides);
        setDataInitialized(true);
        hasLoadedData = true;
        
        // Continue with normal loading in background
      }
    } catch (quickError) {
      console.error('Quick load error:', quickError);
    }
    
    // Continue with regular flow - this will check all sources thoroughly
    const slidesData = await getGuestSlidesFromAllSources(isRecentLogout);
   
    if (slidesData && slidesData.length > 0) {
      console.log('Found guest slides in storage, count:', slidesData.length);
      // Set slides and mark as initialized IMMEDIATELY
      setGuestSlides(slidesData);
      setDataInitialized(true);
      hasLoadedData = true;
     
      // Save to all storage mechanisms to ensure consistency
      saveGuestSlidesToAllStorages(slidesData);
     
      // Finish loading before API refresh
      setIsLoading(false);
      
      // Only after displaying slides, try background refresh if online
      if (isOnline) {
        console.log('Background refreshing guest slides');
        fetchFreshGuestSlides(slidesData).catch(error => {
          // Silently handle API errors - we already have slides to display
          console.error('Background refresh failed:', error);
        });
      }
     
      return; // Exit early - we already have slides to show
    }
   
    // 2. Only if no slides in storage and we're online, fetch from API
    if (isOnline) {
      console.log('No slides in storage, fetching from API');
      try {
        const freshSlides = await fetchFreshGuestSlides();
        if (freshSlides && freshSlides.length > 0) {
          hasLoadedData = true;
          // Double-check to make sure slides are set in state
          setGuestSlides(freshSlides);
          setDataInitialized(true);
        } else {
          // API returned empty slides
          setDataInitialized(true);
        }
      } catch (apiError) {
        console.error('API fetch error:', apiError);
        // Show empty state rather than infinite loading
        setDataInitialized(true);
      }
    } else {
      // Offline with no stored slides - show empty state
      console.log('Offline with no stored slides');
      setDataInitialized(true);
    }
  } catch (error) {
    console.error('Error in loadGuestSlides:', error);
    // Show empty state on error rather than infinite loading
    setDataInitialized(true);
  } finally {
    // Ensure loading state is always resolved
    setIsLoading(false);
    
    // Double-check if we still don't have slides but should
    if (!hasLoadedData && !guestSlides?.length) {
      // Last resort - try direct localStorage access one more time
      try {
        const lastTry = localStorage.getItem(GUEST_SLIDES_STORAGE_KEY);
        if (lastTry) {
          const parsed = JSON.parse(lastTry);
          const finalSlides = Array.isArray(parsed) ? parsed : (parsed.data || null);
          if (finalSlides?.length) {
            console.log('Last resort: found slides, count:', finalSlides.length);
            setGuestSlides(finalSlides);
            setDataInitialized(true);
          }
        }
      } catch (e) {
        console.error('Last resort error:', e);
      }
    }
  }
};

// Enhanced fetchFreshGuestSlides to handle errors better
const fetchFreshGuestSlides = async (existingSlides = null) => {
  if (!isOnline) {
    console.log('Cannot fetch slides: offline');
    return existingSlides; // Return existing slides if offline
  }
  
  try {
    console.log('Fetching fresh guest slides from API');
    const response = await fetch(SummaryApi.guestSlides.url);
    
    // Handle unauthorized errors gracefully
    if (response.status === 401) {
      console.log('Auth error fetching slides, using existing slides');
      return existingSlides; // Return existing slides on auth error
    }
    
    const data = await response.json();
    
    if (data.success && data.data && data.data.length > 0) {
      // Only update if we got valid data that's different
      const isNewData = !existingSlides || 
        JSON.stringify(data.data) !== JSON.stringify(existingSlides);
      
      if (isNewData) {
        setGuestSlides(data.data);
        setDataInitialized(true);
        
        // Save to all storage mechanisms
        saveGuestSlidesToAllStorages(data.data);
        return data.data;
      }
      return existingSlides || data.data;
    }
    return existingSlides; // Return existing slides if API returned invalid data
  } catch (error) {
    console.error('API fetch error:', error);
    return existingSlides; // Return existing slides on error
  }
};

// Helper to try all storage mechanisms
const getGuestSlidesFromAllSources = async (isRecentLogout) => {
  // During recent logout, prioritize sessionStorage as it's less likely to be cleared
  if (isRecentLogout) {
    // Try sessionStorage first
    try {
      const sessionData = sessionStorage.getItem(GUEST_SLIDES_SESSION_KEY);
      if (sessionData) {
        const parsedData = JSON.parse(sessionData);
        // Handle both array and object formats
        const slides = Array.isArray(parsedData) ? parsedData : 
                       (parsedData.data || parsedData);
        if (slides && Array.isArray(slides) && slides.length > 0) {
          console.log('Found slides in sessionStorage after logout, count:', slides.length);
          return slides;
        }
      }
    } catch (e) {
      console.error('Session storage read error:', e);
    }
  }
  
  // Try localStorage (standard approach) - multiple possible formats
  try {
    // First through StorageService
    const serviceSlides = StorageService.getGuestSlides();
    if (serviceSlides && Array.isArray(serviceSlides) && serviceSlides.length > 0) {
      console.log('Found slides via StorageService, count:', serviceSlides.length);
      return serviceSlides;
    }
    
    // Direct localStorage access with format handling
    const localData = localStorage.getItem(GUEST_SLIDES_STORAGE_KEY);
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        // Handle different possible formats
        const slidesData = Array.isArray(parsedData) ? parsedData : 
                          (parsedData.data && Array.isArray(parsedData.data) ? parsedData.data : null);
        if (slidesData && slidesData.length > 0) {
          console.log('Found slides in direct localStorage, count:', slidesData.length);
          return slidesData;
        }
      } catch (parseError) {
        console.error('Error parsing localStorage data:', parseError);
      }
    }
  } catch (e) {
    console.error('Local storage read error:', e);
  }
  
  // Try sessionStorage (if not already tried)
  if (!isRecentLogout) {
    try {
      const sessionData = sessionStorage.getItem(GUEST_SLIDES_SESSION_KEY);
      if (sessionData) {
        const parsedData = JSON.parse(sessionData);
        // Handle both array and object formats
        const slides = Array.isArray(parsedData) ? parsedData : 
                      (parsedData.data && Array.isArray(parsedData.data) ? parsedData.data : null);
        if (slides && slides.length > 0) {
          console.log('Found slides in sessionStorage, count:', slides.length);
          return slides;
        }
      }
    } catch (e) {
      console.error('Session storage read error:', e);
    }
  }
  
  // Try preserved guest slides from logout
  try {
    const preservedData = localStorage.getItem('preservedGuestSlides');
    if (preservedData) {
      const parsedData = JSON.parse(preservedData);
      // Handle both array and object formats
      const slides = Array.isArray(parsedData) ? parsedData : 
                    (parsedData.data && Array.isArray(parsedData.data) ? parsedData.data : null);
      if (slides && slides.length > 0) {
        console.log('Found slides in preservedGuestSlides, count:', slides.length);
        return slides;
      }
    }
  } catch (e) {
    console.error('Preserved slides read error:', e);
  }
  
  // Try IndexedDB/hybridCache last (if available)
  if (hybridCache) {
    try {
      const cacheData = await hybridCache.get('apiCache', 'guest_slides');
      if (cacheData) {
        // Handle both formats
        const slides = cacheData.data || cacheData;
        if (slides && Array.isArray(slides) && slides.length > 0) {
          console.log('Found slides in hybridCache, count:', slides.length);
          return slides;
        }
      }
    } catch (e) {
      console.error('IndexedDB read error:', e);
    }
  }
  
  console.log('No guest slides found in any storage');
  return null;
};

// Updated saveGuestSlidesToAllStorages to ensure consistent format
const saveGuestSlidesToAllStorages = (slides) => {
  if (!slides || !Array.isArray(slides) || slides.length === 0) return;
  
  // Ensure slides is a plain array
  const slidesArray = Array.isArray(slides) ? slides : 
                     (slides.data && Array.isArray(slides.data) ? slides.data : null);
                      
  if (!slidesArray) {
    console.error('Invalid slides format for storage:', slides);
    return;
  }
  
  console.log('Saving guest slides to all storage mechanisms, count:', slidesArray.length);
  
  // 1. Save via StorageService
  try {
    StorageService.setGuestSlides(slidesArray);
  } catch (e) {
    console.error('Error saving to StorageService:', e);
  }
  
  // 2. Direct localStorage save - save as plain array for consistency
  try {
    localStorage.setItem(GUEST_SLIDES_STORAGE_KEY, JSON.stringify(slidesArray));
  } catch (e) {
    console.error('Error saving to direct localStorage:', e);
  }
  
  // 3. SessionStorage - save as plain array for consistency
  try {
    sessionStorage.setItem(GUEST_SLIDES_SESSION_KEY, JSON.stringify(slidesArray));
  } catch (e) {
    console.error('Error saving to sessionStorage:', e);
  }
  
  // 4. Save to preserved location for logout resilience
  try {
    localStorage.setItem('preservedGuestSlides', JSON.stringify(slidesArray));
  } catch (e) {
    console.error('Error saving to preservedGuestSlides:', e);
  }
  
  // 5. IndexedDB via hybridCache - this needs the complete object format
  if (hybridCache) {
    try {
      hybridCache.store('apiCache', 'guest_slides', slidesArray, 'high')
        .catch(e => console.error('Error saving to hybridCache:', e));
    } catch (e) {
      console.error('Error calling hybridCache.store:', e);
    }
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
  
      try {
        setIsLoading(true);

        // For non-logged in users, just load guest slides
        if (!user?._id) {
          await loadGuestSlides();
          return;
        }
     
        // For logged in users, process in this order:
        // 1. Check for cached orders
        const cachedOrders = StorageService.getUserOrders(user._id);
        const filteredOrders = cachedOrders ? filterWebsiteOrders(cachedOrders) : [];
        setOrders(filteredOrders);
        
        // 2. Load welcome message with await to ensure it completes
        const welcomeData = await loadUserWelcome();
        
        // 3. Now that both operations are complete, we can mark data as initialized
        setDataInitialized(true);

        // 4. Background refresh orders if online
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
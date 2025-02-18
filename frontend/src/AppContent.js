import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useDatabase } from './context/DatabaseContext';
import { setUserDetails, updateWalletBalance, logout } from './store/userSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import SummaryApi from './common';
import Context from './context';
import CookieManager from './utils/cookieManager';
import StorageService from './utils/storageService';

// Add this PWA detection helper
const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
};

const AppContent = () => {
  const dispatch = useDispatch();
  const { clearCache } = useDatabase();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  const handleLogout = async () => {
    try {
      // First preserve guest slides if needed
      const guestSlides = StorageService.getGuestSlides();
      if (guestSlides) {
        sessionStorage.setItem('sessionGuestSlides', JSON.stringify(guestSlides));
        localStorage.setItem('preservedGuestSlides', JSON.stringify(guestSlides));
      }

      const response = await fetch(SummaryApi.logout.url, {
        method: SummaryApi.logout.method,
        credentials: 'include'
      });
      
      if (response.ok) {
        // Set explicit logout flags
        localStorage.removeItem('auth_state');
        localStorage.setItem('logout_timestamp', Date.now().toString());
        sessionStorage.setItem('logout_timestamp', Date.now().toString());
        
        // Clear cookies with improved method
        CookieManager.clearAll();
        
        // Clear user data but preserve guest data
        StorageService.clearUserData(); // Use clearUserData instead of clearAll
        
        // Clear database cache
        await clearCache();
        
        // Dispatch logout action
        dispatch(logout());
        
        // Reset local states
        setCartProductCount(0);
        setWalletBalance(0);
        
        // Additional for PWA - force cookie expiration
        if (isPWA()) {
          document.cookie.split(";").forEach(function(c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, 
              "=;expires=" + new Date().toUTCString() + ";path=/");
          });
        }
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const fetchWalletBalance = async () => {
    try {
      // Pehle localStorage se balance get karo
      const cachedBalance = StorageService.getWalletBalance();
      setWalletBalance(cachedBalance);
      dispatch(updateWalletBalance(cachedBalance));

      const response = await fetch(SummaryApi.wallet.balance.url, {
        method: SummaryApi.wallet.balance.method,
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        const balance = data.data.balance;
        setWalletBalance(balance); // Update local state
        dispatch(updateWalletBalance(balance)); // Update Redux state
        StorageService.setWalletBalance(balance); 
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      // Pehle localStorage se details get karo
      const cachedDetails = StorageService.getUserDetails();
      if (cachedDetails) {
        dispatch(setUserDetails(cachedDetails));
        setWalletBalance(cachedDetails.walletBalance || 0);
        dispatch(updateWalletBalance(cachedDetails.walletBalance || 0));
      }

      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include'
      });
      const dataApi = await dataResponse.json();
      
      if (dataApi.success && dataApi.data) {
        // Set auth state flag in localStorage
        localStorage.setItem('auth_state', 'logged_in');
        
        CookieManager.setUserDetails({
          _id: dataApi.data._id,
          name: dataApi.data.name,
          email: dataApi.data.email,
          role: dataApi.data.role
        });
        StorageService.setUserDetails(dataApi.data);
        dispatch(setUserDetails(dataApi.data));
        
        // Update wallet balance if it exists in user data
        if (dataApi.data.walletBalance !== undefined) {
          setWalletBalance(dataApi.data.walletBalance); // Update local state
          dispatch(updateWalletBalance(dataApi.data.walletBalance)); // Update Redux state
          StorageService.setWalletBalance(dataApi.data.walletBalance);
        }
        
        // Fetch latest wallet balance
        await fetchWalletBalance();
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
       // Pehle localStorage se cart count get karo
       const cachedCount = StorageService.getCartCount();
       setCartProductCount(cachedCount);

      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include'
      });
     const dataApi = await dataResponse.json();
      const newCount = dataApi?.data?.count || 0;
      setCartProductCount(newCount);
      StorageService.setCartCount(newCount); // Update localStorage
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Add PWA logout state check
  const checkPWALogoutState = () => {
    if (isPWA()) {
      const logoutTimestamp = localStorage.getItem('logout_timestamp');
      const authState = localStorage.getItem('auth_state');
      const userCookie = CookieManager.get('user-details');
      
      // If we have a logout timestamp but still have auth cookie or auth state
      if (logoutTimestamp && (userCookie || authState)) {
        console.log('Detected PWA refresh after logout, forcing logout state');
        // Force logout
        CookieManager.clearAll();
        dispatch(logout());
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const checkLogoutState = () => {
      // Check for logout in progress or recent logout
      const logoutInProgress = localStorage.getItem('logout_in_progress') === 'true' || 
                             sessionStorage.getItem('logout_in_progress') === 'true' ||
                             document.cookie.includes('logout_in_progress=true');
                             
      const logoutTimestamp = localStorage.getItem('logout_timestamp');
      const recentLogout = logoutTimestamp && 
                          (Date.now() - parseInt(logoutTimestamp) < 30000); // Within 30 seconds
      
      // If logout was in progress, prevent auto-login
      if (logoutInProgress || recentLogout) {
        console.log('Detected recent logout, preventing auto-login');
        
        // Clear any remaining auth state
        CookieManager.clearAll();
        dispatch(logout());
        
        // Clear the in-progress flag after using it
        localStorage.removeItem('logout_in_progress');
        sessionStorage.removeItem('logout_in_progress');
        document.cookie = 'logout_in_progress=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        
        return true; // Signal that we forced logout
      }
      
      return false; // No forced logout needed
    };
    
    // Check logout state before attempting to initialize user data
    const wasLoggedOut = checkLogoutState();
    
    if (!wasLoggedOut) {
      // Only fetch user data if we didn't just force a logout
      const initializeData = async () => {
        await fetchUserDetails();
        await fetchUserAddToCart();
      };
      
      initializeData();
    }
  }, []);


  return (
     <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
        walletBalance,
        setWalletBalance, // Add this to allow components to update wallet balance
        fetchWalletBalance,
        handleLogout
      }}>
        <ToastContainer
         position='top-center' 
         autoClose={1000}
         />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-24 md:pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
  )
}

export default AppContent
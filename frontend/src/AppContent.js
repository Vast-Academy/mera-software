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

const AppContent = () => {
    const dispatch = useDispatch();
  const { clearCache } = useDatabase();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout.url, {
        method: SummaryApi.logout.method,
        credentials: 'include'
      });
      
      if (response.ok) {
        CookieManager.clearAll();
        StorageService.clearAll();
        // Clear database cache
        await clearCache();

        // यह नई line add करें
      document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
        // Dispatch logout action
        dispatch(logout());
        // Reset local states
        setCartProductCount(0);
        setWalletBalance(0);
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

  useEffect(() => {
    // Fetch initial data
    const initializeData = async () => {
      try {
        const userResponse = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: 'include'
        });
        
        // If response is unauthorized (401) or there's any error,
        // still dispatch logout to ensure initialized=true
        if (!userResponse.ok) {
          dispatch(logout());  // This sets initialized=true with null user
          // Still try to fetch cart count for non-logged in users if needed
          await fetchUserAddToCart();
          return;
        }
        
        // Continue with normal flow for logged-in users
        await fetchUserDetails();
        await fetchUserAddToCart();
        
      } catch (error) {
        console.error("Error during initialization:", error);
        // Even on error, ensure the state is initialized
        dispatch(logout());
      }
    };
    
    initializeData();
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
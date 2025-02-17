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
        // Clear database cache
        await clearCache();
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
      const response = await fetch(SummaryApi.wallet.balance.url, {
        method: SummaryApi.wallet.balance.method,
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        const balance = data.data.balance;
        setWalletBalance(balance); // Update local state
        dispatch(updateWalletBalance(balance)); // Update Redux state
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
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
        dispatch(setUserDetails(dataApi.data));
        
        // Update wallet balance if it exists in user data
        if (dataApi.data.walletBalance !== undefined) {
          setWalletBalance(dataApi.data.walletBalance); // Update local state
          dispatch(updateWalletBalance(dataApi.data.walletBalance)); // Update Redux state
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
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include'
      });
      const dataApi = await dataResponse.json();
      setCartProductCount(dataApi?.data?.count);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    // Fetch initial data
    const initializeData = async () => {
      await fetchUserDetails(); // This will also fetch wallet balance
      await fetchUserAddToCart();
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

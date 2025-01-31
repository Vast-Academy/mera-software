import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails, updateWalletBalance } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

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
    <>
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
        walletBalance,
        setWalletBalance, // Add this to allow components to update wallet balance
        fetchWalletBalance
      }}>
        <ToastContainer position='top-center' />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-3 md:pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
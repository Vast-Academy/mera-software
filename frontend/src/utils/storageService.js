// utils/storageService.js

const STORAGE_KEYS = {
    USER_DETAILS: 'userDetails',
    WALLET_BALANCE: 'walletBalance',
    CART_COUNT: 'cartCount'
  };
  
  const StorageService = {
    // User details ke liye
    setUserDetails: (details) => {
      try {
        localStorage.setItem(STORAGE_KEYS.USER_DETAILS, JSON.stringify(details));
      } catch (error) {
        console.error('Error storing user details:', error);
      }
    },
  
    getUserDetails: () => {
      try {
        const details = localStorage.getItem(STORAGE_KEYS.USER_DETAILS);
        return details ? JSON.parse(details) : null;
      } catch (error) {
        console.error('Error getting user details:', error);
        return null;
      }
    },
  
    // Wallet balance ke liye
    setWalletBalance: (balance) => {
      try {
        localStorage.setItem(STORAGE_KEYS.WALLET_BALANCE, balance.toString());
      } catch (error) {
        console.error('Error storing wallet balance:', error);
      }
    },
  
    getWalletBalance: () => {
      try {
        const balance = localStorage.getItem(STORAGE_KEYS.WALLET_BALANCE);
        return balance ? parseFloat(balance) : 0;
      } catch (error) {
        console.error('Error getting wallet balance:', error);
        return 0;
      }
    },
  
    // Cart count ke liye
    setCartCount: (count) => {
      try {
        localStorage.setItem(STORAGE_KEYS.CART_COUNT, count.toString());
      } catch (error) {
        console.error('Error storing cart count:', error);
      }
    },
  
    getCartCount: () => {
      try {
        const count = localStorage.getItem(STORAGE_KEYS.CART_COUNT);
        return count ? parseInt(count) : 0;
      } catch (error) {
        console.error('Error getting cart count:', error);
        return 0;
      }
    },
  
    // Logout ke time clear karne ke liye
    clearAll: () => {
      try {
        Object.values(STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(key);
        });
      } catch (error) {
        console.error('Error clearing storage:', error);
      }
    }
  };
  
  export default StorageService;
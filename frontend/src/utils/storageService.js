// utils/storageService.js

const STORAGE_KEYS = {
    USER_DETAILS: 'userDetails',
    WALLET_BALANCE: 'walletBalance',
    CART_COUNT: 'cartCount',
    GUEST_SLIDES: 'guestSlides',
    USER_ORDERS: 'userOrders',
    USER_WELCOME: 'userWelcome'
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
    clearUserData: () => {
      try {
        // Clear only user-specific data
        localStorage.removeItem(STORAGE_KEYS.USER_DETAILS);
        localStorage.removeItem(STORAGE_KEYS.WALLET_BALANCE);
        localStorage.removeItem(STORAGE_KEYS.CART_COUNT);
        
        // Clear all user orders by pattern matching
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith(`${STORAGE_KEYS.USER_ORDERS}_`)) {
            localStorage.removeItem(key);
          }
        });
        
        // IMPORTANT: Do NOT clear guest slides
      } catch (error) {
        console.error('Error clearing user data:', error);
      }
    },
  
    // Logout ke time clear karne ke liye
    clearAll: () => {
      try {
        // First save guest slides
        const guestSlides = StorageService.getGuestSlides();
        const savedSlides = guestSlides ? {
          data: guestSlides,
          timestamp: new Date().toISOString()
        } : null;
    
        // Clear all localStorage items except theme/language
        const keysToKeep = ['theme', 'language'];
        Object.values(STORAGE_KEYS).forEach(key => {
          if (!keysToKeep.includes(key) && key !== STORAGE_KEYS.GUEST_SLIDES) {
            localStorage.removeItem(key);
          }
        });
    
        // Restore guest slides if they existed
        if (savedSlides) {
          localStorage.setItem(STORAGE_KEYS.GUEST_SLIDES, JSON.stringify(savedSlides));
          // Also keep in sessionStorage as backup
          sessionStorage.setItem(STORAGE_KEYS.GUEST_SLIDES, JSON.stringify(savedSlides));
        }
      } catch (error) {
        console.error('Error in clearAll:', error);
      }
    },

    // Guest Slides ke liye
    setGuestSlides: (slides) => {
      try {
        // Add timestamp to track when slides were last updated
        const slidesWithTimestamp = {
          data: slides,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.GUEST_SLIDES, JSON.stringify(slidesWithTimestamp));
        
        // Also store in sessionStorage as backup
        sessionStorage.setItem(STORAGE_KEYS.GUEST_SLIDES, JSON.stringify(slidesWithTimestamp));
      } catch (error) {
        console.error('Error storing guest slides:', error);
      }
    },

    getGuestSlides: () => {
      try {
        // First try localStorage
        let slides = localStorage.getItem(STORAGE_KEYS.GUEST_SLIDES);
        
        // If not in localStorage, try sessionStorage as fallback
        if (!slides) {
          slides = sessionStorage.getItem(STORAGE_KEYS.GUEST_SLIDES);
          // If found in sessionStorage, restore to localStorage
          if (slides) {
            localStorage.setItem(STORAGE_KEYS.GUEST_SLIDES, slides);
          }
        }
        
        if (slides) {
          const parsed = JSON.parse(slides);
          return parsed.data || null;
        }
        return null;
      } catch (error) {
        console.error('Error getting guest slides:', error);
        return null;
      }
    },

  // User Orders ke liye
  setUserOrders: (userId, orders) => {
    try {
      localStorage.setItem(`${STORAGE_KEYS.USER_ORDERS}_${userId}`, JSON.stringify(orders));
    } catch (error) {
      console.error('Error storing user orders:', error);
    }
  },

  getUserOrders: (userId) => {
    try {
      const orders = localStorage.getItem(`${STORAGE_KEYS.USER_ORDERS}_${userId}`);
      return orders ? JSON.parse(orders) : null;
    } catch (error) {
      console.error('Error getting user orders:', error);
      return null;
    }
  },

  // User Welcome ke liye
  setUserWelcome: (welcome) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_WELCOME, JSON.stringify(welcome));
    } catch (error) {
      console.error('Error storing user welcome:', error);
    }
  },

  getUserWelcome: () => {
    try {
      const welcome = localStorage.getItem(STORAGE_KEYS.USER_WELCOME);
      return welcome ? JSON.parse(welcome) : null;
    } catch (error) {
      console.error('Error getting user welcome:', error);
      return null;
    }
  }
};
  
  export default StorageService;
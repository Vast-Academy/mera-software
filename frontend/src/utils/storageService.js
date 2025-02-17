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
          // Do NOT clear guest slides
        } catch (error) {
          console.error('Error clearing user data:', error);
        }
      },
  
    // Logout ke time clear karne ke liye
    clearAll: () => {
      try {
        const guestSlides = StorageService.getGuestSlides();

        Object.values(STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(key);
        });
        // Restore guest slides if they existed
      if (guestSlides) {
        StorageService.setGuestSlides(guestSlides);
      }
      } catch (error) {
        console.error('Error in clearAll:', error);
      }
    },

    // Guest Slides ke liye
  setGuestSlides: (slides) => {
    try {
      localStorage.setItem(STORAGE_KEYS.GUEST_SLIDES, JSON.stringify(slides));
    } catch (error) {
      console.error('Error storing guest slides:', error);
    }
  },

  getGuestSlides: () => {
    try {
      const slides = localStorage.getItem(STORAGE_KEYS.GUEST_SLIDES);
      return slides ? JSON.parse(slides) : null;
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
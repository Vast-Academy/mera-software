// src/utils/cookieManager.js
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

// Base configuration
const DEFAULT_CONFIG = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',  // Better for PWA compatibility
};

// PWA detection helper
const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
};

class CookieManager {
  // Set user details
  static setUserDetails(userDetails) {
    if (!userDetails) return;
    
    const minimalUserData = {
      _id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      role: userDetails.role,
    };
    
    // More aggressive cookie setting for PWA
    if (isPWA()) {
      // Set cookie with shorter expiration for PWA
      document.cookie = `user-details=${JSON.stringify(minimalUserData)}; path=/; max-age=${3 * 24 * 60 * 60}`;
    } else {
      cookies.set('user-details', minimalUserData, {
        ...DEFAULT_CONFIG,
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days for regular browser
      });
    }
    
    // Set auth state marker
    localStorage.setItem('auth_state', 'logged_in');
    sessionStorage.setItem('auth_state', 'logged_in');
  }
  
  // Cart Items - temporary storage
  static setCartItems(cartItems) {
    cookies.set('cart-items', cartItems, {
      ...DEFAULT_CONFIG,
      maxAge: 48 * 60 * 60 * 1000  // 48 hours
    });
  }
  
  // Get any cookie
  static get(name) {
    return cookies.get(name);
  }
  
  // Remove specific cookie with PWA-friendly options
  static remove(name) {
    // Standard removal methods
    cookies.remove(name, { path: '/' });
    cookies.remove(name, { path: '/', sameSite: 'lax' });
    cookies.remove(name, { path: '/', secure: true, sameSite: 'none' });
    cookies.remove(name, { path: '/', secure: true });
    
    // Force expiration by setting a past date
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    
    // Try with domain variations
    const domain = window.location.hostname;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain};`;
    if (domain !== 'localhost') {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${domain};`;
    }
  }
  
  // Clear all cookies
  static clearAll() {
    // Get all cookie names
    const allCookies = document.cookie.split(';');
    const cookieNames = allCookies.map(cookie => cookie.split('=')[0].trim());
    
    // Aggressively clear all cookies
    cookieNames.forEach(name => {
      this.remove(name);
    });
    
    // Clear auth state markers
    localStorage.removeItem('auth_state');
    sessionStorage.removeItem('auth_state');
    
    // Set logout timestamp for detection
    const timestamp = Date.now().toString();
    localStorage.setItem('logout_timestamp', timestamp);
    sessionStorage.setItem('logout_timestamp', timestamp);
    document.cookie = `logout_timestamp=${timestamp}; path=/; max-age=60;`;
  }
  
  // Check if user should be logged out (for PWA refresh detection)
  static checkPWALogoutState() {
    if (isPWA()) {
      const logoutTimestamp = localStorage.getItem('logout_timestamp');
      const recentLogout = logoutTimestamp && 
                          (Date.now() - parseInt(logoutTimestamp) < 60000); // 1 minute
      
      const userCookie = this.get('user-details');
      
      // Force logout if recent timestamp exists but we still have auth cookie
      if ((recentLogout && userCookie) || 
          (localStorage.getItem('logout_in_progress') === 'true')) {
        this.clearAll();
        return true;
      }
    }
    return false;
  }
}

export default CookieManager;
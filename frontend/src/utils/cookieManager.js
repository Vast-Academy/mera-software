// src/utils/cookieManager.js
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

// API के अनुसार base configuration
const DEFAULT_CONFIG = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',  // Only in production
  sameSite: 'lax',  // Changed from 'none' for better PWA compatibility
};

// Mobile PWA detection
const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
};

class CookieManager {
  // User Details - कम समय के लिए
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
    // Set cookie with HTTP only for better security in PWA
    document.cookie = `user-details=${JSON.stringify(minimalUserData)}; path=/; max-age=${7 * 24 * 60 * 60}`;
  } else {
    cookies.set('user-details', minimalUserData, {
      ...DEFAULT_CONFIG,
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    });
  }
   
  localStorage.setItem('auth_state', 'logged_in');
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
    // Normal removal
    cookies.remove(name, { path: '/' });
    
    // Additional options for different environments
    cookies.remove(name, { path: '/', sameSite: 'lax' });
    cookies.remove(name, { path: '/', secure: true, sameSite: 'none' });
    cookies.remove(name, { path: '/', secure: true });
    
    // For PWA context
    if (isPWA()) {
      // Force expiration by setting a past date
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    }
  }
  
  // Clear all cookies
  static clearAll() {
    // Get all cookie names
    const allCookies = document.cookie.split(';');
    const cookieNames = allCookies.map(cookie => cookie.split('=')[0].trim());
    
    // Aggressively clear all cookies
    cookieNames.forEach(name => {
      // Standard removal
      cookies.remove(name, { path: '/' });
      
      // Multiple approaches for stubborn cookies
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname};`;
    });
    
    // Clear auth state
    localStorage.removeItem('auth_state');
    
    // Set logout timestamp for detection
    localStorage.setItem('logout_timestamp', Date.now().toString());
    sessionStorage.setItem('logout_timestamp', Date.now().toString());
  }
  
  // Check if user should be logged out (for PWA refresh detection)
  static checkPWALogoutState() {
    const authState = localStorage.getItem('auth_state');
    const logoutTimestamp = localStorage.getItem('logout_timestamp');
    const userCookie = this.get('user-details');
    
    // If we have a logout timestamp but still have auth cookie in PWA
    if (logoutTimestamp && userCookie && isPWA()) {
      // Force cookie removal again
      this.clearAll();
      return true;
    }
    
    return false;
  }
}

export default CookieManager;
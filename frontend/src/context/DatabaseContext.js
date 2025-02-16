import React, { createContext, useContext, useEffect, useState } from 'react';
import { openDB } from 'idb';

const DatabaseContext = createContext();

const DB_NAME = 'ecommerceDB';
const DB_VERSION = 1;
const CACHE_DURATION =  24 * 60 * 60 * 1000; // 24 hours

// कैश प्राइओरिटी लेवल्स
const PRIORITY_LEVELS = {
  HIGH: 'high',      // जैसे कार्ट डेटा
  MEDIUM: 'medium',  // जैसे प्रोडक्ट डिटेल्स
  LOW: 'low'        // जैसे बैनर्स
};

export function DatabaseProvider({ children }) {
  const [db, setDb] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  // ऑनलाइन/ऑफलाइन स्टेटस ट्रैक करें
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // डेटाबेस इनिशियलाइज़ेशन
  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB(DB_NAME, DB_VERSION, {
          upgrade(db, oldVersion, newVersion) {
            // Database Migration लॉजिक
            if (oldVersion < 1) {
              // बेसिक स्टोर्स
              db.createObjectStore('products', { keyPath: 'id' });
              db.createObjectStore('categories', { keyPath: 'id' });
              db.createObjectStore('apiCache', { keyPath: 'key' });
              db.createObjectStore('userData', { keyPath: 'id' });
              
              // ऑफलाइन सपोर्ट के लिए स्टोर्स
              db.createObjectStore('offlineCart', { keyPath: 'id' });
              db.createObjectStore('pendingRequests', { keyPath: 'id', autoIncrement: true });
            }
            
            if (oldVersion < 2) {
              // भविष्य के अपडेट्स के लिए
              // नए स्टोर्स या इंडेक्स एड करें
            }
          },
        });
        
        setDb(database);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initDB();
  }, []);

  // एडवांस्ड कैशिंग फंक्शन्स
  const advancedCache = {
    // कैश वैलिडिटी चेक
    isValid: (timestamp, duration = CACHE_DURATION) => {
      return timestamp && (Date.now() - new Date(timestamp).getTime() < duration);
    },

    // प्राइओरिटी बेस्ड स्टोरेज
    store: async (storeName, key, data, priority = PRIORITY_LEVELS.MEDIUM) => {
      if (!db) return null;
      
      try {
        // Ensure data has a proper structure
        const storeData = {
          id: key, // Add id field which is required as keyPath
          key,
          data,
          priority,
          timestamp: new Date().toISOString()
        };
        
        const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
        await store.put(storeData);
      } catch (error) {
        console.error('Store error:', error);
        return null;
      }
    },

    // स्मार्ट फेचिंग
    get: async (storeName, key) => {
      if (!db) return null;
      
      try {
        const data = await db.get(storeName, key);
        return data && advancedCache.isValid(data.timestamp) ? data : null;
      } catch (error) {
        console.error('Cache read error:', error);
        return null;
      }
    }
  };

  const clearCache = async () => {
    if (!db) return;
    
    try {
      // Clear all object stores
      const stores = ['products', 'categories', 'apiCache', 'userData'];
      await Promise.all(stores.map(store => 
        db.clear(store).catch(err => 
          console.warn(`Error clearing ${store}:`, err)
        )
      ));
      
      return true;
    } catch (error) {
      console.error('Error in clearCache:', error);
      return false;
    }
  };

  // ऑफलाइन सपोर्ट फंक्शन्स
  const offlineSupport = {
    // ऑफलाइन एक्शन्स को स्टोर करें
    queueAction: async (action) => {
      if (!db) return;
      
      await db.add('pendingRequests', {
        action,
        timestamp: new Date().toISOString()
      });
    },

    // जब ऑनलाइन हों तो पेंडिंग एक्शन्स को प्रोसेस करें
    processPendingActions: async () => {
      if (!db || !isOnline) return;
      
      const pendingActions = await db.getAll('pendingRequests');
      
      for (const action of pendingActions) {
        try {
          // एक्शन को प्रोसेस करें
          await processOfflineAction(action);
          // सफल एक्शन को डिलीट करें
          await db.delete('pendingRequests', action.id);
        } catch (error) {
          console.error('Error processing offline action:', error);
        }
      }
    }
  };

  // जब ऑनलाइन हों तो पेंडिंग एक्शन्स को प्रोसेस करें
  useEffect(() => {
    if (isOnline && isInitialized) {
      offlineSupport.processPendingActions();
    }
  }, [isOnline, isInitialized]);

  const value = {
    db,
    isInitialized,
    isOnline,
    advancedCache,
    offlineSupport,
    clearCache  // Add this
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}

// ऑफलाइन एक्शन को प्रोसेस करने का फंक्शन
async function processOfflineAction(action) {
  // API कॉल्स को प्रोसेस करें
  switch (action.type) {
    case 'ADD_TO_CART':
      // कार्ट API कॉल
      break;
    case 'UPDATE_CART':
      // अपडेट API कॉल
      break;
    // और केसेज...
    default:
      console.warn('Unknown action type:', action.type);
  }
}
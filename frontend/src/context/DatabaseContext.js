import React, { createContext, useContext, useEffect, useState } from 'react';

const DatabaseContext = createContext();

const DB_NAME = 'myWebsiteDB';
const DB_VERSION = 2;

export const DatabaseProvider = ({ children }) => {
  const [dbInstance, setDbInstance] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  useEffect(() => {
    const initDB = () => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.error("Database error:", event.target.error);
        // Set initialized even on error so the app can continue
        setIsInitialized(true);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create stores only if they don't exist
        if (!db.objectStoreNames.contains('apiCache')) {
          db.createObjectStore('apiCache', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('categories')) {
          db.createObjectStore('categories', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('products')) {
          db.createObjectStore('products', { keyPath: 'id' });
        }
        
        console.log('Database upgrade completed');
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        setDbInstance(db);
        setIsInitialized(true);
        console.log('Database initialized successfully');
      };
    };

    initDB();

    return () => {
      if (dbInstance) {
        dbInstance.close();
      }
    };
  }, []);

  const clearCache = async () => {
    if (!dbInstance || !isInitialized) return;
    
    try {
      const transaction = dbInstance.transaction(['apiCache'], 'readwrite');
      const store = transaction.objectStore('apiCache');
      
      // Get all keys
      const keys = await new Promise((resolve, reject) => {
        const request = store.getAllKeys();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      
      // Before clearing cache, save guest slides
      let guestSlidesData = null;
      const guestSlidesRequest = store.get('guest_slides');
      await new Promise((resolve) => {
        guestSlidesRequest.onsuccess = () => {
          guestSlidesData = guestSlidesRequest.result;
          resolve();
        };
        guestSlidesRequest.onerror = () => resolve();
      });
      
      // Clear all cache
      for (const key of keys) {
        await store.delete(key);
      }
      
      // Restore guest slides if they existed
      if (guestSlidesData) {
        await store.put(guestSlidesData);
      }
      
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  };

  const isCacheValid = (timestamp) => {
    if (!timestamp) return false;
    const now = new Date().getTime();
    return (now - new Date(timestamp).getTime()) < CACHE_DURATION;
  };

  const db = {
    get: (storeName, key) => {
      return new Promise((resolve, reject) => {
        if (!dbInstance) {
          resolve(null); // Return null instead of rejecting
          return;
        }

        try {
          const transaction = dbInstance.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);
          const request = store.get(key);

          request.onerror = () => resolve(null); // Return null on error
          request.onsuccess = () => resolve(request.result);
        } catch (error) {
          console.error('Error in db.get:', error);
          resolve(null);
        }
      });
    },

    set: (storeName, data) => {
      return new Promise((resolve, reject) => {
        if (!dbInstance) {
          resolve(false);
          return;
        }

        try {
          const transaction = dbInstance.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.put(data);

          request.onerror = () => resolve(false);
          request.onsuccess = () => resolve(true);
        } catch (error) {
          console.error('Error in db.set:', error);
          resolve(false);
        }
      });
    }
  };

  return (
    <DatabaseContext.Provider value={{ 
      db, 
      isCacheValid,
      isInitialized,
      clearCache // Export clearCache function
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
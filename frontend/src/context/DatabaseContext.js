import React, { createContext, useContext, useEffect, useState } from 'react';

const DatabaseContext = createContext();

const DB_NAME = 'myWebsiteDB';
const DB_VERSION = 2; // Increased version number to trigger upgrade

export const DatabaseProvider = ({ children }) => {
  const [dbInstance, setDbInstance] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  useEffect(() => {
    const initDB = () => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.error("Database error:", event.target.error);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Delete existing stores if they exist
        if (db.objectStoreNames.contains('apiCache')) {
          db.deleteObjectStore('apiCache');
        }
        if (db.objectStoreNames.contains('categories')) {
          db.deleteObjectStore('categories');
        }
        if (db.objectStoreNames.contains('products')) {
          db.deleteObjectStore('products');
        }
        
        // Create all stores fresh
        db.createObjectStore('apiCache', { keyPath: 'key' });
        db.createObjectStore('categories', { keyPath: 'id' });
        db.createObjectStore('products', { keyPath: 'id' });
        
        console.log('All stores created successfully');
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        setDbInstance(db);
        setIsInitialized(true);
        console.log('Database initialized successfully');
      };
    };

    initDB();

    // Cleanup function
    return () => {
      if (dbInstance) {
        dbInstance.close();
      }
    };
  }, []);

  const isCacheValid = (timestamp) => {
    if (!timestamp) return false;
    const now = new Date().getTime();
    return (now - new Date(timestamp).getTime()) < CACHE_DURATION;
  };

  const db = {
    get: (storeName, key) => {
      return new Promise((resolve, reject) => {
        if (!dbInstance || !isInitialized) {
          reject(new Error('Database not initialized'));
          return;
        }

        const transaction = dbInstance.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    },

    set: (storeName, data) => {
      return new Promise((resolve, reject) => {
        if (!dbInstance || !isInitialized) {
          reject(new Error('Database not initialized'));
          return;
        }

        const transaction = dbInstance.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    }
  };

  const fetchAndCache = async (url, options = {}) => {
    try {
      if (!dbInstance || !isInitialized) {
        // If DB isn't initialized, just fetch without caching
        const response = await fetch(url, options);
        return await response.json();
      }

      // Rest of fetchAndCache implementation...
      const response = await fetch(url, options);
      const data = await response.json();

      // Update cache
      try {
        await db.set('apiCache', {
          key: url,
          data,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.warn('Failed to cache data:', e);
      }

      return data;
    } catch (error) {
      console.error('Error in fetchAndCache:', error);
      throw error;
    }
  };

  return (
    <DatabaseContext.Provider value={{ 
      db, 
      fetchAndCache, 
      isCacheValid,
      isInitialized 
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
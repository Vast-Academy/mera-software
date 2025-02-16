import React, { createContext, useContext, useEffect, useState } from 'react';
import { openDB } from 'idb';

const DatabaseContext = createContext();

const DB_NAME = 'ecommerceDB';
const DB_VERSION = 2; // Version बढ़ा दी है
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const PRIORITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

const LS_PREFIX = 'ecom_';

export function DatabaseProvider({ children }) {
  const [db, setDb] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

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

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB(DB_NAME, DB_VERSION, {
          upgrade(db, oldVersion, newVersion) {
            // Delete existing stores if they exist
            if (oldVersion < 2) {
              const stores = ['products', 'categories', 'apiCache', 'userData'];
              stores.forEach(store => {
                if (db.objectStoreNames.contains(store)) {
                  db.deleteObjectStore(store);
                }
              });

              // Create new stores with correct keyPath
              db.createObjectStore('products', { 
                keyPath: ['storeName', 'key'] 
              });
              db.createObjectStore('categories', { 
                keyPath: ['storeName', 'key'] 
              });
              db.createObjectStore('apiCache', { 
                keyPath: ['storeName', 'key'] 
              });
              db.createObjectStore('userData', { 
                keyPath: ['storeName', 'key'] 
              });
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

  const hybridCache = {
    isValid: (timestamp, duration = CACHE_DURATION) => {
      return timestamp && (Date.now() - new Date(timestamp).getTime() < duration);
    },

    store: async (storeName, key, data, priority = PRIORITY_LEVELS.MEDIUM) => {
      try {
        // Prepare cache data with composite key
        const cacheData = {
          storeName,
          key,
          data,
          priority,
          timestamp: new Date().toISOString()
        };

        // Store in IndexedDB
        if (db) {
          const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
          await store.put(cacheData);
        }

        // Store in LocalStorage
        const lsKey = `${LS_PREFIX}${storeName}_${key}`;
        localStorage.setItem(lsKey, JSON.stringify(cacheData));

        return true;
      } catch (error) {
        console.error('Store error:', error);
        return false;
      }
    },

    get: async (storeName, key) => {
      try {
        // Check LocalStorage first
        const lsKey = `${LS_PREFIX}${storeName}_${key}`;
        const lsData = localStorage.getItem(lsKey);
        
        if (lsData) {
          const parsedData = JSON.parse(lsData);
          if (hybridCache.isValid(parsedData.timestamp)) {
            return parsedData;
          }
        }

        // If not in LocalStorage or invalid, check IndexedDB
        if (db) {
          const idbData = await db.get(storeName, [storeName, key]);
          if (idbData && hybridCache.isValid(idbData.timestamp)) {
            localStorage.setItem(lsKey, JSON.stringify(idbData));
            return idbData;
          }
        }

        return null;
      } catch (error) {
        console.error('Cache read error:', error);
        return null;
      }
    },

    clear: async (storeName, key) => {
      try {
        // Clear LocalStorage
        const lsKey = `${LS_PREFIX}${storeName}_${key}`;
        localStorage.removeItem(lsKey);

        // Clear IndexedDB
        if (db) {
          await db.delete(storeName, [storeName, key]);
        }

        return true;
      } catch (error) {
        console.error('Clear cache error:', error);
        return false;
      }
    },

    clearAll: async () => {
      try {
        // Clear LocalStorage
        Object.keys(localStorage)
          .filter(key => key.startsWith(LS_PREFIX))
          .forEach(key => localStorage.removeItem(key));

        // Clear IndexedDB stores
        if (db) {
          const stores = ['products', 'categories', 'apiCache', 'userData'];
          await Promise.all(stores.map(store => 
            db.clear(store).catch(err => 
              console.warn(`Error clearing ${store}:`, err)
            )
          ));
        }

        return true;
      } catch (error) {
        console.error('Clear all cache error:', error);
        return false;
      }
    }
  };

  const value = {
    db,
    isInitialized,
    isOnline,
    hybridCache
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
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

  const preserveGuestSlidesOnStartup = () => {
    console.log('Preserving guest slides during initialization');
    try {
      // Check all possible sources
      const sources = [
        { key: 'guestSlides', storage: localStorage },
        { key: 'preservedGuestSlides', storage: localStorage },
        { key: 'sessionGuestSlides', storage: sessionStorage }
      ];
      
      // Find first valid data source
      let guestSlidesData = null;
      for (const source of sources) {
        try {
          const data = source.storage.getItem(source.key);
          if (data) {
            const parsed = JSON.parse(data);
            if (parsed && (Array.isArray(parsed) || parsed.data)) {
              guestSlidesData = parsed;
              console.log(`Found guest slides in ${source.key}`);
              break;
            }
          }
        } catch (e) {
          console.error(`Error reading from ${source.key}:`, e);
        }
      }
      
      // If we found data, ensure it's saved to all locations
      if (guestSlidesData) {
        const slides = Array.isArray(guestSlidesData) ? guestSlidesData : 
                       (guestSlidesData.data || null);
                       
        if (slides) {
          // Save to both standard locations
          localStorage.setItem('guestSlides', JSON.stringify(slides));
          sessionStorage.setItem('sessionGuestSlides', JSON.stringify(slides));
        }
      }
    } catch (error) {
      console.error('Error preserving guest slides on startup:', error);
    }
  };

  useEffect(() => {
    const initDB = async () => {
      try {

        // First, preserve guest slides before anything else
      preserveGuestSlidesOnStartup();

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
    // 1. First collect ALL guest slides data from multiple sources
    const guestSlidesData = {};
    
    // From localStorage standard key
    try {
      const slides = localStorage.getItem('guestSlides');
      if (slides) guestSlidesData.standard = JSON.parse(slides);
    } catch (e) {}
    
    // From localStorage backup key
    try {
      const preserved = localStorage.getItem('preservedGuestSlides');
      if (preserved) guestSlidesData.preserved = JSON.parse(preserved);
    } catch (e) {}
    
    // From sessionStorage
    try {
      const session = sessionStorage.getItem('sessionGuestSlides');
      if (session) guestSlidesData.session = JSON.parse(session);
    } catch (e) {}
    
    // From hybrid cache
    try {
      const cache = localStorage.getItem(`${LS_PREFIX}apiCache_guest_slides`);
      if (cache) guestSlidesData.cache = JSON.parse(cache);
    } catch (e) {}
    
    // Additional persistent data
    const persistentData = {
      theme: localStorage.getItem('theme'),
      language: localStorage.getItem('language')
    };

    // 2. Clear localStorage except for preserved guest slides key
    Object.keys(localStorage)
      .filter(key => key !== 'preservedGuestSlides' && key !== 'lastLogoutTimestamp')
      .forEach(key => {
        localStorage.removeItem(key);
      });

    // 3. Restore guest slides using best available data
    const finalSlides = guestSlidesData.standard || guestSlidesData.session || 
                       guestSlidesData.preserved || guestSlidesData.cache;
                       
    if (finalSlides) {
      const slides = Array.isArray(finalSlides) ? finalSlides : 
                    (finalSlides.data || null);
                    
      if (slides) {
        console.log('Restoring guest slides after cache clear');
        localStorage.setItem('guestSlides', JSON.stringify(slides));
        localStorage.setItem(`${LS_PREFIX}apiCache_guest_slides`, JSON.stringify({
          storeName: 'apiCache',
          key: 'guest_slides',
          data: slides,
          priority: 'high',
          timestamp: new Date().toISOString()
        }));
      }
    }
    
    // 4. Restore other persistent settings
    if (persistentData.theme) localStorage.setItem('theme', persistentData.theme);
    if (persistentData.language) localStorage.setItem('language', persistentData.language);

    // 5. Clear IndexedDB stores except guest slides
    if (db) {
      const stores = ['products', 'categories', 'apiCache', 'userData'];
      await Promise.all(stores.map(async store => {
        if (store === 'apiCache') {
          // For apiCache, only clear non-guest items
          const allItems = await db.getAll(store);
          const itemsToDelete = allItems.filter(item => 
            !item.key.includes('guest_slides')
          );
          await Promise.all(itemsToDelete.map(item => 
            db.delete(store, [item.storeName, item.key])
          ));
        } else {
          await db.clear(store);
        }
      }));
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
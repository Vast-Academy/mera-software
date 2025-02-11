import React, { createContext, useContext, useCallback } from 'react';
import { dbService } from '../services/DatabaseService';

const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }) => {
  const cacheTimeout = 60 * 60 * 1000; // 1 hour

  const isCacheValid = useCallback((lastUpdated) => {
    if (!lastUpdated) return false;
    return Date.now() - new Date(lastUpdated).getTime() < cacheTimeout;
  }, []);

  const fetchAndCache = useCallback(async (url, options = {}) => {
    try {
      // Generate cache key from URL and body
      const cacheKey = options.body ? 
        `${url}-${JSON.stringify(options.body)}` : 
        url;

      // Check cache first
      const cachedData = await dbService.get('pages', cacheKey);
      
      if (cachedData && isCacheValid(cachedData.lastUpdated)) {
        return cachedData.data;
      }

      // Fetch fresh data
      const response = await fetch(url, options);
      const data = await response.json();

      // Cache the response
      await dbService.set('pages', {
        path: cacheKey,
        data,
        lastUpdated: new Date().toISOString()
      });

      return data;
    } catch (error) {
      console.error('Error in fetchAndCache:', error);
      throw error;
    }
  }, [isCacheValid]);

  const value = {
    db: dbService,
    fetchAndCache
  };

  return (
    <DatabaseContext.Provider value={value}>
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
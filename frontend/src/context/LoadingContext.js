// LoadingContext.js
import React, { createContext, useContext, useState } from 'react';
import TriangleMazeLoader from '../components/TriangleMazeLoader';

// Create a context for managing loading state
const LoadingContext = createContext();

// Provider component that wraps your app and makes loading state available to all children
export const LoadingProvider = ({ children }) => {
  // State to track if we're navigating between pages
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <LoadingContext.Provider value={{ isNavigating, setIsNavigating }}>
      {/* Render all child components */}
      {children}
      
      {/* Overlay loader that appears above everything when navigating */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <TriangleMazeLoader />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export default LoadingContext;
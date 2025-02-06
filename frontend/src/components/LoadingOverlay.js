import React from 'react';
import TriangleMazeLoader from './TriangleMazeLoader';

const LoadingOverlay = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    // Fixed positioning ensures it stays on top of everything
    // pointer-events-none allows clicking through to background elements if needed
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Semi-transparent overlay that lets the background be slightly visible */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-[2px]" />
      
      {/* Loader container - centered on screen */}
      <div className="absolute inset-0 flex items-center justify-center">
        <TriangleMazeLoader />
      </div>
    </div>
  );
};

export default LoadingOverlay;
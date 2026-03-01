import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Loader = ({ 
  size = 'md', 
  fullScreen = false,
  text = 'Loading...',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className={`${sizes[size]} animate-spin text-blue-600 mx-auto mb-4`} />
          <p className="text-gray-600">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <FiLoader className={`${sizes[size]} animate-spin text-blue-600`} />
      {text && <span className="ml-3 text-gray-600">{text}</span>}
    </div>
  );
};

export default Loader;
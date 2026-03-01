import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <FiAlertCircle className="w-20 h-20 text-gray-300 mb-6" />
      <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-700 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <FiHome className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;

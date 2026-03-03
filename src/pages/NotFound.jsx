import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import MainLayout from '../layout/MainLayout';

const NotFound = () => (
  <MainLayout>
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  </MainLayout>
);

export default NotFound;

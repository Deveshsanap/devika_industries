import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      
      {/* Icon Animation */}
      <div className="bg-orange-100 p-6 rounded-full mb-6 animate-pulse">
        <AlertTriangle size={64} className="text-[#FF5722]" />
      </div>

      {/* Main Error Text */}
      <h1 className="text-6xl font-extrabold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase">Page Not Found</h2>
      
      {/* Industrial Flavour Text */}
      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        It looks like this part of the factory is closed. The page you are looking for might have been moved, deleted, or never existed.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <button className="flex items-center gap-2 bg-[#FF5722] text-white px-8 py-3 rounded font-bold uppercase hover:bg-orange-700 transition shadow-lg">
            <Home size={20} />
            Back to Home
          </button>
        </Link>
        
        <Link to="/products">
          <button className="flex items-center gap-2 bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded font-bold uppercase hover:bg-gray-100 transition shadow-sm">
            <Search size={20} />
            Browse Machinery
          </button>
        </Link>
      </div>

    </div>
  );
};

export default NotFound;
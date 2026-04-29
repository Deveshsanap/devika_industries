import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '/logo.jpeg';
// Exact categories from the Devika Industries original site
const productCategories = [
  "Food Processing Machine",
  "Commercial Kitchen Equipment",
  "Grain And Seed Processing Machine / Plant",
  "Industrial Food Processing Machine",
  "Organic Fertilizer Processing Machine",
  "Spares"
];

const Header = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          {/* Company Logo */}
          {/* Company Logo */}
          <Link to="/" className="inline-flex items-start">
            <img
              src={logo}
              alt="Devika Industries Logo"
              width={75}
              height={75}
              className=" object-contain mix-blend-multiply"
            />
            <span className="text-gray-900 font-bold text-sm mt-0 -ml-4 mt-2">®</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md font-medium">
              Home
            </Link>

            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md font-medium"
              >
                What do you need?
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-2" role="menu" aria-orientation="vertical">
                    {productCategories.map((category, index) => (
                      <Link
                        key={index}
                        to={`/products?category=${encodeURIComponent(category.toLowerCase())}`}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex justify-between items-center"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {category}
                        <span className="text-gray-400 text-xs">›</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/presence" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md font-medium">
              Our Presence
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md font-medium">
              Contact Us
            </Link>
          </nav>

          {/* Right side CTA & Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contact" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-medium transition-colors text-sm">
              Get A Free Quote
            </Link>
            <div className="flex items-center space-x-3 ml-4 border-l pl-4">
              <Link to="/cart" className="text-gray-500 hover:text-orange-500">
                <ShoppingCart className="h-5 w-5" />
              </Link>
              {/* User Account Icon with Green Dot */}
              {/* User Account Icon */}
              <Link
                to={user ? (user.role === 'admin' ? '/admin-dashboard' : '/profile') : '/login'}
                className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <User className="w-6 h-6" />
                {/* The Green Dot if logged in */}
                {user && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50">Home</Link>

            <div className="px-3 py-2">
              <div className="text-base font-medium text-gray-900 mb-2">What do you need?</div>
              <div className="pl-4 space-y-1 border-l-2 border-orange-200">
                {productCategories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/products?category=${encodeURIComponent(category.toLowerCase())}`}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/presence" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50">Our Presence</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50">About Us</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50">Contact Us</Link>

            <div className="flex flex-col space-y-3 px-3 py-4 border-t border-gray-200 mt-4">
              <Link to="/contact" className="text-center bg-gray-500 text-white px-4 py-2 rounded-full font-medium">
                Get A Free Quote
              </Link>
              <div className="flex justify-around pt-4">
                <Link to="/cart" className="text-gray-600 hover:text-orange-500 flex items-center">
                  <ShoppingCart className="h-6 w-6 mr-2" /> Cart
                </Link>
                <Link to="/login" className="text-gray-600 hover:text-orange-500 flex items-center">
                  <User className="h-6 w-6 mr-2" /> Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
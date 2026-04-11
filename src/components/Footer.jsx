import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../assets/logo.jpeg';
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Company Info */}
          <div>
            {/* Company Logo */}
            <div className="mb-6 bg-white p-2 inline-block rounded-lg">
              <img
                src={logo}
                alt="Devika Industries Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              India's premier B2B marketplace for high-quality industrial machinery, spare parts, and manufacturing equipment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-orange-500 transition-colors">Equipment Catalog</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Sales</Link></li>
              <li><Link to="/login" className="hover:text-orange-500 transition-colors">Dealer Portal</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Top Categories</h4>
            <ul className="space-y-3">
              <li><Link to="/products?category=food processing" className="hover:text-orange-500 transition-colors">Food Processing</Link></li>
              <li><Link to="/products?category=commercial kitchen equipment" className="hover:text-orange-500 transition-colors">Commercial Kitchen</Link></li>
              <li><Link to="/products?category=industrial food processing" className="hover:text-orange-500 transition-colors">Industrial Plants</Link></li>
              <li><Link to="/products?category=grain and seed processing" className="hover:text-orange-500 transition-colors">Grain & Seed Processing</Link></li>
              <li><Link to="/products?category=spares" className="hover:text-orange-500 transition-colors">OEM Spare Parts</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span>123 Industrial Estate, Phase 4<br />Pune, Maharashtra 411001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span>sales@devikaindustries.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Devika Industries. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
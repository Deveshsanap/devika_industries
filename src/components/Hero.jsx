import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Settings, Wrench } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      
      {/* Subtle Background Pattern (Optional) */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 font-bold text-sm mb-6 border border-orange-500/20">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
              India's Premier B2B Machinery Network
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Industrial Grade <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Machinery & Tools
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
              Equip your manufacturing plant with high-performance machinery, reliable spare parts, and verified dealer support. Request an official quote today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold flex justify-center items-center transition-colors text-lg shadow-lg shadow-orange-500/20"
              >
                Browse Catalog <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-bold flex justify-center items-center transition-colors border border-gray-700 text-lg"
              >
                Contact Sales
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-800">
              <div className="flex items-center text-gray-300">
                <ShieldCheck className="w-5 h-5 text-orange-500 mr-2" />
                <span className="text-sm font-medium">Verified Dealers</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Settings className="w-5 h-5 text-orange-500 mr-2" />
                <span className="text-sm font-medium">OEM Parts</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Wrench className="w-5 h-5 text-orange-500 mr-2" />
                <span className="text-sm font-medium">Service Support</span>
              </div>
            </div>
          </div>

          {/* Right Image/Graphic */}
          <div className="relative hidden lg:block">
            {/* Design accents behind the image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-3xl transform translate-x-4 translate-y-4"></div>
            
            {/* Main Image using a professional Unsplash placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Industrial Manufacturing Facility" 
              className="relative rounded-3xl shadow-2xl border border-gray-800 object-cover h-[500px] w-full"
            />
            
            {/* Floating Stats Card - Adds a very modern, premium feel */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Active Dealers</p>
                  <p className="text-2xl font-extrabold text-gray-900">500+</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
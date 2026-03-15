
import React from 'react';
import { MapPin, Clock, Award } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-black text-white text-[11px] py-2 border-b border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Side: Location & Time */}
        <div className="flex items-center space-x-6 mb-2 md:mb-0">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-white" />
            <span>Rajkot, Gujarat, India</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-white" />
            <span>Time: Monday - Friday 09am - 5pm</span>
          </div>
        </div>
        
        {/* Right Side: Certification */}
        <div className="flex items-center gap-2">
          <Award size={14} className="text-white" />
          <span className="font-medium">Certified (ISO 9001:2015)</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
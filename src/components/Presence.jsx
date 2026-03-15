import React from 'react';
import { Globe, Map, Truck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Presence = () => {
  // Mock list of countries
  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", 
    "UAE", "Saudi Arabia", "South Africa", "Kenya", 
    "Nepal", "Sri Lanka", "Bangladesh", "Germany"
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* 1. HERO BANNER */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        {/* Background Map Texture */}
        <div className="absolute inset-0 opacity-10" 
             style={{backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-[#FF5722] font-bold tracking-widest uppercase text-sm mb-2 block">Global Reach</span>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase mb-4">Exporting Worldwide</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From Rajkot to the World. We have successfully established our footprint in over 
            <span className="text-white font-bold"> 25+ Countries</span>.
          </p>
        </div>
      </div>

      {/* 2. INTERACTIVE MAP SECTION */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left: Content */}
          <div className="lg:w-1/3">
             <h2 className="text-3xl font-bold text-gray-800 mb-6 uppercase border-l-4 border-[#FF5722] pl-4">
               Where We Deliver
             </h2>
             <p className="text-gray-600 mb-8 leading-relaxed">
               Devika Industries Inc. is not just a local player. Our machinery meets international 
               quality standards (ISO 9001:2015), making us a preferred partner for food processing 
               plants globally.
             </p>
             
             <div className="grid grid-cols-2 gap-4">
               {countries.map((country, index) => (
                 <div key={index} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                   <div className="w-2 h-2 bg-[#FF5722] rounded-full"></div>
                   {country}
                 </div>
               ))}
             </div>
          </div>

          {/* Right: The Map Visualization */}
          <div className="lg:w-2/3 relative">
            {/* Map Image */}
            

[Image of World Map Silhouette]

            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png" 
              alt="World Map" 
              className="w-full h-auto opacity-20"
            />

            {/* Pulsing Dots (CSS Overlay) */}
            {/* North America */}
            <div className="absolute top-[30%] left-[20%]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5722]"></span>
            </div>
            
            {/* Europe */}
            <div className="absolute top-[28%] left-[52%]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5722]"></span>
            </div>

            {/* India (Home Base - Larger) */}
            <div className="absolute top-[45%] left-[68%]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FF5722] border-2 border-white"></span>
              <div className="absolute -top-8 -left-4 bg-black text-white text-[10px] px-2 py-1 rounded">HQ</div>
            </div>

             {/* Australia */}
             <div className="absolute top-[70%] left-[85%]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5722]"></span>
            </div>
             
             {/* Africa */}
             <div className="absolute top-[55%] left-[53%]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5722]"></span>
            </div>

          </div>
        </div>
      </div>

      {/* 3. DISTRIBUTOR CTA */}
      <div className="bg-[#FF5722] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Users size={48} className="mx-auto mb-4 text-white/80" />
          <h2 className="text-3xl font-bold uppercase mb-4">Become a Global Distributor</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We are looking for partners in South East Asia and Latin America. 
            Join our network and grow with Devika Industries.
          </p>
          <Link to="/contact">
            <button className="bg-black text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-gray-900 transition shadow-xl">
              Apply Now
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Presence;
import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-[650px] bg-[#1a1a1a] flex items-center justify-center text-center overflow-hidden">
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          // Replace with your factory image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Factory Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl px-4 flex flex-col items-center">
        
        {/* Floating Logo Icon (Optional, seen in Screenshot 119 center) */}
        <div className="mb-4">
            {/* If you want the icon to float above text like in screenshot */}
            {/* <img src="/path-to-icon.png" className="h-12 w-12" /> */}
        </div>

        <h3 className="text-[#FF5722] font-bold text-lg md:text-xl tracking-[0.2em] uppercase mb-2">
          Devika
        </h3>
        
        <h1 className="text-white text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-6">
          House of Machinery
        </h1>

        <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed mx-auto">
          Offering a Quality Assured Range of Food Processing Machinery, Commercial Kitchen Equipment, 
          HORECA industry, Agri Processing Machineries, Small Machines for Food Startups for Cafes, 
          Dhabas, Resorts, Villas etc.
        </p>

        {/* Note: Screenshot 119 doesn't clearly show buttons in the center, 
            but if you need them based on the "Know More" button in later shots: */}
        {/* <div className="mt-8 flex gap-4">
           <button className="bg-[#FF5722] text-white px-8 py-3 uppercase font-bold text-sm hover:bg-orange-700 transition">Explore Products</button>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
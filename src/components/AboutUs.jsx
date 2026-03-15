import React, { useState } from 'react';
import { Clock, ThumbsUp, Users, ChevronDown, ChevronUp } from 'lucide-react';

const AboutUs = () => {
  // State to track if the text is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="bg-white pb-20 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        
        {/* --- PART 1: FLOATING STATS CARDS --- */}
        <div className="relative z-30  grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 max-w-6xl mx-auto">
          
          {/* Card 1 */}
          <div className="bg-white p-8 shadow-2xl border-b-4 border-[#FF5722] rounded-sm relative group">
            <div className="absolute top-4 right-4 p-2 opacity-10 group-hover:opacity-20 transition duration-500">
               <Users size={60} />
            </div>
            <h3 className="text-4xl font-extrabold text-gray-800 mb-2">1350+</h3>
            <p className="text-lg font-bold text-gray-700 mb-3">Completed Projects</p>
            <p className="text-xs text-gray-500 leading-relaxed">We help international companies create and improve industry products.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 shadow-2xl border-b-4 border-[#FF5722] rounded-sm relative group">
            <div className="absolute top-4 right-4 p-2 opacity-10 group-hover:opacity-20 transition duration-500">
               <Clock size={60} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Best Offers</h3>
            <p className="text-lg font-bold text-gray-700 mb-3">Delivered on time</p>
            <p className="text-xs text-gray-500 leading-relaxed">10 Years Warranty included with all our industrial machinery.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 shadow-2xl border-b-4 border-[#FF5722] rounded-sm relative group">
             <div className="absolute top-4 right-4 p-2 opacity-10 group-hover:opacity-20 transition duration-500">
               <ThumbsUp size={60} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Best Builder</h3>
            <p className="text-lg font-bold text-gray-700 mb-3">100% fast production</p>
            <p className="text-xs text-gray-500 leading-relaxed">Time-sensitive planning for your manufacturing needs.</p>
          </div>
        </div>

        {/* --- PART 2: ABOUT CONTENT --- */}
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
          
          {/* Left Side: Text */}
          <div className="lg:w-1/2 z-10">
            <div className="mb-6">
              <span className="block text-[#FF5722] font-bold tracking-widest uppercase text-sm mb-2 pl-4 border-l-4 border-[#FF5722]">
                Welcome
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 uppercase">
                About Us
              </h2>
            </div>

            <p className="text-[#FF5722] font-medium mb-6 text-lg">
              Offering a quality assured range of Power Transmission Product, Agro Machinery, 
              Red Maker, Chapati Maker, Food Processing Machine, Auto Parts, etc.
            </p>

            <div className="text-gray-500 text-sm leading-relaxed mb-8 text-justify">
              <p className="mb-4">
                Leveraging on our sturdy infrastructural facility and latest technologies, we, 
                <span className="font-bold text-gray-800"> Devika Industries Inc.</span>, being a new self-motivated entrepreneur company from 
                Unikraft Peripherals, are a name to reckon with quality. Incepted in the year 2006, 
                we are engaged in design and development of a sophisticated range of agriculture machinery 
                that are used in various industrial segments across the globe.
              </p>

              {/* EXPANDABLE CONTENT */}
              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="mb-4">
                  Our manufacturing unit in Rajkot is equipped with state-of-the-art machinery and tools that enable us to manufacture products in bulk quantities within the stipulated time frame. We have a team of highly skilled and experienced professionals who work in close coordination with clients to understand their specific requirements.
                </p>
                <p>
                  Quality is our hallmark. Every machine that leaves our factory undergoes rigorous quality checks to ensure efficiency, durability, and low maintenance. We are proud to export over 45% of our products to international markets, building trust globally.
                </p>
              </div>
            </div>
            
            {/* TOGGLE BUTTON */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="group bg-[#FF5722] text-white px-10 py-4 uppercase font-bold text-sm hover:bg-orange-700 transition rounded-sm shadow-lg flex items-center gap-2"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Right Side: Image with Orange Triangle */}
          <div className="lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
             
             {/* Geometric Triangle SVG */}
             <div className="absolute top-1/2 right-0 transform translate-x-12 -translate-y-1/2 z-0 hidden lg:block">
                <svg width="350" height="350" viewBox="0 0 200 200" fill="none">
                    <path d="M200 100L0 200V0L200 100Z" fill="#FF5722" />
                </svg>
             </div>

            <div className="relative z-10 border-8 border-white shadow-2xl max-w-md w-full bg-gray-200 h-64 lg:h-80">
              <img 
                src="https://placehold.co/600x400/e2e8f0/1e293b?text=Devika+Factory+Image" 
                alt="Devika Factory Building" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
import React from 'react';
import { Target, Award, Users, Globe, CheckCircle, Factory, History, Quote, Settings, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* 1. HERO BANNER */}
      <div className="relative bg-[#1a1a1a] text-white py-32">
         {/* Industrial Background Overlay */}
         <div className="absolute inset-0 opacity-20" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block border-b-2 border-[#FF5722] mb-4 pb-1">
             <span className="text-[#FF5722] font-bold tracking-[0.2em] uppercase text-xs">Excellence Since 2006</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase mb-6 leading-tight">
            Engineering The Future <br/> Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-orange-400">Food Processing</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Devika Industries Inc. is a premier manufacturer and exporter of industrial-grade food processing machinery, 
            dedicated to empowering businesses with efficiency, durability, and innovation.
          </p>
        </div>
      </div>

      {/* 2. CORPORATE PROFILE & FOUNDER */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: The Company Story */}
          <div className="lg:w-1/2">
             <h2 className="text-3xl font-bold text-gray-800 mb-6 uppercase border-l-4 border-[#FF5722] pl-6">
               Our Corporate Story
             </h2>
             <div className="space-y-6 text-gray-600 text-justify leading-relaxed">
                <p>
                  Incepted in the year <strong>2006</strong>, Devika Industries Inc. began as a self-motivated entrepreneurship venture under Unikraft Peripherals. Over the last two decades, we have evolved into a global powerhouse in the machinery sector. Located in the industrial hub of <strong>Rajkot, Gujarat</strong>, we leverage the region's rich engineering ecosystem to produce world-class equipment.
                </p>
                <p>
                  We specialize in the design, development, and manufacturing of a sophisticated range of <strong>Agriculture Machinery, Food Processing Plants, and Commercial Kitchen Equipment</strong>. Our products are not just machines; they are solutions designed to optimize production lines, reduce wastage, and maximize profitability for our clients.
                </p>
                <p>
                  Today, we are proud to be a <strong>Government Recognized Export House</strong>, serving clients in over 25 countries across Asia, Africa, and the Middle East.
                </p>
             </div>
          </div>

          {/* Right: Founder's Message */}
          <div className="lg:w-1/2 bg-gray-50 p-10 rounded-sm border border-gray-100 relative">
             <Quote size={48} className="text-[#FF5722] opacity-20 absolute top-6 left-6" />
             <div className="relative z-10">
               <h3 className="text-xl font-bold text-gray-800 mb-1">Director's Message</h3>
               <p className="text-xs text-[#FF5722] font-bold uppercase tracking-wider mb-6">Visionary Leadership</p>
               
               <blockquote className="text-gray-600 italic mb-6 text-lg leading-relaxed">
                 "Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction, and skillful execution. At Devika Industries, we don't just sell machines—we build long-term partnerships. Our goal is to see our clients grow using our technology."
               </blockquote>

               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    {/* Placeholder for Founder Image */}
                    <img src="https://placehold.co/100x100?text=NC" alt="Mr. Naresh" />
                 </div>
                 <div>
                   <p className="font-bold text-gray-900">Mr. Naresh Haribhai Chauhan</p>
                   <p className="text-xs text-gray-500">Founder & Managing Director</p>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>

      {/* 3. KEY STATS STRIP */}
      <div className="bg-[#FF5722] py-16 text-white">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
              <div>
                <span className="block text-4xl font-extrabold mb-2">20+</span>
                <span className="text-xs font-bold uppercase tracking-wider">Years Experience</span>
              </div>
              <div>
                <span className="block text-4xl font-extrabold mb-2">1350+</span>
                <span className="text-xs font-bold uppercase tracking-wider">Projects Completed</span>
              </div>
              <div>
                <span className="block text-4xl font-extrabold mb-2">25+</span>
                <span className="text-xs font-bold uppercase tracking-wider">Countries Exported</span>
              </div>
              <div>
                <span className="block text-4xl font-extrabold mb-2">100%</span>
                <span className="text-xs font-bold uppercase tracking-wider">Quality Assured</span>
              </div>
           </div>
        </div>
      </div>

      {/* 4. INFRASTRUCTURE & QUALITY */}
      <div className="bg-gray-50 py-24">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <span className="text-[#FF5722] font-bold tracking-widest uppercase text-xs">Behind The Scenes</span>
               <h2 className="text-3xl font-extrabold text-gray-900 uppercase mt-2">Infrastructure & Quality</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <div className="bg-white p-8 shadow-lg border-b-4 border-gray-200 hover:border-[#FF5722] transition group">
                  <Factory size={40} className="text-gray-400 group-hover:text-[#FF5722] mb-6 transition" />
                  <h3 className="text-xl font-bold mb-3">Manufacturing Unit</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Our sprawling facility in Rajkot is equipped with the latest CNC machines, Lathe machines, and Hydraulic presses. This allows us to maintain high precision and meet bulk orders efficiently.
                  </p>
               </div>

               {/* Card 2 */}
               <div className="bg-white p-8 shadow-lg border-b-4 border-gray-200 hover:border-[#FF5722] transition group">
                  <Settings size={40} className="text-gray-400 group-hover:text-[#FF5722] mb-6 transition" />
                  <h3 className="text-xl font-bold mb-3">Research & Development</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Innovation is at our core. Our dedicated R&D team constantly works on upgrading our designs to ensure energy efficiency and higher output for our clients.
                  </p>
               </div>

               {/* Card 3 */}
               <div className="bg-white p-8 shadow-lg border-b-4 border-gray-200 hover:border-[#FF5722] transition group">
                  <Award size={40} className="text-gray-400 group-hover:text-[#FF5722] mb-6 transition" />
                  <h3 className="text-xl font-bold mb-3">Quality Control</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    We follow Total Quality Management (TQM). Every machine goes through a 3-stage inspection process: Raw Material Check, Assembly Testing, and Final Load Testing.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* 5. TIMELINE / JOURNEY */}
      <div className="container mx-auto px-4 py-24">
         <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 sticky top-24">
               <span className="text-[#FF5722] font-bold tracking-widest uppercase text-xs">Our History</span>
               <h2 className="text-3xl font-extrabold text-gray-900 uppercase mt-2 mb-6">The Journey So Far</h2>
               <p className="text-gray-600 mb-6">
                 From a small workshop to an international export house, our journey has been defined by resilience and growth.
               </p>
               <Link to="/products">
                 <button className="bg-black text-white px-8 py-3 text-sm font-bold uppercase hover:bg-gray-800 transition">
                   Explore Our Products
                 </button>
               </Link>
            </div>

            <div className="md:w-2/3 border-l-2 border-gray-200 pl-8 space-y-12">
               {/* Milestone 1 */}
               <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-[#FF5722] rounded-full border-4 border-white shadow-sm"></div>
                  <span className="text-4xl font-bold text-gray-200 absolute -top-4 -z-10">2006</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">Inception</h3>
                  <p className="text-gray-600 mt-2 text-sm">Founded as an entrepreneurship company under Unikraft Peripherals with a vision to revolutionize local agriculture machinery.</p>
               </div>

               {/* Milestone 2 */}
               <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-gray-300 rounded-full border-4 border-white shadow-sm"></div>
                  <span className="text-4xl font-bold text-gray-200 absolute -top-4 -z-10">2012</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">Expansion</h3>
                  <p className="text-gray-600 mt-2 text-sm">Moved to a larger manufacturing facility in Jay Jalaram Industrial Estate to increase production capacity.</p>
               </div>

               {/* Milestone 3 */}
               <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-gray-300 rounded-full border-4 border-white shadow-sm"></div>
                  <span className="text-4xl font-bold text-gray-200 absolute -top-4 -z-10">2018</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">Global Reach</h3>
                  <p className="text-gray-600 mt-2 text-sm">Started full-scale exports to African and Gulf countries, establishing Devika Industries as a global brand.</p>
               </div>

               {/* Milestone 4 */}
               <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-gray-300 rounded-full border-4 border-white shadow-sm"></div>
                  <span className="text-4xl font-bold text-gray-200 absolute -top-4 -z-10">2026</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">Digital Transformation</h3>
                  <p className="text-gray-600 mt-2 text-sm">Launched our advanced e-commerce platform and expanded into AI-driven food processing solutions.</p>
               </div>
            </div>
         </div>
      </div>

      {/* 6. WHY CHOOSE US (Detailed Grid) */}
      <div className="bg-[#1a1a1a] text-white py-24">
        <div className="container mx-auto px-4 text-center mb-12">
           <h2 className="text-3xl font-bold uppercase">Why the Industry Trusts Us</h2>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             "ISO 9001:2015 Certified", 
             "Customized Fabrication", 
             "Competitive Pricing", 
             "Timely Delivery", 
             "Global Export Network", 
             "Ethical Business Practices", 
             "Experienced R&D Team", 
             "24/7 Customer Support"
           ].map((item, idx) => (
             <div key={idx} className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition">
                <CheckCircle size={24} className="text-[#FF5722] shrink-0" />
                <span className="font-bold text-sm tracking-wide">{item}</span>
             </div>
           ))}
        </div>
      </div>

      {/* 7. CTA / FOOTER CONNECT */}
      <div className="bg-white py-20 text-center">
        <div className="container mx-auto px-4">
          <Truck size={48} className="mx-auto text-[#FF5722] mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 uppercase mb-4">Ready to Setup Your Plant?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            Whether you need a single machine or a complete turnkey plant setup, our engineers are ready to assist you.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact">
              <button className="bg-[#FF5722] text-white px-10 py-4 font-bold uppercase hover:bg-orange-700 transition shadow-xl rounded-sm">
                Get a Quote
              </button>
            </Link>
            <Link to="/products">
              <button className="border-2 border-gray-900 text-gray-900 px-10 py-4 font-bold uppercase hover:bg-gray-900 hover:text-white transition rounded-sm">
                View Catalog
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
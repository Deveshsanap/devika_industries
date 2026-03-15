import React from 'react';
import { MapPin, Phone, ChevronRight, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const Footer = () => {
  // Define links array for cleaner mapping
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Presence', path: '/presence' },
    { name: 'About Us', path: '/about' },
    { name: 'Testimonials', path: '/' }, // Testimonials are on Home
    { name: 'Contact Us', path: '/#contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'terms and conditions', path: '/terms' }


  ];

  return (
    <footer id="contact" className="relative bg-[#1a1a1a] text-white pt-20 pb-10 border-t-4 border-[#FF5722] overflow-hidden">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
         <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
         <div className="absolute -left-20 bottom-0 w-72 h-72 bg-[#FF5722] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* COLUMN 1: Contact Details (Keep existing code) */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-8 relative inline-block">
              Contact Details
              <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-[#FF5722]"></span>
            </h3>
            
            <div className="space-y-8 text-sm text-gray-400">
              <div className="flex group">
                <MapPin size={20} className="text-[#FF5722] mt-1 shrink-0 group-hover:text-white transition" />
                <div className="ml-4">
                  <h4 className="text-white font-bold mb-1">Office Address</h4>
                  <p className="leading-relaxed">Office No. 4, 1st Floor, Shreyas Anand Complex, Opp. Parul Garden, Ranchhod Wadi Main Road, Rajkot - 360003, Gujarat</p>
                </div>
              </div>
              
              <div className="flex group">
                 <MapPin size={20} className="text-[#FF5722] mt-1 shrink-0 group-hover:text-white transition" />
                 <div className="ml-4">
                  <h4 className="text-white font-bold mb-1">Factory Address</h4>
                  <p className="leading-relaxed">2 - Jay Jalaram Ind. Estate Plot No. 12A+B1, Opp. Luby Polymers, B/H. Ruda Transport Nagar, Rajkot-3.</p>
                </div>
              </div>

              <div className="flex group">
                <Phone size={20} className="text-[#FF5722] mt-1 shrink-0 group-hover:text-white transition" />
                <div className="ml-4">
                   <h4 className="text-white font-bold mb-1">Mr. Naresh Haribhai Chauhan</h4>
                   <p className="text-lg font-bold text-white tracking-wide">+91 97149 89070</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Quick Links (UPDATED) */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-8 relative inline-block">
              Quick Links
              <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-[#FF5722]"></span>
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              {quickLinks.map((item, index) => (
                <li key={index} className="border-b border-gray-800 pb-2 last:border-0 group">
                  {/* Using standard anchor tag for hash links to ensure scrolling works from any page */}
                  <a href={item.path} className="flex items-center hover:text-[#FF5722] hover:translate-x-2 transition-all duration-300 cursor-pointer">
                    <ChevronRight size={14} className="mr-3 text-gray-600 group-hover:text-[#FF5722]" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Contact Form (Keep existing code) */}
          <div className="bg-white/5 p-6 rounded-sm border border-white/10">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 text-white">
              Drop a Line
            </h3>
            <form className="space-y-4">
              <input type="text" placeholder="NAME" className="w-full bg-black/20 border border-gray-700 p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5722] focus:bg-black/40 transition" />
              
              <div className="grid grid-cols-2 gap-4">
                 <input type="email" placeholder="EMAIL" className="w-full bg-black/20 border border-gray-700 p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5722] focus:bg-black/40 transition" />
                 <input type="tel" placeholder="PHONE" className="w-full bg-black/20 border border-gray-700 p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5722] focus:bg-black/40 transition" />
              </div>

              <div className="relative">
                <select className="w-full bg-black/20 border border-gray-700 p-3 text-sm text-gray-500 focus:outline-none focus:border-[#FF5722] focus:bg-black/40 transition appearance-none cursor-pointer">
                  <option>Select Subject</option>
                  <option>Machine Inquiry</option>
                  <option>Support</option>
                  <option>Partnership</option>
                </select>
                 <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <ChevronRight size={14} className="rotate-90" />
                </div>
              </div>

              <textarea placeholder="MESSAGE" rows="3" className="w-full bg-black/20 border border-gray-700 p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5722] focus:bg-black/40 transition"></textarea>
              
              <button className="w-full bg-[#FF5722] hover:bg-orange-700 text-white font-bold py-3 uppercase text-xs tracking-widest transition shadow-lg">
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM STRIP (Keep existing code) */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="flex space-x-3 mb-4 md:mb-0">
            <a href="https://www.facebook.com/DevikaIndustriesInc.India" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-gray-700 hover:bg-[#FF5722] hover:text-white hover:border-[#FF5722] transition rounded-sm"><Facebook size={14} /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-700 hover:bg-[#FF5722] hover:text-white hover:border-[#FF5722] transition rounded-sm"><Linkedin size={14} /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-700 hover:bg-[#FF5722] hover:text-white hover:border-[#FF5722] transition rounded-sm"><Twitter size={14} /></a>
          </div>
          <div className="text-center md:text-right">
            <p className="mb-1 text-[#FF5722] font-medium italic">"A Beautiful Way To Grow Business"</p>
            <p>Copyrights 2026. <span className="text-white hover:text-[#FF5722] cursor-pointer transition">Devika Industries Inc.</span> All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
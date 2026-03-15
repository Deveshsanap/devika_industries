import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#1a1a1a] text-white py-16 text-center border-b-4 border-[#FF5722]">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide mb-2">Contact Us</h1>
        <p className="text-gray-400 text-sm">We are here to help you with your machinery needs</p>
      </div>

      <div className="container mx-auto px-4 py-16">z
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Sales */}
          <div className="bg-gray-50 p-8 border border-gray-200 text-center hover:shadow-xl transition group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:bg-[#FF5722] transition">
              <Phone size={24} className="text-[#FF5722] group-hover:text-white transition" />
            </div>
            <h3 className="font-bold text-xl mb-2">Sales Inquiry</h3>
            <p className="text-gray-500 mb-1">+91 97149 89070</p>
            <p className="text-gray-400 text-sm">sales@devikaindustries.com</p>
          </div>

          {/* Card 2: Factory Address */}
          <div className="bg-gray-50 p-8 border border-gray-200 text-center hover:shadow-xl transition group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:bg-[#FF5722] transition">
              <MapPin size={24} className="text-[#FF5722] group-hover:text-white transition" />
            </div>
            <h3 className="font-bold text-xl mb-2">Factory Location</h3>
            <p className="text-gray-500 text-sm px-4">
              2 - Jay Jalaram Ind. Estate, Opp. Luby Polymers, Rajkot-3, Gujarat, India.
            </p>
          </div>

          {/* Card 3: Working Hours */}
          <div className="bg-gray-50 p-8 border border-gray-200 text-center hover:shadow-xl transition group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:bg-[#FF5722] transition">
              <Clock size={24} className="text-[#FF5722] group-hover:text-white transition" />
            </div>
            <h3 className="font-bold text-xl mb-2">Working Hours</h3>
            <p className="text-gray-500 mb-1">Mon - Sat: 9:00 AM - 8:00 PM</p>
            <p className="text-red-500 text-sm font-bold">Sunday Closed</p>
          </div>
        </div>

        {/* Map & Form Section */}
        <div className="flex flex-col lg:flex-row gap-0 shadow-2xl rounded-lg overflow-hidden border border-gray-200">
          
          {/* Left: Google Map */}
          <div className="lg:w-1/2 h-[400px] lg:h-auto bg-gray-300 relative">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.666636734645!2d70.79526731495448!3d22.29068798532845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca248c77c099%3A0xdf5ac10af64ac8e9!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1625634567890!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{border:0}} 
               allowFullScreen="" 
               loading="lazy"
               title="Devika Industries Location"
               className="absolute inset-0 grayscale hover:grayscale-0 transition duration-700"
             ></iframe>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:w-1/2 bg-white p-10 lg:p-14">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 uppercase">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Your Name</label>
                  <input type="text" className="w-full border-b border-gray-300 py-2 focus:border-[#FF5722] outline-none transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Phone Number</label>
                  <input type="tel" className="w-full border-b border-gray-300 py-2 focus:border-[#FF5722] outline-none transition" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Email Address</label>
                <input type="email" className="w-full border-b border-gray-300 py-2 focus:border-[#FF5722] outline-none transition" placeholder="john@company.com" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Message</label>
                <textarea rows="4" className="w-full border-b border-gray-300 py-2 focus:border-[#FF5722] outline-none transition resize-none" placeholder="I am interested in the Jumbo Slicer Machine..."></textarea>
              </div>

              <button className="bg-[#FF5722] text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-orange-700 transition shadow-lg w-full md:w-auto">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
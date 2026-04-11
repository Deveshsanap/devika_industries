import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  // Auto-fill the message if they clicked "Request Quote" from a product page
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const productOfInterest = queryParams.get('product');
    
    if (productOfInterest) {
      setFormData(prev => ({
        ...prev,
        message: `Hello Devika Industries team,\n\nI would like to request an official quote and get more information regarding the following machine: ${productOfInterest}.\n\nPlease let me know the pricing, availability, and delivery details.`
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to your Vercel backend API
    console.log("Form submitted:", formData);
    toast.success("Your inquiry has been sent! We will contact you soon.");
    setFormData({ name: '', phone: '', email: '', message: '' }); // Reset form
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ready to upgrade your industrial equipment? Send us a message or request a quote, and our expert team will guide you to the perfect solution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Side: Contact Information */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 lg:p-10 shadow-xl">
          <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-orange-500 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg mb-1">Corporate Office</h4>
                <p className="text-gray-400">123 Industrial Area, Phase 1<br />City Name, State, 123456</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="w-6 h-6 text-orange-500 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg mb-1">Call Us</h4>
                <p className="text-gray-400">+91 97149 89070<br />Mon-Sat, 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-6 h-6 text-orange-500 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg mb-1">Email Us</h4>
                <p className="text-gray-400">devikaindinc@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-gray-50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-gray-50"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-gray-50"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Inquiry / Message *</label>
              <textarea 
                name="message" 
                required
                rows="5"
                value={formData.message} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-gray-50 resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors flex justify-center items-center shadow-md"
            >
              Send Message <Send className="ml-2 w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
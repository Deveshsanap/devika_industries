import React, { useState } from 'react';
import { MessageSquareQuote, User, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  // 1. DATA ARRAY: Add as many testimonials as you want here
  const testimonials = [
    {
      id: 1,
      name: "Scott Ladino",
      role: "Happy Client",
      text: "Had the roof lining fixed on my commodore yesterday, they did an exceptional job at great price, got me in straight away after my enquiry and only needed the car for a few hours, wouldn't hesitate to use their services again!",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Factory Manager",
      text: "We purchased the Jumbo Slicer Machine last year. The durability is unmatched and the after-sales support from Devika Industries has been phenomenal. Highly recommended for heavy industrial use.",
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      role: "Procurement Lead",
      text: "Fast delivery and excellent build quality. The customization options they provided for our specific food processing needs were exactly what we were looking for. A true partner in manufacturing.",
    },
  ];

  // 2. STATE: Tracks which testimonial is currently showing
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper functions to change slides
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="block text-[#FF5722] font-bold tracking-widest uppercase text-sm mb-2 pl-4 border-l-4 border-[#FF5722] inline-block md:inline">
            Customer Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase mt-2 md:mt-0">
            Testimonials
          </h2>
        </div>

        {/* Testimonial Card Area */}
        <div className="max-w-5xl mx-auto relative mt-10">
          
          {/* Floating Avatar Bubble */}
          <div className="absolute -top-6 right-8 md:-top-8 md:right-12 w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-20">
             <User size={32} className="text-gray-500" />
          </div>

          {/* Main Card Content */}
          <div className="bg-gray-50 rounded-sm shadow-xl flex flex-col md:flex-row overflow-hidden border border-gray-100 min-h-[300px]">
            
            {/* Left Column: Name & Icon */}
            <div className="md:w-1/3 bg-white p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#FF5722] flex items-center justify-center mb-4 text-[#FF5722]">
                <MessageSquareQuote size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 transition-all duration-300">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                {testimonials[currentIndex].role}
              </p>
            </div>

            {/* Right Column: Review Text */}
            <div className="md:w-2/3 p-10 md:p-14 flex items-center relative">
               {/* Arrow Buttons (Optional/Hidden on mobile for cleaner look) */}
               <button onClick={prevSlide} className="absolute left-2 text-gray-300 hover:text-[#FF5722] transition hidden md:block">
                 <ChevronLeft size={32} />
               </button>
               
               <p className="text-gray-600 italic text-lg leading-relaxed px-4 transition-opacity duration-500 ease-in-out">
                "{testimonials[currentIndex].text}"
              </p>

               <button onClick={nextSlide} className="absolute right-2 text-gray-300 hover:text-[#FF5722] transition hidden md:block">
                 <ChevronRight size={32} />
               </button>
            </div>
            
          </div>
          
          {/* 3. DYNAMIC DOTS NAVIGATION */}
          <div className="flex justify-center gap-3 mt-8">
             {testimonials.map((_, index) => (
               <button 
                 key={index}
                 onClick={() => goToSlide(index)}
                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
                   currentIndex === index ? "bg-[#FF5722] scale-125" : "bg-gray-300 hover:bg-gray-400"
                 }`}
                 aria-label={`Go to slide ${index + 1}`}
               />
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
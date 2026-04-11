import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, MapPin, FileText, ShoppingCart, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitQuoteRequest } from '../services/api';


const Checkout = () => {
  const { cartItems, clearCart } = useCart(); // Assuming your context exports 'cart' array and 'clearCart' function
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    requirements: ''
  });

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        companyName: user.companyName || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 // Don't forget to import submitQuoteRequest at the top!
  // import { submitQuoteRequest } from '../services/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Bundle the form data with the actual items in their cart
      const finalQuotePayload = {
        customerDetails: formData,
        items: cartItems.map(item => ({
          productId: item._id || item.id,
          quantity: item.quantity,
          priceAtRequest: item.price || null
        })),
        totalItems: cartItems.length
      };

      // 2. Send it to your live backend
      await submitQuoteRequest(finalQuotePayload);
      
      // 3. Clear the database cart & the UI cart
      await clearCart(); 
      
      toast.success('Quote Request Submitted Successfully!');
      navigate('/profile'); // Send them to profile to await your response
      
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error('Failed to submit quote. Please check connection or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // If cart is empty, don't let them checkout
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <ShoppingCart className="w-20 h-20 text-gray-300 mb-6" />
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">You need to add some machines to your cart before you can request a quote.</p>
        <Link to="/products" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <Link to="/cart" className="flex items-center text-gray-600 hover:text-orange-500 font-medium transition-colors mb-4 w-fit">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Cart
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900">Checkout & Request Quote</h1>
          <p className="text-gray-600 mt-2">Submit your details below and our sales team will contact you with pricing.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Contact Information */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-orange-500" /> Contact Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" />
                  </div>
                </div>
              </div>

              {/* Shipping / Installation Address */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-orange-500" /> Installation Location
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Street Address *</label>
                    <input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" placeholder="Factory / Site Address" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
                      <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">State *</label>
                      <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Pincode *</label>
                      <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Requirements */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-orange-500" /> Additional Requirements
                </h2>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Do you need custom voltage or specific configurations?</label>
                  <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" placeholder="Type any specific requests here..."></textarea>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">Inquiry Summary</h2>
              
              <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg border p-1 flex-shrink-0">
                      <img 
                        src={(item.images && item.images.length > 0) ? item.images[0] : (item.image || '/vite.svg')} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity || 1}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Total Machines</span>
                  <span className="font-bold">{cartItems.length}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Pricing</span>
                  <span className="font-bold">To be quoted</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full mt-8 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting Request...' : 'Submit Quote Request'}
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By submitting, you agree to our terms and conditions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
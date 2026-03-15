import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // <--- Added this import

const Checkout = () => {
  const { cartItems, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    phone: '',
    email: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- WHATSAPP INTEGRATION LOGIC ---
    // 1. Format the Cart Items into a string
    const itemsList = cartItems.map(item => 
      `- ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('%0a'); // %0a is a line break in URLs

    // 2. Construct the message
    const message = `*New Order Inquiry from Website*%0a%0a*Customer Details:*%0aName: ${formData.firstName} ${formData.lastName}%0aPhone: ${formData.phone}%0aCompany: ${formData.company}%0aAddress: ${formData.address}, ${formData.city}%0a%0a*Order Summary:*%0a${itemsList}%0a%0a*Total Estimated Value: ₹${cartTotal.toLocaleString()}*`;

    // 3. Open WhatsApp (Replace with Mr. Naresh's number)
    
    const loadingToast = toast.loading('Opening WhatsApp...');
    
    setTimeout(() => {
        window.open(`https://wa.me/919714989070?text=${message}`, '_blank');
        toast.dismiss(loadingToast);
        toast.success("Order inquiry generated!", { duration: 5000 });
    }, 1500);
    // In a real app, you would verify the order here and clear the cart
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: BILLING DETAILS FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-[#FF5722] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Shipping Address
              </h2>

              <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input required name="firstName" onChange={handleInputChange} type="text" className="w-full border border-gray-300 p-2 rounded focus:border-[#FF5722] outline-none" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input required name="lastName" onChange={handleInputChange} type="text" className="w-full border border-gray-300 p-2 rounded focus:border-[#FF5722] outline-none" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
                  <input name="company" onChange={handleInputChange} type="text" className="w-full border border-gray-300 p-2 rounded focus:border-[#FF5722] outline-none" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input required name="address" onChange={handleInputChange} type="text" placeholder="Street address, P.O. box" className="w-full border border-gray-300 p-2 rounded focus:border-[#FF5722] outline-none" />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required name="city" onChange={handleInputChange} type="text" className="w-full border border-gray-300 p-2 rounded focus:border-[#FF5722] outline-none" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input required name="zip" type="text" className="w-full border border-gray-300 p-2 rounded focus:border-[#FF5722] outline-none" />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input required name="phone" onChange={handleInputChange} type="tel" className="w-full border border-gray-300 p-2 rounded focus:border-[#FF5722] outline-none" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input required name="email" onChange={handleInputChange} type="email" className="w-full border border-gray-300 p-2 rounded focus:border-[#FF5722] outline-none" />
                </div>

              </form>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex items-start gap-2">
                       <span className="text-gray-500">{item.quantity}x</span>
                       <span className="text-gray-800 font-medium line-clamp-1 w-40">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-[#FF5722] pt-2 border-t border-gray-100 mt-2">
                  <span>Order Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* PAYMENT BUTTONS */}
              <button 
                type="submit" 
                form="checkout-form"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded shadow-lg transition flex items-center justify-center gap-2 mb-3"
              >
                <MessageCircle size={20} />
                Send Inquiry via WhatsApp
              </button>
              
              <p className="text-xs text-gray-400 text-center">
                By clicking the button, you will be redirected to WhatsApp to confirm your order details with our sales team.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
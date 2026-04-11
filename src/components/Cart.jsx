import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center flex flex-col items-center">
        <ShoppingCart className="w-20 h-20 text-gray-300 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any industrial machines or equipment to your quote request yet.</p>
        <Link to="/products" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Quote Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item._id || item.id} className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-gray-100 p-4 items-center">
              <img
                src={(item.images && item.images.length > 0) ? item.images[0] : (item.image || '/vite.svg')}
                alt={item.name}
                className="w-32 h-32 object-contain bg-gray-50 rounded-lg p-2"
              />
              <div className="sm:ml-6 flex-grow text-center sm:text-left mt-4 sm:mt-0">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="text-orange-500 text-sm font-semibold uppercase">{item.category}</p>
                <div className="mt-2 font-bold text-gray-900">{item.price ? `₹${item.price}` : 'Price on Request'}</div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="flex items-center border rounded-lg bg-gray-50">
                  <button onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors">
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)} className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <button onClick={() => removeFromCart(item._id || item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary / Next Steps */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quote Summary</h2>
          <div className="flex justify-between text-gray-600 mb-4 font-medium">
            <span>Total Machines</span>
            <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items</span>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <p className="text-sm text-gray-500 mb-8">
            Clicking the button below will take you to the contact form to officially request a quotation for the machines in your cart. Our team will get back to you with exact pricing and logistics.
          </p>

         <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-500 transition-colors flex justify-center items-center"
          >
            Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
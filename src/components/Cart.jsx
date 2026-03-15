import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-40 h-40 opacity-20 mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any machinery yet.</p>
        <Link to="/" className="bg-[#FF5722] text-white px-8 py-3 rounded-sm font-bold uppercase hover:bg-orange-700 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: CART ITEMS LIST */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-sm shadow-sm flex flex-col md:flex-row gap-6 items-start relative">

                {/* Image */}
                <div className="w-full md:w-32 h-32 bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-800 hover:text-[#FF5722] transition cursor-pointer">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="text-xl font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>

                  <p className="text-green-600 text-sm font-medium mt-1">In Stock</p>
                  <p className="text-gray-500 text-xs mt-1">Sold by Devika Industries</p>

                  {/* Controls */}
                  <div className="flex items-center gap-6 mt-6">

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 text-gray-600"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-bold text-gray-800 bg-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 text-gray-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Delete Link */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#FF5722] text-sm hover:underline flex items-center gap-1 font-medium"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: CHECKOUT SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-sm shadow-sm sticky top-24">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <ShieldCheck size={20} />
                <span className="text-sm font-medium">Part of your order qualifies for FREE Delivery.</span>
              </div>

              <div className="text-lg text-gray-800 mb-6">
                Subtotal ({cartCount} items): <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
              </div>

              <Link to="/checkout">
                <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-black font-medium py-3 rounded-md shadow-sm transition mb-4">
                  Proceed to Checkout
                </button>
              </Link>

              {/* Secure Trust Badge */}
              <div className="border border-gray-200 bg-gray-50 p-3 rounded text-xs text-gray-500 text-center">
                Transactions are 100% Secured by Devika Payment Gateway
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
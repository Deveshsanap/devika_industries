import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, ArrowLeft, ShoppingCart, Check, Lock } from 'lucide-react';
import toast from 'react-hot-toast'; // Import Toast
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth(); // Get User Status
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      // Error Toast for Login
      toast.error("Please login to add items to cart", {
        icon: '🔒',
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
      });
      navigate('/login');
      return;
    }
    
    addToCart(product, quantity);
    
    // Success Toast
    toast.success(`${product.name} added to cart!`, {
      style: { border: '1px solid #FF5722', padding: '16px', color: '#FF5722' },
      iconTheme: { primary: '#FF5722', secondary: '#FFFAEE' },
    });
  };

  const handleBuyNow = () => {
    if (!user) {
      // Error Toast for Login
      toast.error("Please login to place an order", {
         icon: '🔒',
         style: { borderRadius: '10px', background: '#333', color: '#fff' },
      });
      navigate('/login');
      return;
    }
    // Add to cart and redirect to checkout
    addToCart(product, quantity);
    navigate('/checkout');
  }

  if (!product) return <div className="p-20 text-center">Loading Product...</div>;

  return (
    <div className="bg-white min-h-screen pb-20 pt-6 font-sans">
      <div className="container mx-auto px-4">
        
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-[#FF5722] mb-6 transition">
          <ArrowLeft size={16} className="mr-1" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-5">
            <div className="border border-gray-200 rounded-sm mb-4 overflow-hidden relative group">
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover group-hover:scale-105 transition duration-500" />
            </div>
          </div>

          {/* CENTER: PRODUCT INFO */}
          <div className="lg:col-span-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-4">
               <div className="flex text-yellow-400">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                 ))}
               </div>
               <span className="text-sm text-blue-600 hover:underline cursor-pointer">{product.reviews} Ratings</span>
            </div>

            <div className="mb-6">
               <span className="text-sm text-gray-500 block mb-1">M.R.P.: <span className="line-through">₹{(product.price * 1.2).toFixed(0)}</span></span>
               <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                 <span className="text-sm text-[#FF5722] font-bold">(-20%)</span>
               </div>
               <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase">Product Highlights</h3>
              <ul className="space-y-2">
                {product.specs?.map((spec, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <Check size={16} className="text-green-600 mr-2 mt-0.5 shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
               <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase">Description</h3>
               <p className="text-sm text-gray-600 leading-relaxed text-justify">{product.description}</p>
            </div>
          </div>

          {/* RIGHT: BUY BOX */}
          <div className="lg:col-span-3">
             <div className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white sticky top-24">
                <div className="mb-4">
                   {product.stock ? (
                     <span className="text-green-600 text-lg font-bold">In Stock</span>
                   ) : (
                     <span className="text-red-600 text-lg font-bold">Currently Unavailable</span>
                   )}
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Quantity</label>
                  <select 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded p-2 focus:border-[#FF5722] outline-none"
                  >
                     {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  {/* ADD TO CART BUTTON */}
                  <button 
                    onClick={handleAddToCart}
                    disabled={!product.stock}
                    className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black border border-[#FCD200] font-medium py-3 rounded-full shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {user ? <ShoppingCart size={18} /> : <Lock size={16} />}
                    {user ? "Add to Cart" : "Login to Add"}
                  </button>
                  
                  {/* BUY NOW BUTTON */}
                  <button 
                    onClick={handleBuyNow}
                    disabled={!product.stock}
                    className="w-full bg-[#FA8900] hover:bg-[#E57D00] text-white font-medium py-3 rounded-full shadow-sm transition disabled:opacity-50"
                  >
                    {user ? "Buy Now" : "Login to Buy"}
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
                   <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-gray-400"/><span>Secure Transaction</span></div>
                   <div className="flex items-center gap-2"><Truck size={14} className="text-gray-400"/><span>Dispatched by Devika Industries</span></div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
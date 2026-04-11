import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, CheckCircle, ShieldCheck, Truck } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        
        // Handle variations in backend response structures
        const productData = data.data ? data.data : data;
        setProduct(productData);
        setError(null);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Could not find this machine. It may have been removed.");
      } finally {
        setLoading(false);
      }
    };

    if (id) getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || "Product not found"}</h2>
        <Link to="/products" className="text-orange-500 font-bold hover:underline">
          &larr; Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-orange-500 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Image */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex items-center justify-center min-h-[400px]">
            <img 
              src={(product.images && product.images.length > 0) ? product.images[0] : (product.image || '/vite.svg')} 
              alt={product.name} 
              className="w-full max-h-[500px] object-contain mix-blend-multiply"
            />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-center">
            
            <div className="mb-2">
              <span className="text-sm font-bold text-orange-500 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                {product.subCategory || product.category || 'Industrial Machinery'}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
              {product.name}
            </h1>
            
            <p className="text-3xl font-extrabold text-gray-900 mb-6 pb-6 border-b border-gray-100">
              {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Price on Request'}
            </p>

            <div className="prose prose-orange text-gray-600 mb-8">
              <p className="whitespace-pre-line leading-relaxed">
                {product.description || "No specific description provided for this machine. Please contact sales for technical specifications and motor details."}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium">Quality Tested</span>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium">1 Year Warranty</span>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 sm:col-span-2">
                <Truck className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium">Pan-India Delivery Available</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors flex justify-center items-center shadow-lg shadow-orange-500/20"
              >
                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Quote Cart
              </button>

              <button 
                onClick={() => {
                  handleAddToCart();
                  navigate('/checkout');
                }}
                className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Request Quote Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
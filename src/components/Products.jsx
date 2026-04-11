import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { fetchProducts } from '../services/api'; // <--- Using real backend API

const Products = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        console.log("Here is what the backend sent:", data); // ADD THIS LINE!
        
        // Ensure data is an array, then grab only the first 3 items for the homepage
        const productsArray = Array.isArray(data) ? data : (data.data || []);
        setFeaturedProducts(productsArray.slice(0, 3)); 
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);
  return (
    <section id="products" className="bg-gray-50 py-20 min-h-[600px]">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-4 gap-4">
          <div>
            <span className="block text-[#FF5722] font-bold tracking-widest uppercase text-sm mb-2 pl-4 border-l-4 border-[#FF5722]">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase">
              Featured Machines
            </h2>
          </div>

          <div className="flex gap-2">
            <button className="p-2 border border-gray-300 rounded-full hover:bg-[#FF5722] hover:text-white hover:border-[#FF5722] transition"><ChevronLeft size={20} /></button>
            <button className="p-2 border border-gray-300 rounded-full hover:bg-[#FF5722] hover:text-white hover:border-[#FF5722] transition"><ChevronRight size={20} /></button>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="w-10 h-10 text-[#FF5722] animate-spin" />
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="block h-full">
                <div className="bg-white border border-gray-200 p-4 hover:shadow-xl transition duration-300 group cursor-pointer h-full flex flex-col">

                  <div className="h-64 bg-gray-100 mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#FF5722]/0 group-hover:bg-[#FF5722]/10 transition duration-300 z-10"></div>
                    <span className="absolute top-2 right-2 bg-gray-100 text-xs font-bold px-2 py-1 rounded text-gray-500 z-20">
                      {product.category || 'Industrial'}
                    </span>
                    <img
                      src={(product.images && product.images.length > 0) ? product.images[0] : (product.image || '/vite.svg')}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="text-center mt-auto">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#FF5722] transition mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[#FF5722] font-bold text-xl">
                      {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Get Quote'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No featured machines available at the moment.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/products">
            <button className="border-2 border-[#FF5722] text-[#FF5722] px-8 py-3 uppercase font-bold text-sm hover:bg-[#FF5722] hover:text-white transition rounded-sm">
              View Entire Catalog
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Products;
import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Import useSearchParams
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import { products } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Get the category from the URL (e.g., ?category=Food Processing)
  const categoryFilter = searchParams.get('category');

  // 2. Filter the products based on the URL
  const filteredProducts = useMemo(() => {
    if (!categoryFilter) return products;
    return products.filter(product =>
      product.category.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }, [categoryFilter]);

  // Helper to clear filter
  const clearFilter = () => {
    setSearchParams({}); // Removes the ?category=... from URL
  };

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
              {categoryFilter ? `${categoryFilter}` : "All Products"}
            </h2>
          </div>

          {/* Active Filter Display */}
          {categoryFilter && (
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Showing {filteredProducts.length} results</span>
              <button
                onClick={clearFilter}
                className="flex items-center gap-1 text-sm font-bold text-red-500 hover:text-red-700 transition bg-white px-3 py-1 rounded shadow-sm border border-red-100"
              >
                <X size={14} /> Clear Filter
              </button>
            </div>
          )}

          {!categoryFilter && (
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded-full hover:bg-[#FF5722] hover:text-white hover:border-[#FF5722] transition"><ChevronLeft size={20} /></button>
              <button className="p-2 border border-gray-300 rounded-full hover:bg-[#FF5722] hover:text-white hover:border-[#FF5722] transition"><ChevronRight size={20} /></button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="block h-full">
                <div className="bg-white border border-gray-200 p-4 hover:shadow-xl transition duration-300 group cursor-pointer h-full flex flex-col">

                  <div className="h-64 bg-gray-100 mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#FF5722]/0 group-hover:bg-[#FF5722]/10 transition duration-300 z-10"></div>
                    <span className="absolute top-2 right-2 bg-gray-100 text-xs font-bold px-2 py-1 rounded text-gray-500 z-20">
                      {product.category}
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="text-center mt-auto">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#FF5722] transition mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[#FF5722] font-bold text-xl">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State if no products match */
          <div className="text-center py-20 bg-white rounded shadow-sm border border-gray-100">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">No Products Found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any machines in the "{categoryFilter}" category.</p>
            <button onClick={clearFilter} className="bg-[#FF5722] text-white px-6 py-2 rounded font-bold uppercase hover:bg-orange-700 transition">
              View All Products
            </button>
          </div>
        )}

        {/* View All Button (Only show if not filtering) */}
        {!categoryFilter && (
          <div className="text-center mt-12">
            <Link to="/products">
              <button className="border-2 border-[#FF5722] text-[#FF5722] px-8 py-3 uppercase font-bold text-sm hover:bg-[#FF5722] hover:text-white transition rounded-sm">
                View All Products
              </button>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default Products;
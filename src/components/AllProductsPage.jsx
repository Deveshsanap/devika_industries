import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Filter, ChevronDown, ChevronRight, X } from 'lucide-react';

const AllProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [sortBy, setSortBy] = useState('default'); // default, lowToHigh, highToLow

  // Update local state if URL changes
  useEffect(() => {
    setSelectedCategory(initialCategory || 'All');
  }, [initialCategory]);

  const categories = ["All", "Food Processing", "Commercial Kitchen", "Grain Processing", "Industrial Machinery", "Spares"];

  // FILTER & SORT LOGIC
  const filteredProducts = useMemo(() => {
    let result = products;

    // 1. Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }

    // 2. Sort by Price
    if (sortBy === 'lowToHigh') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highToLow') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans">
      <div className="container mx-auto px-4">
        
        {/* Page Title */}
        <div className="mb-8">
           <p className="text-sm text-gray-500 mb-1">Home / Products</p>
           <h1 className="text-3xl font-extrabold text-gray-900 uppercase">Product Catalog</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT SIDEBAR (FILTERS) --- */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200 sticky top-24">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Filter size={18} /> Filters
                </h3>
                {selectedCategory !== 'All' && (
                  <button onClick={() => {setSelectedCategory('All'); setSearchParams({});}} className="text-xs text-red-500 font-bold hover:underline">
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</h4>
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center">
                    <input 
                      type="radio" 
                      id={cat} 
                      name="category" 
                      checked={selectedCategory === cat}
                      onChange={() => {
                        setSelectedCategory(cat);
                        // Update URL without reloading
                        if(cat === 'All') setSearchParams({});
                        else setSearchParams({ category: cat });
                      }}
                      className="w-4 h-4 text-[#FF5722] focus:ring-[#FF5722] border-gray-300"
                    />
                    <label htmlFor={cat} className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-[#FF5722] transition">
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE (GRID) --- */}
          <div className="lg:w-3/4">
            
            {/* Sorting Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded shadow-sm border border-gray-200">
              <span className="text-gray-500 text-sm">Showing <strong>{filteredProducts.length}</strong> products</span>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort By:</span>
                <select 
                  className="border border-gray-300 rounded p-1 text-sm focus:border-[#FF5722] outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Relevance</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="block h-full">
                    <div className="bg-white border border-gray-200 p-4 hover:shadow-xl transition duration-300 group cursor-pointer h-full flex flex-col rounded-sm">
                      
                      <div className="h-48 bg-gray-100 mb-4 overflow-hidden relative rounded-sm">
                         <div className="absolute inset-0 bg-[#FF5722]/0 group-hover:bg-[#FF5722]/10 transition duration-300 z-10"></div>
                         <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-105 transition duration-500"
                        />
                      </div>

                      <div className="mt-auto">
                        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                        <h3 className="text-base font-bold text-gray-800 group-hover:text-[#FF5722] transition mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-[#FF5722] font-bold text-lg">
                          ₹{product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 text-center rounded border border-gray-200">
                <X size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-800">No products found</h3>
                <p className="text-gray-500">Try changing the filter or category.</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
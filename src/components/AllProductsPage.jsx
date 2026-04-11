import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
// 1. The Master Subcategory Map (Fully populated with all your catalog data)
const subcategoryMap = {
  "food processing": [
    "2 In 1 Pulveriser",
    "Coating Pan",
    "Dryer Machine",
    "Namkeen Making Machine",
    "Peeler Machine",
    "Slicer Machine",
    "SugarCane Juice Machine"
  ],
  "commercial kitchen equipment": [
    "Chapati/Roti Making Machine",
    "Chopping Machine",
    "Commercial Mixer Grinder",
    "Fast Food Court Machine",
    "Food Waste Crusher Machine",
    "Gravy Machine",
    "Vegetable Cutting Machine"
  ],
  "grain and seed processing / plant": [
    "Cold Press Oil Expeller",
    "Decorticator Machine",
    "Destoner Machine",
    "Grading Machine",
    "Multipurpose Seed Cleaning Machine",
    "Millet Processing Machine"
  ],
  "industrial food processing": [
    "Cattle Feed Making Machine",
    "Dairy Product Manufacturing Machines",
    "Industrial Flour Mill Plant",
    "Spice Pulverizer",
    "Masala SS 304 Pulveriser Blower Type",
    "Mixing Machine / Tank",
    "Peanut Butter Mini Plant",
    "Powder Mixer / Ribbon Blander",
    "Pulp Making Machine",
    "Small Business Plant / Machinery"
  ],
  "spares": [
    "Commercial Mixer Grinder",
    "Gravy Machine",
    "Pulveriser",
    "Vegetables Cutting Machine",
    "Chopping Machine"
  ]
};

const normalizeText = (text) => (text || '').trim().toLowerCase().replace(/\s+/g, ' ');

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubCategory, setActiveSubCategory] = useState('All');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
    // Reset the subcategory tab to "All" whenever the main category changes
    setActiveSubCategory('All');
  }, [categoryFilter]);

  // Smart Filter for Main Category (Handles missing "machine" keywords from backend)
  const categoryProducts = categoryFilter
    ? products.filter(p => {
      const dbCat = normalizeText(p.category).replace(' machines', '').replace(' machine', '');
      const urlCat = normalizeText(categoryFilter).replace(' machines', '').replace(' machine', '');
      return dbCat === urlCat || dbCat.includes(urlCat) || urlCat.includes(dbCat);
    })
    : products;

  // Smart Filter for Subcategory
  const displayedProducts = activeSubCategory === 'All'
    ? categoryProducts
    : categoryProducts.filter(p => normalizeText(p.subCategory) === normalizeText(activeSubCategory));

  // Determine which subcategory tabs to show based on the URL
  const normalizedCategoryFilter = normalizeText(categoryFilter).replace(' machines', '').replace(' machine', '');
  const activeSubcategoryTabs = subcategoryMap[normalizedCategoryFilter] || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
        {categoryFilter || 'All Products'}
      </h1>

      {/* Dynamic Subcategory Tabs */}
      {activeSubcategoryTabs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
          <button
            onClick={() => setActiveSubCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeSubCategory === 'All'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            All Items
          </button>

          {activeSubcategoryTabs.map((sub, index) => (
            <button
              key={index}
              onClick={() => setActiveSubCategory(sub)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeSubCategory === sub
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500 text-lg">No products found for this selection yet.</p>
          <p className="text-gray-400 text-sm mt-2">Waiting for backend data synchronization...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <div key={product._id || product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <img
                src={(product.images && product.images.length > 0) ? product.images[0] : (product.image || '/vite.svg')}
                alt={product.name}
                className="w-full h-56 object-contain p-4 bg-gray-50"
              />
              <div className="p-5 flex-grow flex flex-col">
                <p className="text-xs text-orange-500 font-bold mb-1 uppercase tracking-wider">
                  {product.subCategory || product.category}
                </p>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{product.name || 'Unnamed Product'}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {product.description || "High quality industrial equipment."}
                </p>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <span className="font-bold text-gray-900">
                    {product.price ? `₹${product.price}` : 'Get Quote'}
                  </span>
                  <Link
                    to={`/product/${product._id || product.id}`}
                    className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-orange-500 transition-colors font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  addProduct, fetchCustomers, fetchDealers, fetchProducts, deleteProduct, verifyDealer, fetchQuotes 
} from '../services/api';
import { 
  PackagePlus, Users, ShieldCheck, Image as ImageIcon, UploadCloud, 
  LayoutDashboard, List, Trash2, FileText, CheckCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('quotes'); 
  
  const [customers, setCustomers] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productForm, setProductForm] = useState({ name: '', category: '', subCategory: '', price: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoadingData(true);
        // Fetch everything in parallel to make it fast
        const [custData, dealData, prodData, quotesData] = await Promise.all([
          fetchCustomers().catch(() => []),
          fetchDealers().catch(() => []),
          fetchProducts().catch(() => []),
          fetchQuotes().catch(() => []) // New Quotes API
        ]);

        setCustomers(Array.isArray(custData) ? custData : (custData.data || []));
        setDealers(Array.isArray(dealData) ? dealData : (dealData.data || []));
        setProducts(Array.isArray(prodData) ? prodData : (prodData.data || []));
        setQuotes(Array.isArray(quotesData) ? quotesData : (quotesData.data || []));
      } catch (error) {
        console.error("Error loading admin data", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadDashboardData();
  }, []);

  // --- PRODUCT LOGIC ---
  const handleInputChange = (e) => setProductForm({ ...productForm, [e.target.name]: e.target.value });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!imageFile) return toast.error("Please select a machine image.");
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', productForm.name); formData.append('category', productForm.category);
      formData.append('subCategory', productForm.subCategory); formData.append('price', productForm.price);
      formData.append('description', productForm.description); formData.append('images', imageFile); 
      const newProduct = await addProduct(formData);
      setProducts(prev => [...prev, newProduct.data || newProduct]);
      toast.success('Machine added!');
      setProductForm({ name: '', category: '', subCategory: '', price: '', description: '' });
      setImageFile(null); setImagePreview(null); setActiveTab('manage-products');
    } catch (error) { toast.error("Failed to add product."); } finally { setIsSubmitting(false); }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Delete this machine permanently?")) return;
    try {
      await deleteProduct(productId);
      setProducts(products.filter(p => p._id !== productId));
      toast.success("Machine deleted.");
    } catch (error) { toast.error("Failed to delete machine."); }
  };

  // --- DEALER VERIFICATION LOGIC ---
  const handleVerifyDealer = async (dealerId) => {
    try {
      await verifyDealer(dealerId);
      // Update UI instantly
      setDealers(dealers.map(d => d._id === dealerId ? { ...d, isVerified: true } : d));
      toast.success("Dealer officially verified!");
    } catch (error) {
      toast.error("Failed to verify dealer.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-extrabold flex items-center">
            <LayoutDashboard className="w-6 h-6 mr-2 text-orange-500" /> Admin Portal
          </h2>
          <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
        </div>
        
        <nav className="p-4 space-y-2">
          <button onClick={() => setActiveTab('quotes')} className={`w-full flex items-center px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'quotes' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
            <FileText className="w-5 h-5 mr-3" /> Quote Requests
          </button>
          <button onClick={() => setActiveTab('manage-products')} className={`w-full flex items-center px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'manage-products' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
            <List className="w-5 h-5 mr-3" /> Inventory ({products.length})
          </button>
          <button onClick={() => setActiveTab('add-product')} className={`w-full flex items-center px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'add-product' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
            <PackagePlus className="w-5 h-5 mr-3" /> Add Machine
          </button>
          <button onClick={() => setActiveTab('dealers')} className={`w-full flex items-center px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'dealers' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
            <ShieldCheck className="w-5 h-5 mr-3" /> Dealers
          </button>
          <button onClick={() => setActiveTab('customers')} className={`w-full flex items-center px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'customers' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
            <Users className="w-5 h-5 mr-3" /> Customers
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        
        {/* QUOTES TAB */}
        {activeTab === 'quotes' && (
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Incoming Quote Requests</h1>
            {isLoadingData ? (
              <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
            ) : quotes.length === 0 ? (
              <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500">No quote requests received yet.</div>
            ) : (
              <div className="space-y-6">
                {quotes.map((quote) => (
                  <div key={quote._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-4 border-b pb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{quote.customerDetails?.fullName || 'Unknown Customer'}</h3>
                        <p className="text-gray-500">{quote.customerDetails?.email} • {quote.customerDetails?.phone}</p>
                      </div>
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">New Request</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-bold text-gray-700 mb-2">Requested Machines:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {quote.items?.map((item, i) => (
                          <li key={i} className="text-gray-600">
                            {item.quantity}x {item.productId?.name || 'Machine ID: ' + item.productId}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MANAGE INVENTORY TAB */}
        {activeTab === 'manage-products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900">Manage Inventory</h1>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                      <th className="p-4 font-bold">Machine</th>
                      <th className="p-4 font-bold">Category</th>
                      <th className="p-4 font-bold">Price</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 flex items-center space-x-4">
                          <img src={(product.images && product.images.length > 0) ? product.images[0] : (product.image || '/vite.svg')} alt={product.name} className="w-12 h-12 rounded object-cover border border-gray-200 bg-white" />
                          <span className="font-bold text-gray-900">{product.name}</span>
                        </td>
                        <td className="p-4 text-gray-600 capitalize">{product.category}</td>
                        <td className="p-4 font-bold text-gray-900">{product.price ? `₹${product.price}` : 'RFQ'}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleDeleteProduct(product._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        )}

        {/* ADD PRODUCT TAB */}
        {activeTab === 'add-product' && (
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Upload New Machine</h1>
            <form onSubmit={handleAddProduct} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
                {imagePreview ? (
                  <div className="relative w-full max-w-sm mx-auto h-48">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                    <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); }} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">✕</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <ImageIcon className="w-12 h-12 text-gray-300 mb-4" />
                    <label className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-bold cursor-pointer transition-colors">
                      Select Image
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Machine Name *</label>
                  <input type="text" name="name" required value={productForm.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                  <input type="text" name="category" required value={productForm.category} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sub-Category</label>
                  <input type="text" name="subCategory" value={productForm.subCategory} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹) (Leave blank for 'Get Quote')</label>
                  <input type="number" name="price" value={productForm.price} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea name="description" rows="4" value={productForm.description} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200"></textarea>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-500 disabled:bg-gray-400">
                {isSubmitting ? 'Uploading...' : 'Publish to Live Catalog'}
              </button>
            </form>
          </div>
        )}

        {/* DEALERS TAB WITH VERIFY BUTTON */}
        {activeTab === 'dealers' && (
           <div>
             <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Registered Dealers</h1>
             {dealers.length === 0 ? <p className="text-gray-500">No dealers found.</p> : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {dealers.map(d => (
                   <div key={d._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                     <div>
                       <h3 className="font-bold text-gray-900 text-lg">{d.name}</h3>
                       <p className="text-gray-500 text-sm">{d.email}</p>
                     </div>
                     {d.isVerified ? (
                       <span className="flex items-center text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                         <CheckCircle className="w-4 h-4 mr-1" /> Verified
                       </span>
                     ) : (
                       <button 
                         onClick={() => handleVerifyDealer(d._id)}
                         className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                       >
                         Approve Dealer
                       </button>
                     )}
                   </div>
                 ))}
               </div>
             )}
           </div>
        )}

        {/* CUSTOMERS TAB */}
        {activeTab === 'customers' && (
           <div>
             <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Registered Customers</h1>
             {customers.length === 0 ? <p className="text-gray-500">No customers found.</p> : (
               <ul className="space-y-4">
                 {customers.map(c => <li key={c._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 font-medium text-gray-800">{c.name} - <span className="text-gray-500">{c.email}</span></li>)}
               </ul>
             )}
           </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
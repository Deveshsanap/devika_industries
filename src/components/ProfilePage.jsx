import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchMyQuotes } from '../services/api';
import { User, Mail, Phone, MapPin, Package, Clock, CheckCircle } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const [myQuotes, setMyQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyQuotes = async () => {
      try {
        setLoading(true);
        const data = await fetchMyQuotes();
        // Handle backend response structures
        setMyQuotes(Array.isArray(data) ? data : (data.data || []));
      } catch (error) {
        console.error("Error fetching user quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) loadMyQuotes();
  }, [user]);

  if (!user) return null; // Should be handled by ProtectedRoute, but just in case

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{user.name || 'Valued Customer'}</h1>
              <div className="mt-2 space-y-1 text-gray-600">
                <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {user.email}</p>
                <p className="flex items-center capitalize"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Role: {user.role}</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="mt-6 md:mt-0 border-2 border-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:border-red-500 hover:text-red-500 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Order / Quote History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-orange-500" /> My Quote Requests
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : myQuotes.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">You haven't submitted any quote requests yet.</p>
              <a href="/products" className="text-orange-500 font-bold hover:underline mt-2 inline-block">Browse Catalog</a>
            </div>
          ) : (
            <div className="space-y-6">
              {myQuotes.map((quote) => (
                <div key={quote._id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-gray-50">
                  <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                    <div>
                      <p className="text-sm text-gray-500">Request ID: <span className="font-mono text-gray-900">{quote._id.slice(-8).toUpperCase()}</span></p>
                      <p className="text-sm text-gray-500">Submitted: {new Date(quote.createdAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold border border-blue-200">
                      Processing
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {quote.items?.map((item, index) => (
                      <li key={index} className="flex justify-between text-gray-700 font-medium bg-white p-3 rounded-lg border border-gray-100">
                        <span>{item.quantity}x {item.productId?.name || 'Industrial Machine'}</span>
                        {item.priceAtRequest && <span className="text-gray-500">₹{item.priceAtRequest}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
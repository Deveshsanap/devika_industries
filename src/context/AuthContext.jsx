import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchUserProfile, loginUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // We use this single loading state to stop the "Amnesia Flicker"
  const [loading, setLoading] = useState(true); 

  // Check if user is already logged in when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const profile = await fetchUserProfile();
          setUser(profile); // Sets role (admin, dealer, customer)
        } catch (error) {
          localStorage.removeItem('authToken'); // Token expired or invalid
        }
      }
      setLoading(false); // Done checking!
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser({ email, password });
      const token = data.token || (data.data && data.data.token);

      if (!token) throw new Error("No token received");

      // 1. Save the token first so we are officially "logged in"
      localStorage.setItem('authToken', token); 

      // 2. Try to get user data from the login response
      let userData = data.user || (data.data && data.data.user);

      // 3. FIX: If backend didn't send user data, fetch it immediately!
      if (!userData) {
        try {
          userData = await fetchUserProfile();
        } catch (profileError) {
          // Fallback if profile fetch fails, default to customer
          userData = { role: 'customer', email: email }; 
        }
      }

      setUser(userData);
      toast.success('Welcome back!');
      return userData; 
      
    } catch (error) {
      console.error("Login Error:", error);
      toast.error('Invalid email or password');
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    toast.success('Logged out successfully');
  };

  // STOP RENDERING IF WE ARE STILL CHECKING THE TOKEN
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
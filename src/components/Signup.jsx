import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // --- BACKEND INTEGRATION POINT ---
    // Example: await axios.post('/api/register', formData);
    
    console.log("Registering User:", formData);

    // SIMULATED REGISTRATION
    const newUser = { name: formData.name, email: formData.email, token: "new-token-456" };
    login(newUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <img className="mx-auto h-12 w-auto" src="src\assets\logo.jpeg" alt="Devika Industries" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create Account</h2>

          
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-[#FF5722] focus:border-[#FF5722] sm:text-sm"
                placeholder="Full Name"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-[#FF5722] focus:border-[#FF5722] sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-[#FF5722] focus:border-[#FF5722] sm:text-sm"
                placeholder="Password"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF5722] hover:bg-orange-700 transition duration-150 ease-in-out"
          >
            Create Account
            <ArrowRight className="ml-2 absolute right-4" size={18} />
          </button>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#FF5722] hover:text-orange-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
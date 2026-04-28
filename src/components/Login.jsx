import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/api';
import { Mail, Lock, User, Phone, Briefcase, FileText, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [accountType, setAccountType] = useState('customer'); // 'customer' or 'dealer'
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    companyName: '',
    gstNumber: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // --- REGISTRATION FLOW ---
        const payload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: accountType // Send the selected role to the backend!
        };

        // Attach extra fields if they are a dealer
        if (accountType === 'dealer') {
          if (!formData.mobile || !formData.companyName || !formData.gstNumber) {
            toast.error("Dealers must provide Mobile, Company, and GST details.");
            setIsLoading(false);
            return;
          }
          payload.mobile = formData.mobile;
          payload.companyName = formData.companyName;
          payload.gstNumber = formData.gstNumber;
        }

        await registerUser(payload);
        toast.success('Registration successful! Please sign in.');
        setIsSignUp(false); // Flip back to login mode so they can enter their new credentials
        
      } else {
        // --- LOGIN FLOW ---
        const loggedInUser = await login(formData.email, formData.password);
        
        if (loggedInUser) {
          if (loggedInUser.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/profile');
          }
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error(isSignUp ? 'Registration failed. Email might be in use.' : 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="bg-gray-900 p-8 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            DEVIKA<span className="text-orange-500">.</span>
          </h2>
          <p className="text-gray-400 mt-2">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>

        <div className="p-8">
          
          {/* THE ACCOUNT TYPE TOGGLE */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              type="button"
              onClick={() => setAccountType('customer')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                accountType === 'customer' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Retail Customer
            </button>
            <button
              type="button"
              onClick={() => setAccountType('dealer')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                accountType === 'dealer' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Dealer / Business
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* NAME FIELD (Only for Sign Up) */}
            {isSignUp && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={accountType === 'dealer' ? "Contact Person Name" : "Full Name"}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 transition-all"
                />
              </div>
            )}

            {/* EXTRA DEALER FIELDS (Only for Dealer Sign Up) */}
            {isSignUp && accountType === 'dealer' && (
              <>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    required
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 transition-all"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="gstNumber"
                    required
                    placeholder="GST Number"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 transition-all uppercase"
                  />
                </div>
              </>
            )}

            {/* EMAIL & PASSWORD (Always visible) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 transition-all"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 disabled:bg-gray-400"
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
            </button>
          </form>

          {/* TOGGLE SIGN IN / SIGN UP */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  // Reset form when switching
                  setFormData({ name: '', email: '', password: '', mobile: '', companyName: '', gstNumber: '' });
                }}
                className="font-bold text-orange-500 hover:text-orange-600 transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Register Now'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
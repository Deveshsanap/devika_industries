import React, { useState } from 'react';
import { Phone, Facebook, Linkedin, Twitter, ChevronDown, ChevronRight, ShoppingCart, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// Ensure your logo is at this exact path: src/assets/logo.jpeg
import logo from '../assets/logo.jpeg';

const Header = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const productCategories = [
    "Food Processing",
    "Commercial Kitchen",
    "Grain Processing",
    "Industrial Machinery",
    "Spares"
  ];

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="w-full relative z-50 bg-white shadow-md">

      {/* --- UPPER SECTION (Logo, Socials, Mobile Toggle) --- */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* 1. MOBILE MENU TOGGLE (Visible only on mobile) */}
        <button
          className="md:hidden text-gray-800 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 2. LOGO (Centered on mobile, Left on desktop) */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Devika Industries" className="h-16 object-contain" />
        </Link>

        {/* 3. RIGHT ACTIONS (Socials, Auth, Cart) */}
        <div className="flex items-center gap-4">

          {/* Desktop Socials (Hidden on Mobile) */}
          <div className="hidden md:flex gap-2">
            <a href="https://www.facebook.com/DevikaIndustriesInc.India" target="_blank" rel="noopener noreferrer" className="p-2 border border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white transition rounded-sm"><Facebook size={18} /></a>
            <a href="#" className="p-2 border border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white transition rounded-sm"><Linkedin size={18} /></a>
            <a href="#" className="p-2 border border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white transition rounded-sm"><Twitter size={18} /></a>
          </div>

          {/* LOGIN / USER SECTION */}
          {user ? (
            <div className="flex items-center gap-2 ml-2 md:ml-4">
              <div className="text-right hidden md:block">
                <span className="block text-xs text-gray-500">Welcome,</span>
                <span className="block text-sm font-bold text-[#FF5722] leading-none">{user.name}</span>
              </div>
              <button onClick={logout} className="text-xs underline text-gray-500 hover:text-red-500 ml-1">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 ml-2 md:ml-4 text-sm font-bold text-gray-700 hover:text-[#FF5722] transition">
              <User size={20} />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}

          {/* CART ICON */}
          <Link to="/cart" className="relative p-2 text-[#FF5722] hover:text-orange-700 transition">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* --- DESKTOP NAVIGATION (Hidden on Mobile) --- */}
      <div className="hidden md:block bg-[#FF5722] w-full">
        <div className="container mx-auto px-4">
          <nav>
            <ul className="flex flex-wrap text-white text-sm font-bold uppercase tracking-wide">
              <Link to="/"><li className="px-6 py-4 hover:bg-black/10 transition">Home</li></Link>

              {/* DROPDOWN MENU */}
              <li className="group relative px-6 py-4 cursor-pointer hover:bg-black/10 transition flex items-center gap-1">
                <Link to="/products">Explore Products</Link>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />

                <div className="absolute top-full left-0 w-[300px] bg-white text-gray-800 shadow-xl border-t-4 border-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50">
                  <ul className="py-2">
                    {productCategories.map((item, index) => (
                      <Link key={index} to={`/products?category=${encodeURIComponent(item)}`}>
                        <li className="px-6 py-3 hover:bg-orange-50 hover:text-[#FF5722] border-b border-gray-100 last:border-0 transition-colors flex justify-between items-center group/item">
                          <span className="text-sm font-semibold capitalize text-left">{item}</span>
                          <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 text-[#FF5722]" />
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </li>

              <Link to="/presence"><li className="px-6 py-4 hover:bg-black/10 transition">Our Presence</li></Link>
              <Link to="/about">
                <li className="px-6 py-4 hover:bg-black/10 transition">About Us</li>
              </Link>
              <Link to="/contact"><li className="px-6 py-4 hover:bg-black/10 transition">Contact Us</li></Link>
            </ul>
          </nav>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY (Slide Down) --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50 animate-in slide-in-from-top-5 duration-300">
          <nav className="flex flex-col p-4 space-y-2">

            <Link to="/" onClick={closeMenu} className="p-3 border-b border-gray-100 font-bold text-gray-800 hover:text-[#FF5722]">
              Home
            </Link>

            {/* Mobile Dropdown Logic */}
            <div className="p-3 border-b border-gray-100">
              <span className="font-bold text-gray-800 block mb-2">Products</span>
              <div className="pl-4 space-y-2 border-l-2 border-[#FF5722]">
                {productCategories.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/products?category=${encodeURIComponent(item)}`}
                    onClick={closeMenu}
                    className="block text-sm text-gray-600 hover:text-[#FF5722]"
                  >
                    {item}
                  </Link>
                ))}
                <Link to="/products" onClick={closeMenu} className="block text-sm font-bold text-[#FF5722] mt-2">
                  View All →
                </Link>
              </div>
            </div>

            <Link to="/presence" onClick={closeMenu} className="p-3 border-b border-gray-100 font-bold text-gray-800 hover:text-[#FF5722]">
              Our Presence
            </Link>

            <Link to="/about">
              <li className="px-6 py-4 hover:bg-black/10 transition">About Us</li>
            </Link>

            <Link to="/contact" onClick={closeMenu} className="p-3 font-bold text-gray-800 hover:text-[#FF5722]">
              Contact Us
            </Link>

            {/* Mobile Auth Links */}
            {!user ? (
              <Link to="/login" onClick={closeMenu} className="p-3 border-t border-gray-100 font-bold text-gray-800 hover:text-[#FF5722] flex items-center gap-2">
                <User size={18} /> Login / Signup
              </Link>
            ) : (
              <div className="p-3 border-t border-gray-100">
                <p className="text-sm text-gray-500">Logged in as <span className="font-bold text-[#FF5722]">{user.name}</span></p>
                <button onClick={() => { logout(); closeMenu(); }} className="text-sm underline mt-1">Logout</button>
              </div>
            )}

            {/* Mobile Socials */}
            <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <a href="#" className="p-2 bg-gray-100 rounded-full"><Facebook size={20} className="text-[#FF5722]" /></a>
              <a href="#" className="p-2 bg-gray-100 rounded-full"><Linkedin size={20} className="text-[#FF5722]" /></a>
              <a href="#" className="p-2 bg-gray-100 rounded-full"><Twitter size={20} className="text-[#FF5722]" /></a>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
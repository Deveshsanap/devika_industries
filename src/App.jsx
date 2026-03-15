import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <--- Added this import
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';

// Components
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Stats from './components/Stats';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AllProductsPage from './components/AllProductsPage';
import ContactPage from './components/ContactPage';
import Presence from './components/Presence';
import ScrollToTop from './components/ScrollToTop';
import AboutPage from './components/AboutPage';
import NotFound from './components/NotFound';
import Privacy from './components/Privacy';
import Terms from './components/Terms';

// Create a Home Component to hold the Landing Page sections
const Home = () => (
  <>
    <Hero />
    <AboutUs />
    <Stats />
    <Products />
    <Testimonials />
  </>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          {/* Toaster Component for Notifications */}
          <Toaster position="top-center" reverseOrder={false} />

          <div className="font-sans antialiased text-gray-900 bg-white">
            <TopBar />
            <Header />

            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<AllProductsPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/presence" element={<Presence />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
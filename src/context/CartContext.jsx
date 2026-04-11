import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { addToCartAPI, fetchCartAPI, removeCartItemAPI, clearCartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  // 1. Generate or retrieve a unique Session ID for the user's browser
  const getSessionId = () => {
    let sessionId = localStorage.getItem('cartSessionId');
    if (!sessionId) {
      // Create a random string if they don't have one (e.g. sess_xyz123)
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('cartSessionId', sessionId);
    }
    return sessionId;
  };

  // 2. Fetch the cart from the Database on load
  useEffect(() => {
    const loadCart = async () => {
      try {
        const sessionId = getSessionId();
        const data = await fetchCartAPI(sessionId);
        
        // Handle different backend response structures
        // Backend might return { items: [...] } or just an array [...]
        const items = data?.items || data || [];
        setCartItems(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error("Could not fetch backend cart, starting fresh.", error);
      } finally {
        setLoadingCart(false);
      }
    };

    loadCart();
  }, []);

// 3. Add to Cart (Talks to Database)
  const addToCart = async (product) => {
    try {
      const sessionId = getSessionId();
      const productId = product._id || product.id;

      // Check if it exists FIRST (outside the state setter!)
      const existingItem = cartItems.find((item) => (item._id || item.id) === productId);

      if (existingItem) {
        toast.success('Cart updated!');
      } else {
        toast.success('Added to Quote Cart!');
      }

      // Optimistic UI Update
      setCartItems((prevItems) => {
        if (existingItem) {
          return prevItems.map((item) =>
            (item._id || item.id) === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });

      // Send the actual request to the backend
      await addToCartAPI({
        sessionId: sessionId,
        productId: productId,
        quantity: 1
      });

    } catch (error) {
      console.error("Error adding to database cart:", error);
      toast.error("Network issue: Item may not be saved to your session.");
    }
  };

  // 4. Remove from Cart
  const removeFromCart = async (productId) => {
    try {
      // Optimistic UI Update
      setCartItems(prev => prev.filter(item => (item._id || item.id) !== productId));
      toast.error('Item removed from cart');

      // Tell backend to delete it
      await removeCartItemAPI(productId);
    } catch (error) {
      console.error("Error removing from database cart:", error);
    }
  };

  // 5. Update Quantity (Local only for now, unless backend has an update route)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item =>
      (item._id || item.id) === productId ? { ...item, quantity: newQuantity } : item
    ));
    // Note: If your backend adds a PUT /cart/update endpoint later, you can call it here!
  };

  // 6. Clear Entire Cart
  const clearCart = async () => {
    try {
      const sessionId = getSessionId();
      setCartItems([]); // Clear UI
      await clearCartAPI(sessionId); // Clear Database
    } catch (error) {
      console.error("Error clearing database cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, loadingCart }}>
      {children}
    </CartContext.Provider>
  );
};





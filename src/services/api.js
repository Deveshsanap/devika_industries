// Change this to your Vercel URL when pushing to production!
const BASE_URL = 'https://devika-backend.vercel.app'; 

// Helper function to get headers with the Auth Token
const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('authToken');
  const headers = {};
  
  // If the user is logged in, attach their token to prove who they are
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // If we are uploading images (FormData), the browser sets the Content-Type automatically
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

// ==========================================
// 1. AUTHENTICATION APIs
// ==========================================

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

export const fetchUserProfile = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/profile`, {
    method: 'GET',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
};

export const logoutUserAPI = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: getHeaders(),
  });
  // We don't necessarily throw an error here because we'll clear local storage anyway
  return response.json();
};

// --- ADMIN ONLY AUTH APIs ---
export const fetchDealers = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/dealers`, {
    method: 'GET',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch dealers');
  return response.json();
};

export const fetchCustomers = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/customers`, {
    method: 'GET',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch customers');
  return response.json();
};

export const verifyDealer = async (dealerId) => {
  const response = await fetch(`${BASE_URL}/api/auth/verify-dealer/${dealerId}`, {
    method: 'PUT',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to verify dealer');
  return response.json();
};

// ==========================================
// 2. PRODUCTS APIs (With Cloudinary Support)
// ==========================================

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: 'GET',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProductById = async (productId) => {
  const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch product details');
  return response.json();
};

export const addProduct = async (productFormData) => {
  // Uses FormData because it includes Cloudinary image files
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: 'POST',
    headers: getHeaders(true), 
    body: productFormData,
  });
  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
};

export const updateProduct = async (productId, productData) => {
  const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
};

export const deleteProduct = async (productId) => {
  const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return response.json();
};

// ==========================================
// ==========================================
// 3. CART APIs
// ==========================================

export const addToCartAPI = async (cartData) => {
  const response = await fetch(`${BASE_URL}/api/cart/add`, { // Added /api
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(cartData),
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return response.json();
};

export const fetchCartAPI = async (sessionId) => {
  const response = await fetch(`${BASE_URL}/api/cart/${sessionId}`, { // Added /api
    method: 'GET',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
};

export const removeCartItemAPI = async (itemId) => {
  const response = await fetch(`${BASE_URL}/api/cart/item/${itemId}`, { // Added /api
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to remove item');
  return response.json();
};

export const clearCartAPI = async (sessionId) => {
  const response = await fetch(`${BASE_URL}/api/cart/clear/${sessionId}`, { // Added /api
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to clear cart');
  return response.json();
};

// ==========================================
// 4. QUOTES / ORDERS APIs
// ==========================================

export const submitQuoteRequest = async (quoteData) => {
  const response = await fetch(`${BASE_URL}/api/quotes`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(quoteData),
  });
  if (!response.ok) throw new Error('Failed to submit quote request');
  return response.json();
};
export const fetchQuotes = async () => {
  const response = await fetch(`${BASE_URL}/api/quotes`, {
    method: 'GET',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch quotes');
  return response.json();
};
export const fetchMyQuotes = async () => {
  const response = await fetch(`${BASE_URL}/api/quotes/my-quotes`, {
    method: 'GET',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch your quotes');
  return response.json();
};
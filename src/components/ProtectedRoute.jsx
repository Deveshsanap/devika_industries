import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // 1. Not logged in at all? Kick to login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Requires admin, but user is a regular customer? Kick to homepage.
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // 3. User passed the checks! Let them see the page.
  return children;
};

export default ProtectedRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element }) {
  // Check if the user is authenticated (e.g., has a valid token)
  const isAuthenticated = !!localStorage.getItem('token'); // Change this to your authentication logic

  // If authenticated, render the protected component; otherwise, redirect to the login page
  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default PrivateRoute;

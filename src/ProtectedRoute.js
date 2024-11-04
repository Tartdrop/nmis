import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, allowedTypes, userType, children }) => {
  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (allowedTypes && !allowedTypes.includes(userType)) {
    // If the user is logged in but doesn't have permission, redirect to the home page
    return <Navigate to={`/home/${userType}/${userId}`} />;
  }

  return children; // If logged in and user has permission, render the route
};

export default ProtectedRoute;

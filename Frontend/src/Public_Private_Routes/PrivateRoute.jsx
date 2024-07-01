
// if the user is authenticated before allowing access to certain routes

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token && token !==undefined  ? children : <Navigate to="/login" />;
};

export default PrivateRoute;    

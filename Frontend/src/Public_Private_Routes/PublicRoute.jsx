
//  to redirect authenticated users away from certain routes (like login or register).

import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return !token && token == undefined ? children : <Navigate to="/" />;

};

export default PublicRoute;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordGeneratorPage from './Pages/PasswordGeneratorPage';
import PrivateRoute from './Public_Private_Routes/PrivateRoute';
import PublicRoute from './Public_Private_Routes/PublicRoute';


const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <Routes>
        <Route path="/" element={<PrivateRoute> <PasswordGeneratorPage /> </PrivateRoute>} />
        <Route path="/login" element={<PublicRoute> <LoginPage /> </PublicRoute>} />
        <Route path="/register" element={<PublicRoute> <RegisterPage /> </PublicRoute>} />

      </Routes>
    </div>
  );
};

export default App;

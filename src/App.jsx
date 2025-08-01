// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

// ✅ AOS animation
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogForm from './pages/BlogForm';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import BlogDetails from './pages/BlogDetails';
import ManageData from './pages/ManageData';

const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/login" replace />;
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700, // Animation duration
      once: true,    // Animate only once when scrolling down
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/new" element={<PrivateRoute><BlogForm /></PrivateRoute>} />
          <Route path="/admin/edit/:id" element={<PrivateRoute><BlogForm /></PrivateRoute>} />
          <Route path="/admin/manage" element={<PrivateRoute><ManageData /></PrivateRoute>} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;

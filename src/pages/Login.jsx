import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toast as hotToast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Trigger fade-in and upward entrance on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === 'admin' && trimmedPassword === 'admin') {
      toast.success('Login Successful!');
      hotToast.success('Welcome back, Admin!');
      localStorage.setItem('isAdmin', 'true');
      localStorage.removeItem('selectedCategories');
      localStorage.removeItem('selectedAuthors');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials!');
      hotToast.error('Access Denied');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: '#f4f4f4',
        overflow: 'hidden',
      }}
    >
      <div
        className="p-4 rounded shadow-sm bg-light"
        style={{
          maxWidth: '400px',
          width: '100%',
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.5s ease-out',
        }}
      >
        <h2 className="mb-4 text-center" style={{ fontWeight: 'bold' }}>
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => toast.dismiss()}
              required
              style={{ padding: '10px', fontSize: '1rem' }}
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => toast.dismiss()}
              required
              style={{ padding: '10px', fontSize: '1rem' }}
            />
            <small
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                color: '#333',
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </small>
          </div>
          <button
            className="btn btn-dark w-100"
            type="submit"
            style={{
              padding: '10px',
              fontSize: '1rem',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

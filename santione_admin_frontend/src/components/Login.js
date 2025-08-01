import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

// PUBLIC_INTERFACE
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, call backend API
      if (formData.email && formData.password) {
        const userData = {
          id: '1',
          email: formData.email,
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin'
        };
        const token = 'mock-jwt-token';
        
        onLogin(userData, token);
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: 'var(--primary-color)',
            marginBottom: '8px'
          }}>
            Santione
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            Admin Dashboard
          </div>
        </div>

        <h1 className="login-title">Welcome Back</h1>
        
        {error && (
          <div style={{ 
            backgroundColor: '#ffebee', 
            color: '#c62828', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button 
          type="submit" 
          className="login-btn"
          disabled={loading}
        >
          {loading ? (
            'Signing In...'
          ) : (
            <>
              <LogIn size={16} style={{ marginRight: '8px' }} />
              Sign In
            </>
          )}
        </button>

        <div style={{ 
          marginTop: '24px', 
          textAlign: 'center', 
          fontSize: '14px', 
          color: 'var(--text-secondary)' 
        }}>
          Demo credentials: Any email and password
        </div>
      </form>
    </div>
  );
};

export default Login;

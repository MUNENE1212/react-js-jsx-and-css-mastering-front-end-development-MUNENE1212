import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Authentication Context
 *
 * Provides authentication state and functions throughout the app.
 * Manages user login, logout, registration, and token storage.
 *
 * Features:
 * - JWT token management
 * - User state persistence
 * - Login/logout functionality
 * - Protected route support
 */

const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  isAuthenticated: false,
  loading: true,
});

/**
 * AuthProvider Component
 *
 * Wraps the application and provides authentication context.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Load user and token from localStorage on mount
   */
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  /**
   * Login function
   *
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - Response with user and token
   */
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user in state and localStorage
      const { token: authToken, user: userData } = data.data;
      setToken(authToken);
      setUser(userData);
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };

  /**
   * Register function
   *
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - Response with user and token
   */
  const register = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and user in state and localStorage
      const { token: authToken, user: userData } = data.data;
      setToken(authToken);
      setUser(userData);
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.message };
    }
  };

  /**
   * Logout function
   * Clears user state and token from memory and localStorage
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!token && !!user;

  /**
   * Context value provided to children
   */
  const value = {
    user,
    token,
    login,
    logout,
    register,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use Auth Context
 *
 * @returns {Object} - Auth context value
 * @throws {Error} - If used outside AuthProvider
 *
 * @example
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthContext;

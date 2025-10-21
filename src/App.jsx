import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TasksPage from './pages/TasksPage';
import Posts from './pages/Posts';

/**
 * Main App Component
 *
 * Root component that sets up:
 * - Theme context provider for dark/light mode
 * - Auth context provider for authentication
 * - React Router for navigation
 * - Layout wrapper for consistent page structure
 * - Route definitions with protected routes
 *
 * Architecture:
 * - BrowserRouter provides routing context
 * - ThemeProvider enables theme switching across the app
 * - AuthProvider manages authentication state
 * - ProtectedRoute wraps routes requiring login
 * - Layout component wraps all routes for consistent structure
 * - Routes component handles route matching and rendering
 *
 * @returns {JSX.Element} - App component with full routing setup
 */
function App() {
  return (
    /**
     * ThemeProvider wraps the entire app
     * Makes theme context available to all components
     * Handles theme state and persistence
     */
    <ThemeProvider>
      {/**
       * AuthProvider wraps the app
       * Manages authentication state, login, logout
       * Makes auth context available to all components
       */}
      <AuthProvider>
        {/**
         * Router provides navigation context
         * Enables client-side routing without page reloads
         */}
        <Router>
          {/**
           * Layout component wraps all pages
           * Provides consistent Navbar and Footer
           * Ensures proper page structure
           */}
          <Layout>
            {/**
             * Routes configuration
             * Defines which component renders for each path
             * Uses React Router v6 syntax with protected routes
             */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/posts" element={<Posts />} />

              {/* Protected Routes - Require Authentication */}
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                }
              />

              {/* 404 Not Found - Fallback route */}
              <Route
                path="*"
                element={
                  <div className="text-center py-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      404 - Page Not Found
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      The page you're looking for doesn't exist.
                    </p>
                  </div>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 
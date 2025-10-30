import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import TasksPage from './pages/TasksPage';
import Posts from './pages/Posts';

/**
 * Main App Component
 *
 * Root component that sets up:
 * - Theme context provider for dark/light mode
 * - React Router for navigation
 * - Layout wrapper for consistent page structure
 * - Route definitions
 *
 * Architecture:
 * - BrowserRouter provides routing context
 * - ThemeProvider enables theme switching across the app
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
           * Uses React Router v7 syntax
           */}
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Tasks Page - Task Management with localStorage */}
            <Route path="/tasks" element={<TasksPage />} />

            {/* Posts Page - JSONPlaceholder API Integration */}
            <Route path="/posts" element={<Posts />} />

            {/* 404 Not Found - Fallback route */}
            <Route
              path="*"
              element={
                <div className="text-center py-12 animate-fade-in">
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
    </ThemeProvider>
  );
}

export default App;

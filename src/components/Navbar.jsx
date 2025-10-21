import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';
import Button from './Button';

/**
 * Navbar Component
 *
 * Responsive navigation bar with mobile menu support.
 * Includes theme switcher and navigation links.
 *
 * Features:
 * - Responsive design (mobile hamburger menu, desktop horizontal nav)
 * - Dark mode support
 * - Smooth animations
 * - Theme switcher integration
 * - Active link highlighting
 *
 * @returns {JSX.Element} - Navbar component
 *
 * @example
 * <Navbar />
 */
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * State to track mobile menu open/closed status
   * Mobile menu is hidden by default
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Toggle mobile menu visibility
   * Called when hamburger button is clicked
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Close mobile menu when a link is clicked
   * Improves UX by auto-closing after navigation
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
    closeMobileMenu();
  };

  /**
   * Navigation links configuration
   * Makes it easy to add/remove/modify nav items
   */
  const navLinks = isAuthenticated
    ? [
        { path: '/', label: 'Home' },
        { path: '/tasks', label: 'Tasks' },
        { path: '/posts', label: 'Posts' },
      ]
    : [
        { path: '/', label: 'Home' },
        { path: '/posts', label: 'Posts' },
      ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Section */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {/* Logo Icon */}
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>PLP Tasks</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.name}
                </span>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Theme Switcher */}
            <div className="ml-4">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Switcher for Mobile */}
            <ThemeSwitcher />

            {/* Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {/* Icon changes based on menu state */}
              {isMobileMenuOpen ? (
                // Close Icon (X)
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {/* Conditionally rendered based on isMobileMenuOpen state */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-gray-900">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
                    {user?.name}
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={closeMobileMenu} className="block">
                    <Button variant="secondary" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMobileMenu} className="block">
                    <Button variant="primary" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

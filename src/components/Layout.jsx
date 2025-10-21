import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout Component
 *
 * A wrapper component that provides consistent layout structure across all pages.
 * Includes Navbar at the top, Footer at the bottom, and main content area in between.
 *
 * Features:
 * - Consistent page structure
 * - Sticky footer (always at bottom even with minimal content)
 * - Responsive padding and spacing
 * - Smooth transitions with theme changes
 * - Flex layout for proper content distribution
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to display in the main area
 * @returns {JSX.Element} - Layout component
 *
 * @example
 * <Layout>
 *   <h1>Page Content</h1>
 * </Layout>
 */
const Layout = ({ children }) => {
  return (
    /**
     * Main container using flexbox for sticky footer layout
     * - min-h-screen: ensures layout fills viewport height
     * - flex-col: stacks navbar, main, footer vertically
     */
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation Bar - fixed at top */}
      <Navbar />

      {/* Main Content Area */}
      {/**
       * flex-grow: ensures main expands to fill available space
       * This pushes footer to bottom even with minimal content
       */}
      <main className="flex-grow">
        {/**
         * Container for content with responsive padding
         * - max-w-7xl: limits content width on large screens
         * - mx-auto: centers content horizontally
         * - py-8: vertical padding (top and bottom)
         * - px-4: horizontal padding with responsive scaling
         */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Page-specific content rendered here */}
          {children}
        </div>
      </main>

      {/* Footer - pushed to bottom by flex-grow on main */}
      <Footer />
    </div>
  );
};

/**
 * PropTypes for type checking
 * Ensures component receives the correct prop types
 */
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

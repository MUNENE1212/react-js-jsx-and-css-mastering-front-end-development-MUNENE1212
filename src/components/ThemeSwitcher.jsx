import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * ThemeSwitcher Component
 *
 * A toggle button that switches between light and dark themes.
 * Uses the ThemeContext to access and update the current theme.
 *
 * Features:
 * - Animated toggle switch with smooth transitions
 * - Sun and moon icons for visual indication
 * - Accessible with keyboard navigation
 * - Smooth color transitions
 *
 * @returns {JSX.Element} - ThemeSwitcher component
 *
 * @example
 * <ThemeSwitcher />
 */
const ThemeSwitcher = () => {
  /**
   * Access theme state and toggle function from context
   * This hook must be used within a ThemeProvider
   */
  const { theme, toggleTheme } = useTheme();

  /**
   * Determine if dark mode is active
   * Used for conditional styling and icon display
   */
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative inline-flex items-center h-10 w-20 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {/* Toggle Switch Background */}
      <span className="sr-only">Toggle theme</span>

      {/* Sliding Circle */}
      <span
        className={`
          inline-block h-8 w-8 rounded-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isDark ? 'translate-x-11' : 'translate-x-1'}
        `}
      >
        {/* Icon inside the circle */}
        <span className="flex items-center justify-center h-full w-full">
          {isDark ? (
            // Moon Icon (Dark Mode)
            <svg
              className="h-5 w-5 text-gray-800 animate-fade-in"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Sun Icon (Light Mode)
            <svg
              className="h-5 w-5 text-yellow-500 animate-fade-in"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </span>
      </span>

      {/* Labels (optional - shown outside the toggle) */}
      <span className="absolute left-2 text-xs font-medium text-gray-700 dark:text-gray-300 opacity-0 dark:opacity-0">
        {/* Hidden but kept for potential future use */}
      </span>
    </button>
  );
};

export default ThemeSwitcher;

import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Theme Context
 *
 * Provides a centralized theme management system for the entire application.
 * Supports light and dark modes with persistence using localStorage.
 *
 * Usage:
 * 1. Wrap your app with ThemeProvider
 * 2. Use the useTheme hook in any component to access theme state and toggle function
 */

// Create the context with default values
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * ThemeProvider Component
 *
 * Wraps the application and provides theme context to all child components.
 * Manages the current theme state and handles DOM class updates for Tailwind's dark mode.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} - ThemeProvider component
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider = ({ children }) => {
  /**
   * Use localStorage to persist theme preference
   * Defaults to 'light' if no preference is saved
   */
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  /**
   * Apply theme class to document element
   * This effect runs whenever the theme changes
   *
   * Tailwind uses the 'dark' class on the html/body element
   * to apply dark mode styles when darkMode: 'class' is configured
   */
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(theme);
  }, [theme]);

  /**
   * Toggle between light and dark themes
   * This function is exposed to child components via context
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  /**
   * Provide theme state and toggle function to children
   */
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use the Theme Context
 *
 * Provides easy access to theme state and toggle function from any component.
 * Must be used within a ThemeProvider component.
 *
 * @returns {Object} - Object containing theme and toggleTheme function
 * @throws {Error} - If used outside of ThemeProvider
 *
 * @example
 * function MyComponent() {
 *   const { theme, toggleTheme } = useTheme();
 *   return <button onClick={toggleTheme}>Current theme: {theme}</button>
 * }
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // Ensure hook is used within ThemeProvider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default ThemeContext;

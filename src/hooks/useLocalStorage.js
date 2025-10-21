import { useState, useEffect } from 'react';

/**
 * Custom hook for managing state synchronized with localStorage
 *
 * This hook provides a way to persist state across page refreshes by
 * automatically syncing with localStorage. It handles JSON serialization
 * and deserialization, making it easy to store complex data types.
 *
 * @param {string} key - The localStorage key to use for storing the value
 * @param {*} initialValue - The initial value to use if no value exists in localStorage
 * @returns {[*, Function]} - Returns a stateful value and a function to update it (like useState)
 *
 * @example
 * const [tasks, setTasks] = useLocalStorage('tasks', []);
 * // tasks will be initialized from localStorage or default to []
 * // any changes to tasks via setTasks will be automatically saved to localStorage
 */
export const useLocalStorage = (key, initialValue) => {
  /**
   * Initialize state with value from localStorage or initialValue
   * This function is only called once during component mount
   */
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Attempt to retrieve item from localStorage
      const item = window.localStorage.getItem(key);

      // Parse stored JSON or return initialValue if nothing is stored
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error occurs (e.g., JSON parsing fails), log it and return initialValue
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Update both state and localStorage when value changes
   * This effect runs whenever storedValue or key changes
   */
  useEffect(() => {
    try {
      // Save state to localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Handle potential errors (e.g., localStorage quota exceeded)
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  /**
   * Return the value and setter function
   * Works exactly like useState, but with localStorage persistence
   */
  return [storedValue, setStoredValue];
};

export default useLocalStorage;

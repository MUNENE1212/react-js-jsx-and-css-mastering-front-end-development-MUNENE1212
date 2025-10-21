/**
 * JSONPlaceholder API Integration
 *
 * This module provides functions to interact with the JSONPlaceholder API,
 * a free fake REST API for testing and prototyping.
 *
 * API Base URL: https://jsonplaceholder.typicode.com
 * Available endpoints: /posts, /users, /comments, /albums, /photos, /todos
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Generic fetch wrapper with error handling
 *
 * @param {string} endpoint - The API endpoint to fetch from
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<Object>} - Parsed JSON response
 * @throws {Error} - If the request fails
 */
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // Check if response is successful (status 200-299)
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Parse and return JSON data
    const data = await response.json();
    return data;
  } catch (error) {
    // Re-throw error with more context
    console.error('API fetch error:', error);
    throw new Error(error.message || 'Failed to fetch data from API');
  }
};

/**
 * Fetch all posts from the API
 *
 * @param {number} limit - Optional limit for number of posts to return
 * @returns {Promise<Array>} - Array of post objects
 *
 * @example
 * const posts = await fetchPosts(10); // Get first 10 posts
 */
export const fetchPosts = async (limit = null) => {
  const endpoint = limit ? `/posts?_limit=${limit}` : '/posts';
  return await fetchAPI(endpoint);
};

/**
 * Fetch a single post by ID
 *
 * @param {number} id - Post ID
 * @returns {Promise<Object>} - Post object
 *
 * @example
 * const post = await fetchPostById(1);
 */
export const fetchPostById = async (id) => {
  return await fetchAPI(`/posts/${id}`);
};

/**
 * Fetch posts with pagination
 *
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Number of items per page
 * @returns {Promise<Array>} - Array of post objects for the specified page
 *
 * @example
 * const page1 = await fetchPostsPaginated(1, 10); // First 10 posts
 * const page2 = await fetchPostsPaginated(2, 10); // Next 10 posts
 */
export const fetchPostsPaginated = async (page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  return await fetchAPI(`/posts?_start=${start}&_limit=${limit}`);
};

/**
 * Fetch all users from the API
 *
 * @returns {Promise<Array>} - Array of user objects
 *
 * @example
 * const users = await fetchUsers();
 */
export const fetchUsers = async () => {
  return await fetchAPI('/users');
};

/**
 * Fetch a single user by ID
 *
 * @param {number} id - User ID
 * @returns {Promise<Object>} - User object
 *
 * @example
 * const user = await fetchUserById(1);
 */
export const fetchUserById = async (id) => {
  return await fetchAPI(`/users/${id}`);
};

/**
 * Fetch comments for a specific post
 *
 * @param {number} postId - Post ID
 * @returns {Promise<Array>} - Array of comment objects
 *
 * @example
 * const comments = await fetchCommentsByPostId(1);
 */
export const fetchCommentsByPostId = async (postId) => {
  return await fetchAPI(`/posts/${postId}/comments`);
};

/**
 * Search posts by title
 *
 * This is a client-side search since JSONPlaceholder doesn't support
 * server-side search. For production apps, use server-side search.
 *
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of matching post objects
 *
 * @example
 * const results = await searchPosts('lorem');
 */
export const searchPosts = async (query) => {
  const allPosts = await fetchPosts();

  // Filter posts by title or body containing the query (case-insensitive)
  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Fetch all todos from the API
 *
 * @param {number} limit - Optional limit for number of todos to return
 * @returns {Promise<Array>} - Array of todo objects
 *
 * @example
 * const todos = await fetchTodos(20);
 */
export const fetchTodos = async (limit = null) => {
  const endpoint = limit ? `/todos?_limit=${limit}` : '/todos';
  return await fetchAPI(endpoint);
};

export default {
  fetchPosts,
  fetchPostById,
  fetchPostsPaginated,
  fetchUsers,
  fetchUserById,
  fetchCommentsByPostId,
  searchPosts,
  fetchTodos,
};

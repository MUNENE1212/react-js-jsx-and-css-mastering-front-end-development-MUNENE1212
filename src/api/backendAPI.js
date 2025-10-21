/**
 * Backend API Client
 *
 * Centralized API client for communicating with Express.js backend.
 * Handles authentication, requests, and error handling.
 *
 * Base URL: http://localhost:5000/api
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Get authentication token from localStorage
 * @returns {string|null} - JWT token or null
 */
const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Generic API request wrapper
 *
 * @param {string} endpoint - API endpoint (e.g., '/tasks')
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - Parsed JSON response
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// ========================================
// Task API Functions
// ========================================

/**
 * Get all tasks for current user
 * @param {string} filter - 'all', 'active', or 'completed'
 * @returns {Promise<Array>} - Array of tasks
 */
export const getTasks = async (filter = 'all') => {
  const data = await apiRequest(`/tasks?filter=${filter}`);
  return data.data.tasks;
};

/**
 * Create a new task
 * @param {Object} taskData - Task data
 * @returns {Promise<Object>} - Created task
 */
export const createTask = async (taskData) => {
  const data = await apiRequest('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
  return data.data.task;
};

/**
 * Update a task
 * @param {string} id - Task ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} - Updated task
 */
export const updateTask = async (id, updates) => {
  const data = await apiRequest(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return data.data.task;
};

/**
 * Delete a task
 * @param {string} id - Task ID
 * @returns {Promise<Object>} - Response
 */
export const deleteTask = async (id) => {
  const data = await apiRequest(`/tasks/${id}`, {
    method: 'DELETE',
  });
  return data;
};

/**
 * Get task statistics
 * @returns {Promise<Object>} - Task stats
 */
export const getTaskStats = async () => {
  const data = await apiRequest('/tasks/stats/summary');
  return data.data.stats;
};

// ========================================
// Post API Functions
// ========================================

/**
 * Get paginated posts
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @param {string} search - Search query (optional)
 * @returns {Promise<Object>} - Posts and pagination info
 */
export const getPosts = async (page = 1, limit = 10, search = '') => {
  let endpoint = `/posts?page=${page}&limit=${limit}`;
  if (search) {
    endpoint += `&search=${encodeURIComponent(search)}`;
  }
  const data = await apiRequest(endpoint);
  return data.data;
};

/**
 * Get single post by ID
 * @param {string} id - Post ID
 * @returns {Promise<Object>} - Post data
 */
export const getPost = async (id) => {
  const data = await apiRequest(`/posts/${id}`);
  return data.data.post;
};

/**
 * Create a new post
 * @param {Object} postData - Post data
 * @returns {Promise<Object>} - Created post
 */
export const createPost = async (postData) => {
  const data = await apiRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
  return data.data.post;
};

/**
 * Update a post
 * @param {string} id - Post ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} - Updated post
 */
export const updatePost = async (id, updates) => {
  const data = await apiRequest(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return data.data.post;
};

/**
 * Delete a post
 * @param {string} id - Post ID
 * @returns {Promise<Object>} - Response
 */
export const deletePost = async (id) => {
  const data = await apiRequest(`/posts/${id}`, {
    method: 'DELETE',
  });
  return data;
};

/**
 * Get current user's posts
 * @returns {Promise<Array>} - Array of posts
 */
export const getMyPosts = async () => {
  const data = await apiRequest('/posts/my/posts');
  return data.data.posts;
};

// ========================================
// Authentication API Functions
// ========================================

/**
 * Get current user profile
 * @returns {Promise<Object>} - User data
 */
export const getCurrentUser = async () => {
  const data = await apiRequest('/auth/me');
  return data.data.user;
};

/**
 * Update user profile
 * @param {Object} updates - Profile updates
 * @returns {Promise<Object>} - Updated user
 */
export const updateProfile = async (updates) => {
  const data = await apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return data.data.user;
};

export default {
  // Tasks
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  // Posts
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  // Auth
  getCurrentUser,
  updateProfile,
};

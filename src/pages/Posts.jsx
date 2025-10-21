import React, { useState, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../api/backendAPI';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import PostForm from '../components/PostForm';

/**
 * Posts Page Component
 *
 * Displays blog posts with full CRUD functionality:
 * - Browse all posts (paginated)
 * - Create new posts (authenticated users)
 * - Edit own posts (authenticated users)
 * - Delete own posts (authenticated users)
 * - Search functionality
 * - Responsive grid layout
 *
 * Demonstrates:
 * - Backend API integration
 * - Authentication-based features
 * - Conditional rendering based on user ownership
 * - State management for complex UI flows
 *
 * @returns {JSX.Element} - Posts page component
 */
const Posts = () => {
  const { isAuthenticated, user } = useAuth();

  /**
   * State Management
   */
  const [posts, setPosts] = useState([]); // Array of post objects
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error message if any
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page
  const [totalPages, setTotalPages] = useState(1); // Total pages from backend
  const [searchQuery, setSearchQuery] = useState(''); // Search input value
  const [isSearching, setIsSearching] = useState(false); // Search mode indicator

  // Create/Edit post states
  const [showPostForm, setShowPostForm] = useState(false); // Show/hide post form
  const [editingPost, setEditingPost] = useState(null); // Post being edited (null for create mode)

  const POSTS_PER_PAGE = 9; // Number of posts to display per page

  /**
   * Fetch posts from backend API
   * Runs on component mount and when page/search changes
   */
  useEffect(() => {
    loadPosts();
  }, [currentPage, isSearching]);

  /**
   * Load posts from backend
   * Handles both pagination and search
   */
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch posts with pagination and optional search
      const data = await getPosts(
        currentPage,
        POSTS_PER_PAGE,
        isSearching ? searchQuery : ''
      );

      setPosts(data.posts);
      setTotalPages(data.pagination.pages);
    } catch (err) {
      setError(err.message || 'Failed to load posts');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle search form submission
   * @param {Event} e - Form submit event
   */
  const handleSearch = async (e) => {
    e.preventDefault();

    // Clear search if empty
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setCurrentPage(1);
      return;
    }

    setIsSearching(true);
    setCurrentPage(1); // Reset to first page on new search
  };

  /**
   * Clear search and return to paginated view
   */
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setCurrentPage(1);
  };

  /**
   * Open create post form
   */
  const openCreateForm = () => {
    setEditingPost(null);
    setShowPostForm(true);
  };

  /**
   * Open edit post form
   * @param {Object} post - Post to edit
   */
  const openEditForm = (post) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  /**
   * Close post form
   */
  const closePostForm = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  /**
   * Handle post submission (create or update)
   * @param {Object} postData - Post data from form
   */
  const handlePostSubmit = async (postData) => {
    try {
      if (editingPost) {
        // Update existing post
        await updatePost(editingPost._id, postData);
      } else {
        // Create new post
        await createPost(postData);
      }

      // Reload posts and close form
      await loadPosts();
      closePostForm();
    } catch (err) {
      setError(err.message || 'Failed to save post');
      console.error('Error saving post:', err);
    }
  };

  /**
   * Handle post deletion
   * @param {string} postId - ID of post to delete
   * @param {string} postTitle - Title of post (for confirmation)
   */
  const handleDeletePost = async (postId, postTitle) => {
    // Confirm deletion
    if (!window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }

    try {
      await deletePost(postId);
      await loadPosts(); // Reload posts after deletion
    } catch (err) {
      setError(err.message || 'Failed to delete post');
      console.error('Error deleting post:', err);
    }
  };

  /**
   * Check if current user owns a post
   * @param {Object} post - Post to check
   * @returns {boolean} - True if user owns post
   */
  const isOwnPost = (post) => {
    return isAuthenticated && user && post.author && post.author._id === user.id;
  };

  /**
   * Navigate to next page
   */
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Navigate to previous page
   */
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Navigate to specific page
   * @param {number} page - Page number to navigate to
   */
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        {/* Animated spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-blue-400"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          Loading posts...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Blog Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isSearching
              ? `Search results for "${searchQuery}"`
              : 'Share your thoughts with the community'}
          </p>
        </div>

        {/* Create Post Button - Only show if authenticated */}
        {isAuthenticated && !showPostForm && (
          <Button variant="primary" onClick={openCreateForm}>
            + Create Post
          </Button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <Card variant="bordered" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3">
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setError(null)}
              className="ml-auto"
            >
              Dismiss
            </Button>
          </div>
        </Card>
      )}

      {/* Post Form - Show when creating or editing */}
      {showPostForm && (
        <PostForm
          post={editingPost}
          onSubmit={handlePostSubmit}
          onCancel={closePostForm}
        />
      )}

      {/* Search Bar - Only show when not in form mode */}
      {!showPostForm && (
        <Card variant="elevated" className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts by title, content, or tags..."
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
            {isSearching && (
              <Button variant="secondary" onClick={clearSearch}>
                Clear
              </Button>
            )}
          </form>
        </Card>
      )}

      {/* Search Results Info */}
      {isSearching && !showPostForm && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Found {posts.length} result(s)
        </div>
      )}

      {/* Posts Grid - Only show when not in form mode */}
      {!showPostForm && (
        <>
          {posts.length === 0 ? (
            <Card variant="bordered" className="max-w-2xl mx-auto">
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-600 dark:text-gray-400 text-lg mt-4">
                  {isSearching ? 'No posts found matching your search' : 'No posts yet'}
                </p>
                {isAuthenticated && !isSearching && (
                  <Button variant="primary" className="mt-4" onClick={openCreateForm}>
                    Create the first post
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card
                  key={post._id}
                  variant="default"
                  hoverable
                  className="h-full flex flex-col animate-slide-up"
                >
                  {/* Post Header */}
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    {/* Category Badge */}
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {post.category}
                    </span>
                  </div>

                  {/* Post Body */}
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-4 mb-4 flex-grow">
                    {post.body}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Post Footer */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {/* Author Avatar */}
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                          {post.author?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {post.author?.name || 'Anonymous'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Only show for own posts */}
                    {isOwnPost(post) && (
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => openEditForm(post)}
                          className="flex-1"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeletePost(post._id, post.title)}
                          className="flex-1"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination Controls - only show when not searching and has posts */}
          {!isSearching && posts.length > 0 && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 py-6 border-t border-gray-200 dark:border-gray-700">
              {/* Previous Button */}
              <Button
                variant="secondary"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                ← Previous
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Page</span>
                <div className="flex gap-1">
                  {/* Show page numbers with ellipsis for large page counts */}
                  {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = index + 1;
                    } else if (currentPage <= 3) {
                      pageNum = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + index;
                    } else {
                      pageNum = currentPage - 2 + index;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-3 py-1 rounded ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        } transition-colors`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  of {totalPages}
                </span>
              </div>

              {/* Next Button */}
              <Button
                variant="secondary"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next →
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Posts;

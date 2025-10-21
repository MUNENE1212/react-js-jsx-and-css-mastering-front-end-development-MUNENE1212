import React, { useState, useEffect } from 'react';
import { getMyPosts, createPost, updatePost, deletePost } from '../api/backendAPI';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import PostForm from '../components/PostForm';

/**
 * My Posts Page Component
 *
 * Dedicated page for authenticated users to manage their own posts.
 * Provides full CRUD functionality for user's posts only.
 *
 * Features:
 * - View all posts created by current user
 * - Create new posts
 * - Edit existing posts
 * - Delete posts
 * - Statistics (total posts, categories breakdown)
 *
 * Demonstrates:
 * - Protected page (requires authentication)
 * - User-specific data filtering
 * - Complete CRUD operations
 * - Dashboard-style statistics
 *
 * @returns {JSX.Element} - MyPosts page component
 */
const MyPosts = () => {
  const { user } = useAuth();

  /**
   * State Management
   */
  const [posts, setPosts] = useState([]); // User's posts
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error message
  const [showPostForm, setShowPostForm] = useState(false); // Show/hide post form
  const [editingPost, setEditingPost] = useState(null); // Post being edited
  const [filterCategory, setFilterCategory] = useState('all'); // Category filter

  /**
   * Fetch user's posts on mount
   */
  useEffect(() => {
    loadMyPosts();
  }, []);

  /**
   * Load user's posts from backend
   */
  const loadMyPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMyPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Failed to load your posts');
      console.error('Error loading my posts:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filter posts by category
   */
  const filteredPosts = posts.filter((post) => {
    if (filterCategory === 'all') return true;
    return post.category === filterCategory;
  });

  /**
   * Calculate statistics
   */
  const stats = {
    total: posts.length,
    byCategory: posts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {}),
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
      await loadMyPosts();
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
      await loadMyPosts(); // Reload posts after deletion
    } catch (err) {
      setError(err.message || 'Failed to delete post');
      console.error('Error deleting post:', err);
    }
  };

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-blue-400"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          Loading your posts...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your blog posts
          </p>
        </div>

        {/* Create Post Button */}
        {!showPostForm && (
          <Button variant="primary" onClick={openCreateForm}>
            + Create New Post
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

      {/* Statistics Cards - Only show when not in form mode */}
      {!showPostForm && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Posts */}
          <Card variant="elevated" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="text-center">
              <p className="text-sm font-medium opacity-90">Total Posts</p>
              <p className="text-4xl font-bold mt-2">{stats.total}</p>
            </div>
          </Card>

          {/* Technology Posts */}
          <Card variant="elevated" className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="text-center">
              <p className="text-sm font-medium opacity-90">Technology</p>
              <p className="text-4xl font-bold mt-2">{stats.byCategory.technology || 0}</p>
            </div>
          </Card>

          {/* Lifestyle Posts */}
          <Card variant="elevated" className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="text-center">
              <p className="text-sm font-medium opacity-90">Lifestyle</p>
              <p className="text-4xl font-bold mt-2">{stats.byCategory.lifestyle || 0}</p>
            </div>
          </Card>

          {/* Other Categories */}
          <Card variant="elevated" className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="text-center">
              <p className="text-sm font-medium opacity-90">Other</p>
              <p className="text-4xl font-bold mt-2">
                {(stats.byCategory.education || 0) +
                  (stats.byCategory.business || 0) +
                  (stats.byCategory.other || 0)}
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Post Form - Show when creating or editing */}
      {showPostForm && (
        <PostForm
          post={editingPost}
          onSubmit={handlePostSubmit}
          onCancel={closePostForm}
        />
      )}

      {/* Category Filter - Only show when not in form mode */}
      {!showPostForm && posts.length > 0 && (
        <Card variant="elevated">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by category:
            </span>
            <Button
              variant={filterCategory === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterCategory('all')}
            >
              All ({posts.length})
            </Button>
            <Button
              variant={filterCategory === 'technology' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterCategory('technology')}
            >
              Technology ({stats.byCategory.technology || 0})
            </Button>
            <Button
              variant={filterCategory === 'lifestyle' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterCategory('lifestyle')}
            >
              Lifestyle ({stats.byCategory.lifestyle || 0})
            </Button>
            <Button
              variant={filterCategory === 'education' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterCategory('education')}
            >
              Education ({stats.byCategory.education || 0})
            </Button>
            <Button
              variant={filterCategory === 'business' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterCategory('business')}
            >
              Business ({stats.byCategory.business || 0})
            </Button>
            <Button
              variant={filterCategory === 'other' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterCategory('other')}
            >
              Other ({stats.byCategory.other || 0})
            </Button>
          </div>
        </Card>
      )}

      {/* Posts List - Only show when not in form mode */}
      {!showPostForm && (
        <>
          {filteredPosts.length === 0 ? (
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
                  {filterCategory === 'all'
                    ? "You haven't created any posts yet"
                    : `No posts in the ${filterCategory} category`}
                </p>
                {filterCategory === 'all' && (
                  <Button variant="primary" className="mt-4" onClick={openCreateForm}>
                    Create your first post
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
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
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Created: {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      {post.updatedAt !== post.createdAt && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Updated: {new Date(post.updatedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
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
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyPosts;

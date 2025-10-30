import React, { useState, useEffect } from 'react';
import { fetchPostsPaginated, searchPosts } from '../api/jsonPlaceholder';
import Card from '../components/Card';
import Button from '../components/Button';

/**
 * Posts Page Component
 *
 * Displays posts from JSONPlaceholder API with:
 * - Pagination
 * - Search functionality
 * - Loading states
 * - Error handling
 * - Responsive grid layout
 *
 * Demonstrates:
 * - useEffect for data fetching
 * - useState for managing multiple state variables
 * - Async/await with error handling
 * - Conditional rendering
 * - API integration
 *
 * @returns {JSX.Element} - Posts page component
 */
const Posts = () => {
  /**
   * State Management
   */
  const [posts, setPosts] = useState([]); // Array of post objects
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error message if any
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page
  const [searchQuery, setSearchQuery] = useState(''); // Search input value
  const [isSearching, setIsSearching] = useState(false); // Search mode indicator

  const POSTS_PER_PAGE = 9; // Number of posts to display per page
  const TOTAL_POSTS = 100; // JSONPlaceholder has 100 posts total
  const totalPages = Math.ceil(TOTAL_POSTS / POSTS_PER_PAGE);

  /**
   * Fetch posts from JSONPlaceholder API
   * Runs on component mount and when page changes
   */
  useEffect(() => {
    if (!isSearching) {
      loadPosts();
    }
  }, [currentPage, isSearching]);

  /**
   * Load posts for the current page
   */
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPostsPaginated(currentPage, POSTS_PER_PAGE);
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle search functionality
   */
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      // If search is empty, return to normal pagination mode
      setIsSearching(false);
      setCurrentPage(1);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setIsSearching(true);
      const results = await searchPosts(searchQuery);
      setPosts(results);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Error searching posts:', err);
    } finally {
      setLoading(false);
    }
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
   * Navigate to previous page
   */
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
   * Loading State
   */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-blue-400 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Blog Posts
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse posts from JSONPlaceholder API
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts by title or content..."
            className="flex-grow px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
          {isSearching && (
            <Button type="button" variant="secondary" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-slide-down">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button variant="secondary" size="sm" onClick={loadPosts} className="mt-2">
            Try Again
          </Button>
        </div>
      )}

      {/* Search Results Info */}
      {isSearching && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-700 dark:text-blue-300">
            Found {posts.length} result{posts.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {isSearching ? 'No posts found matching your search.' : 'No posts available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              variant="bordered"
              hoverable
              className="animate-slide-up"
              header={
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    Post #{post.id}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1 capitalize">
                    {post.title}
                  </h2>
                </div>
              }
            >
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-400 line-clamp-4">
                  {post.body}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination Controls - Only show when not searching */}
      {!isSearching && posts.length > 0 && (
        <div className="flex items-center justify-center gap-4 py-6">
          <Button
            variant="secondary"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <Button
            variant="secondary"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Pagination Info */}
      {!isSearching && posts.length > 0 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Showing {(currentPage - 1) * POSTS_PER_PAGE + 1} -{' '}
          {Math.min(currentPage * POSTS_PER_PAGE, TOTAL_POSTS)} of {TOTAL_POSTS} posts
        </div>
      )}
    </div>
  );
};

export default Posts;

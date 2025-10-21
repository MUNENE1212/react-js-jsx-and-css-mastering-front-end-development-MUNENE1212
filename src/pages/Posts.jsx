import React, { useState, useEffect } from 'react';
import { fetchPostsPaginated, searchPosts } from '../api/jsonPlaceholder';
import Card from '../components/Card';
import Button from '../components/Button';

/**
 * Posts Page Component
 *
 * Displays a list of posts from JSONPlaceholder API with:
 * - Loading and error states
 * - Pagination
 * - Search functionality
 * - Responsive grid layout
 *
 * Demonstrates proper API integration patterns and state management.
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

  const POSTS_PER_PAGE = 10; // Number of posts to display per page
  const TOTAL_POSTS = 100; // Total posts available from JSONPlaceholder
  const totalPages = Math.ceil(TOTAL_POSTS / POSTS_PER_PAGE);

  /**
   * Fetch posts from API on component mount and when page changes
   * This effect runs whenever currentPage changes
   */
  useEffect(() => {
    /**
     * Async function to load posts
     * Wrapped in function to use async/await within useEffect
     */
    const loadPosts = async () => {
      try {
        setLoading(true); // Show loading indicator
        setError(null); // Clear any previous errors

        // Fetch paginated posts from API
        const data = await fetchPostsPaginated(currentPage, POSTS_PER_PAGE);
        setPosts(data);
      } catch (err) {
        // Handle errors gracefully
        setError(err.message || 'Failed to load posts');
        console.error('Error loading posts:', err);
      } finally {
        // Always stop loading indicator, whether success or error
        setLoading(false);
      }
    };

    // Only fetch if not in search mode
    if (!isSearching) {
      loadPosts();
    }
  }, [currentPage, isSearching]);

  /**
   * Handle search form submission
   * Performs client-side search of all posts
   *
   * @param {Event} e - Form submit event
   */
  const handleSearch = async (e) => {
    e.preventDefault();

    // Ignore empty search queries
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setCurrentPage(1); // Reset to first page
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setIsSearching(true);

      // Search all posts for the query
      const results = await searchPosts(searchQuery);
      setPosts(results);
    } catch (err) {
      setError(err.message || 'Search failed');
      console.error('Search error:', err);
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
   * Navigate to next page
   */
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
  };

  /**
   * Navigate to previous page
   */
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
  };

  /**
   * Navigate to specific page
   *
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

  /**
   * Render error state
   */
  if (error) {
    return (
      <Card variant="bordered" className="max-w-2xl mx-auto">
        <div className="text-center py-8">
          {/* Error icon */}
          <svg
            className="mx-auto h-16 w-16 text-red-500"
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
          <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
            Error Loading Posts
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{error}</p>
          <Button
            variant="primary"
            className="mt-6"
            onClick={() => {
              setError(null);
              setCurrentPage(1);
            }}
          >
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Blog Posts
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore posts from JSONPlaceholder API
        </p>
      </div>

      {/* Search Bar */}
      <Card variant="elevated" className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts by title or content..."
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

      {/* Search Results Info */}
      {isSearching && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Found {posts.length} result(s) for "{searchQuery}"
        </div>
      )}

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <Card variant="bordered" className="max-w-2xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No posts found
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              variant="default"
              hoverable
              className="h-full animate-slide-up"
              header={
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {post.title}
                </h3>
              }
              footer={
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Post #{post.id}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    User {post.userId}
                  </span>
                </div>
              }
            >
              <p className="text-gray-700 dark:text-gray-300 line-clamp-4">
                {post.body}
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination Controls - only show when not searching */}
      {!isSearching && posts.length > 0 && (
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
    </div>
  );
};

export default Posts;

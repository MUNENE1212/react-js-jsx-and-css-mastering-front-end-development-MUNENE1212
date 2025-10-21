import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTasks, getMyPosts } from '../api/backendAPI';
import Card from '../components/Card';
import Button from '../components/Button';

/**
 * Home Page Component
 *
 * Landing page that adapts based on authentication state:
 * - Logged out: Marketing landing page with features
 * - Logged in: Personalized dashboard with statistics and quick actions
 *
 * Dashboard Features (Authenticated):
 * - Welcome message with user name
 * - Statistics cards (tasks, posts, completion rate)
 * - Recent tasks preview
 * - Recent posts preview
 * - Quick action buttons
 *
 * @returns {JSX.Element} - Home page component
 */
const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    tasks: [],
    posts: [],
    loading: true,
  });

  /**
   * Load dashboard data when user is authenticated
   */
  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  /**
   * Fetch tasks and posts for dashboard
   */
  const loadDashboardData = async () => {
    try {
      setDashboardData((prev) => ({ ...prev, loading: true }));

      // Fetch tasks and posts in parallel
      const [tasks, posts] = await Promise.all([
        getTasks('all'),
        getMyPosts(),
      ]);

      setDashboardData({
        tasks,
        posts,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setDashboardData((prev) => ({ ...prev, loading: false }));
    }
  };

  /**
   * Calculate statistics from tasks and posts
   */
  const getStats = () => {
    const { tasks, posts } = dashboardData;

    const completedTasks = tasks.filter((t) => t.completed).length;
    const activeTasks = tasks.filter((t) => !t.completed).length;
    const completionRate = tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

    return {
      totalTasks: tasks.length,
      activeTasks,
      completedTasks,
      completionRate,
      totalPosts: posts.length,
    };
  };

  /**
   * Render loading state for dashboard
   */
  if (isAuthenticated && dashboardData.loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-blue-400"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  /**
   * Render authenticated user dashboard
   */
  if (isAuthenticated) {
    const stats = getStats();
    const { tasks, posts } = dashboardData;

    // Get recent tasks (last 5)
    const recentTasks = tasks.slice(0, 5);

    // Get recent posts (last 3)
    const recentPosts = posts.slice(0, 3);

    return (
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-blue-100 text-lg">
            Here's what's happening with your tasks and posts
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Tasks */}
          <Card variant="elevated" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Total Tasks</p>
                <p className="text-3xl font-bold mt-1">{stats.totalTasks}</p>
              </div>
              <svg
                className="h-12 w-12 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </Card>

          {/* Active Tasks */}
          <Card variant="elevated" className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Active Tasks</p>
                <p className="text-3xl font-bold mt-1">{stats.activeTasks}</p>
              </div>
              <svg
                className="h-12 w-12 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </Card>

          {/* Completed Tasks */}
          <Card variant="elevated" className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Completed</p>
                <p className="text-3xl font-bold mt-1">{stats.completedTasks}</p>
              </div>
              <svg
                className="h-12 w-12 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </Card>

          {/* Completion Rate */}
          <Card variant="elevated" className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Completion Rate</p>
                <p className="text-3xl font-bold mt-1">{stats.completionRate}%</p>
              </div>
              <svg
                className="h-12 w-12 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </Card>

          {/* Total Posts */}
          <Card variant="elevated" className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Blog Posts</p>
                <p className="text-3xl font-bold mt-1">{stats.totalPosts}</p>
              </div>
              <svg
                className="h-12 w-12 opacity-80"
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
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card variant="elevated">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/tasks">
              <Button variant="primary" className="w-full">
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add New Task
                </span>
              </Button>
            </Link>
            <Link to="/my-posts">
              <Button variant="secondary" className="w-full">
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Create Post
                </span>
              </Button>
            </Link>
            <Link to="/posts">
              <Button variant="secondary" className="w-full">
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Browse Posts
                </span>
              </Button>
            </Link>
          </div>
        </Card>

        {/* Recent Tasks */}
        <Card variant="elevated">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Tasks
            </h2>
            <Link to="/tasks">
              <Button variant="secondary" size="sm">
                View All →
              </Button>
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No tasks yet. Create your first task to get started!</p>
              <Link to="/tasks">
                <Button variant="primary" className="mt-4">
                  Create First Task
                </Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {recentTasks.map((task) => (
                <li
                  key={task._id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span
                    className={`flex-grow ${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {task.text}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Recent Posts */}
        <Card variant="elevated">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Posts
            </h2>
            <Link to="/my-posts">
              <Button variant="secondary" size="sm">
                View All →
              </Button>
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No posts yet. Share your first thought with the community!</p>
              <Link to="/my-posts">
                <Button variant="primary" className="mt-4">
                  Create First Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentPosts.map((post) => (
                <div
                  key={post._id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {post.body}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Activity Summary */}
        <Card variant="elevated" className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Keep Up the Great Work!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You've completed {stats.completedTasks} tasks and shared {stats.totalPosts} posts
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/tasks">
                <Button variant="primary">
                  Manage Tasks
                </Button>
              </Link>
              <Link to="/my-posts">
                <Button variant="secondary">
                  Manage Posts
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  /**
   * Render landing page for non-authenticated users
   */
  const features = [
    {
      title: 'Task Management',
      description:
        'Create, organize, and track your tasks with an intuitive interface. Mark tasks as complete and filter by status.',
      icon: (
        <svg
          className="h-12 w-12 text-blue-600 dark:text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      link: '/tasks',
    },
    {
      title: 'Blog Posts',
      description:
        'Share your thoughts with the community. Create, edit, and manage your blog posts with rich features.',
      icon: (
        <svg
          className="h-12 w-12 text-green-600 dark:text-green-400"
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
      ),
      link: '/posts',
    },
    {
      title: 'Dark Mode',
      description:
        'Toggle between light and dark themes for comfortable viewing. Preference saved automatically.',
      icon: (
        <svg
          className="h-12 w-12 text-purple-600 dark:text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up">
          Welcome to PLP Tasks
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up">
          A modern task management and blogging platform built with React, MongoDB, Express, and Node.js.
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-bounce-in">
          <Link to="/register">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
          <Link to="/posts">
            <Button variant="secondary" size="lg">
              Browse Posts
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="elevated"
              hoverable
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center">
                {/* Feature Icon */}
                <div className="mb-4">{feature.icon}</div>

                {/* Feature Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>

                {/* Feature Link (if available) */}
                {feature.link && (
                  <Link to={feature.link}>
                    <Button variant="primary" size="sm">
                      Learn More →
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Built With Modern Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { name: 'React 18', color: 'text-blue-500' },
            { name: 'MongoDB', color: 'text-green-500' },
            { name: 'Express.js', color: 'text-gray-500' },
            { name: 'Node.js', color: 'text-green-600' },
            { name: 'Tailwind CSS', color: 'text-cyan-500' },
            { name: 'JWT Auth', color: 'text-purple-500' },
            { name: 'Vite', color: 'text-purple-500' },
            { name: 'REST API', color: 'text-red-500' },
          ].map((tech, index) => (
            <div key={index} className="animate-fade-in">
              <p
                className={`text-2xl font-bold ${tech.color} mb-2`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Get Organized?
        </h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          Join our community and start managing your tasks and sharing your thoughts today.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Sign Up Now
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="secondary"
              size="lg"
              className="bg-blue-700 text-white hover:bg-blue-800"
            >
              Login
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

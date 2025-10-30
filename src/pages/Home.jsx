import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

/**
 * Home Page Component
 *
 * Landing page that showcases the application's features:
 * - Hero section with call-to-action
 * - Feature cards highlighting key functionality
 * - Technology stack information
 *
 * Demonstrates:
 * - Component composition with reusable Card and Button components
 * - Responsive grid layouts
 * - Tailwind CSS for styling
 * - React Router navigation with Link
 *
 * @returns {JSX.Element} - Home page component
 */
const Home = () => {
  /**
   * Application features configuration
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
      title: 'API Integration',
      description:
        'Browse posts from JSONPlaceholder API with pagination and search functionality. Real-time data fetching and filtering.',
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
        'Toggle between light and dark themes for comfortable viewing. Your preference is saved automatically in localStorage.',
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
          A modern, responsive React application demonstrating component architecture, state management, hooks, and API integration with Tailwind CSS.
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-bounce-in">
          <Link to="/tasks">
            <Button variant="primary" size="lg">
              Manage Tasks
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
                      Try It Out →
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
            { name: 'React 18.3', color: 'text-blue-500' },
            { name: 'Tailwind CSS', color: 'text-cyan-500' },
            { name: 'Vite 6.0', color: 'text-purple-500' },
            { name: 'React Router v7', color: 'text-red-500' },
            { name: 'Context API', color: 'text-green-500' },
            { name: 'Custom Hooks', color: 'text-yellow-500' },
            { name: 'localStorage', color: 'text-indigo-500' },
            { name: 'REST API', color: 'text-pink-500' },
          ].map((tech, index) => (
            <div key={index} className="animate-fade-in">
              <p className={`text-lg font-bold ${tech.color} mb-1`}>
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Assignment Information */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          PLP Academy Week 3 Assignment
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          This project demonstrates mastery of React.js, JSX, and Tailwind CSS through practical implementation of component architecture, state management, and API integration.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              React Hooks Used
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>✓ useState for component state</li>
              <li>✓ useEffect for side effects</li>
              <li>✓ useContext for theme management</li>
              <li>✓ useLocalStorage custom hook</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Key Features
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>✓ Responsive design (mobile/tablet/desktop)</li>
              <li>✓ Dark/Light theme with persistence</li>
              <li>✓ API integration with JSONPlaceholder</li>
              <li>✓ localStorage for data persistence</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Explore?
        </h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          Try out the task manager or browse posts to see the app in action.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/tasks">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Open Task Manager
            </Button>
          </Link>
          <Link to="/posts">
            <Button
              variant="secondary"
              size="lg"
              className="bg-blue-700 text-white hover:bg-blue-800"
            >
              Browse Posts
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

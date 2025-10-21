import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

/**
 * Home Page Component
 *
 * Landing page for the PLP Task Manager application.
 * Provides an overview of features and navigation to main sections.
 *
 * Features:
 * - Hero section with call-to-action
 * - Feature cards showcasing app capabilities
 * - Responsive grid layout
 * - Smooth animations
 *
 * @returns {JSX.Element} - Home page component
 */
const Home = () => {
  /**
   * Feature cards configuration
   * Makes it easy to add/modify features displayed on homepage
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
        'Browse posts from JSONPlaceholder API with pagination and search functionality. Real-world API integration example.',
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      link: '/posts',
    },
    {
      title: 'Dark Mode',
      description:
        'Toggle between light and dark themes for comfortable viewing. Preference saved automatically using localStorage.',
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
          A modern task management application built with React, Tailwind CSS,
          and best practices in component architecture and state management.
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-bounce-in">
          <Link to="/tasks">
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
            { name: 'Tailwind CSS', color: 'text-cyan-500' },
            { name: 'Vite', color: 'text-purple-500' },
            { name: 'React Router', color: 'text-red-500' },
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
          Start managing your tasks efficiently with our intuitive task manager.
        </p>
        <Link to="/tasks">
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Start Managing Tasks
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;

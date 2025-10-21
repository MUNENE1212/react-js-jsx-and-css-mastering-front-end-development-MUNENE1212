import React from 'react';
import TaskManager from '../components/TaskManager';
import Card from '../components/Card';

/**
 * Tasks Page Component
 *
 * Dedicated page for task management functionality.
 * Wraps the TaskManager component with page-level layout and instructions.
 *
 * Features:
 * - Page header with instructions
 * - TaskManager component integration
 * - Responsive layout
 * - Tips and help section
 *
 * @returns {JSX.Element} - Tasks page component
 */
const TasksPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Task Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Organize your tasks and boost your productivity
        </p>
      </div>

      {/* Main Task Manager */}
      <div className="max-w-4xl mx-auto">
        <TaskManager />
      </div>

      {/* Tips Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <Card variant="bordered">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            💡 Quick Tips
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>
                <strong>Add Tasks:</strong> Type your task in the input field and
                click "Add Task" or press Enter
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>
                <strong>Mark Complete:</strong> Click the checkbox next to a task
                to mark it as complete
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>
                <strong>Filter Tasks:</strong> Use the filter buttons to view All,
                Active, or Completed tasks
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <span>
                <strong>Persistent Storage:</strong> Your tasks are automatically
                saved to localStorage and will persist across sessions
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default TasksPage;

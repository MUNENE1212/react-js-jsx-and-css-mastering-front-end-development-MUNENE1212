import React, { useState, useEffect } from 'react';
import Button from './Button';
import { getTasks, createTask, updateTask, deleteTask as deleteTaskAPI } from '../api/backendAPI';

/**
 * Custom hook for managing tasks with backend API
 * Replaces localStorage with MongoDB persistence via Express API
 */
const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch tasks from backend on mount
   */
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Fetch all tasks from API
   */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks('all');
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a new task via API
   * @param {string} text - The task description
   */
  const addTask = async (text) => {
    if (text.trim()) {
      try {
        const newTask = await createTask({ text });
        setTasks([newTask, ...tasks]);
      } catch (err) {
        setError('Failed to create task');
        console.error('Error creating task:', err);
      }
    }
  };

  /**
   * Toggle task completion status via API
   * @param {string} id - Task ID to toggle
   */
  const toggleTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const updatedTask = await updateTask(id, { completed: !task.completed });
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  /**
   * Update task text via API
   * @param {string} id - Task ID to update
   * @param {string} text - New task text
   */
  const updateTaskText = async (id, text) => {
    try {
      const updatedTask = await updateTask(id, { text });
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  /**
   * Delete a task via API
   * @param {string} id - Task ID to delete
   */
  const removeTask = async (id) => {
    try {
      await deleteTaskAPI(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  return { tasks, addTask, toggleTask, updateTaskText, deleteTask: removeTask, loading, error, fetchTasks };
};

/**
 * TaskManager Component
 *
 * A complete task management interface with:
 * - Add new tasks
 * - Mark tasks as complete/incomplete
 * - Delete tasks
 * - Filter tasks (All, Active, Completed)
 * - Backend API persistence (MongoDB)
 * - Task statistics
 *
 * Demonstrates:
 * - useState hook for local state
 * - useEffect for data fetching
 * - Custom hooks (useTaskManager with API calls)
 * - Component composition
 * - Controlled forms
 * - List rendering with keys
 * - Loading and error states
 *
 * @returns {JSX.Element} - TaskManager component
 */
const TaskManager = () => {
  // Use custom hook for task management with backend API
  const { tasks, addTask, toggleTask, updateTaskText, deleteTask, loading, error, fetchTasks } = useTaskManager();
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  // Handle edit mode
  const startEdit = (task) => {
    setEditingTask(task._id);
    setEditText(task.text);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  // Save edited task
  const saveEdit = async (id) => {
    if (editText.trim()) {
      await updateTaskText(id, editText);
      setEditingTask(null);
      setEditText('');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 dark:border-blue-400 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Task Manager</h2>
        <Button variant="secondary" size="sm" onClick={fetchTasks}>
          Refresh
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Task input form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button type="submit" variant="primary">
            Add Task
          </Button>
        </div>
      </form>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      {/* Task list */}
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-4">
            No tasks found
          </li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              {editingTask === task._id ? (
                // Edit mode
                <>
                  <div className="flex items-center gap-3 flex-grow">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-grow px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => saveEdit(task._id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                // View mode
                <>
                  <div className="flex items-center gap-3 flex-grow">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task._id)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span
                      className={`${
                        task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => startEdit(task)}
                      aria-label="Edit task"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteTask(task._id)}
                      aria-label="Delete task"
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>

      {/* Task stats */}
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>
          {tasks.filter((task) => !task.completed).length} tasks remaining
        </p>
      </div>
    </div>
  );
};

export default TaskManager; 
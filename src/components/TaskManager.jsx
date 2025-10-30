import React, { useState } from 'react';
import Button from './Button';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * TaskManager Component
 *
 * A complete task management interface with:
 * - Add new tasks
 * - Mark tasks as complete/incomplete
 * - Delete tasks
 * - Filter tasks (All, Active, Completed)
 * - localStorage persistence
 * - Task statistics
 *
 * Demonstrates:
 * - useState hook for local state
 * - Custom hooks (useLocalStorage for persistence)
 * - Component composition
 * - Controlled forms
 * - List rendering with keys
 *
 * @returns {JSX.Element} - TaskManager component
 */
const TaskManager = () => {
  // Use custom hook for task persistence with localStorage
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  /**
   * Add a new task
   * @param {string} text - The task description
   */
  const addTask = (text) => {
    if (text.trim()) {
      const newTask = {
        id: Date.now(), // Simple ID generation using timestamp
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
    }
  };

  /**
   * Toggle task completion status
   * @param {number} id - Task ID to toggle
   */
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Update task text
   * @param {number} id - Task ID to update
   * @param {string} text - New task text
   */
  const updateTaskText = (id, text) => {
    if (text.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: text.trim() } : task
        )
      );
    }
  };

  /**
   * Delete a task
   * @param {number} id - Task ID to delete
   */
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

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
    setEditingTask(task.id);
    setEditText(task.text);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  // Save edited task
  const saveEdit = (id) => {
    if (editText.trim()) {
      updateTaskText(id, editText);
      setEditingTask(null);
      setEditText('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Task Manager</h2>
      </div>

      {/* Task input form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
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
          All ({tasks.length})
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active ({tasks.filter((t) => !t.completed).length})
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed ({tasks.filter((t) => t.completed).length})
        </Button>
      </div>

      {/* Task list */}
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-8 animate-fade-in">
            {filter === 'all' && tasks.length === 0
              ? 'No tasks yet. Add one above to get started!'
              : `No ${filter} tasks found`}
          </li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors animate-slide-up"
            >
              {editingTask === task.id ? (
                // Edit mode
                <>
                  <div className="flex items-center gap-3 flex-grow">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(task.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="flex-grow px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => saveEdit(task.id)}
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
                      onChange={() => toggleTask(task.id)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span
                      className={`${
                        task.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-800 dark:text-white'
                      } transition-colors`}
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
                      onClick={() => deleteTask(task.id)}
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
      {tasks.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <p>
              {tasks.filter((task) => !task.completed).length} of {tasks.length} tasks remaining
            </p>
            {tasks.filter((task) => task.completed).length > 0 && (
              <button
                onClick={() => setTasks(tasks.filter((task) => !task.completed))}
                className="text-red-600 dark:text-red-400 hover:underline"
              >
                Clear completed
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;

import Task from '../models/Task.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Task Controllers
 * Handle CRUD operations for tasks
 */

/**
 * @desc    Get all tasks for current user
 * @route   GET /api/tasks
 * @access  Private
 */
export const getTasks = asyncHandler(async (req, res) => {
  const { filter } = req.query; // 'all', 'active', 'completed'

  let query = { user: req.userId };

  if (filter === 'active') query.completed = false;
  if (filter === 'completed') query.completed = true;

  const tasks = await Task.find(query).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: tasks.length,
    data: { tasks },
  });
});

/**
 * @desc    Create new task
 * @route   POST /api/tasks
 * @access  Private
 */
export const createTask = asyncHandler(async (req, res) => {
  const { text, priority, dueDate, tags } = req.body;

  const task = await Task.create({
    text,
    priority,
    dueDate,
    tags,
    user: req.userId,
  });

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: { task },
  });
});

/**
 * @desc    Update task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.userId });

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
  }

  const { text, completed, priority, dueDate, tags } = req.body;

  if (text !== undefined) task.text = text;
  if (completed !== undefined) task.completed = completed;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (tags !== undefined) task.tags = tags;

  await task.save();

  res.json({
    success: true,
    message: 'Task updated successfully',
    data: { task },
  });
});

/**
 * @desc    Delete task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
  }

  res.json({
    success: true,
    message: 'Task deleted successfully',
  });
});

/**
 * @desc    Get task statistics
 * @route   GET /api/tasks/stats
 * @access  Private
 */
export const getTaskStats = asyncHandler(async (req, res) => {
  const stats = await Task.getStats(req.userId);

  res.json({
    success: true,
    data: { stats },
  });
});

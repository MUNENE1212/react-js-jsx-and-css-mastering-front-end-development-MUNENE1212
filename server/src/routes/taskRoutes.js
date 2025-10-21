import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} from '../controllers/taskController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

/**
 * Task Routes
 * All routes require authentication
 */

// Apply auth middleware to all routes
router.use(auth);

// Task CRUD operations
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// Task statistics
router.get('/stats/summary', getTaskStats);

export default router;

import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
} from '../controllers/postController.js';
import { auth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * Post Routes
 * Public routes for reading, protected routes for creating/editing
 */

// Public routes (no authentication required)
router.get('/', getPosts); // Get all posts with pagination
router.get('/:id', optionalAuth, getPost); // Get single post

// Protected routes (authentication required)
router.post('/', auth, createPost); // Create new post
router.put('/:id', auth, updatePost); // Update post
router.delete('/:id', auth, deletePost); // Delete post
router.get('/my/posts', auth, getMyPosts); // Get user's posts

export default router;

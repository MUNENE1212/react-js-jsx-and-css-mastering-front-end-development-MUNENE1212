import express from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

/**
 * Authentication Routes
 * Handle user registration, login, and profile management
 */

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/me', auth, getMe);
router.put('/profile', auth, updateProfile);

export default router;

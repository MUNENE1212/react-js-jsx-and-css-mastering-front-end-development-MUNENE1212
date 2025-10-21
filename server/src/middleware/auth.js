import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Authentication Middleware
 *
 * Protects routes by verifying JWT tokens in request headers.
 * Extracts user information from token and attaches to request object.
 *
 * Usage:
 * - Apply to protected routes
 * - Requires Bearer token in Authorization header
 *
 * @example
 * router.get('/protected', auth, controller);
 */

/**
 * Verify JWT token and authenticate user
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No authorization header, access denied',
      });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token payload
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found, token invalid',
      });
    }

    // Attach user to request object for use in route handlers
    req.user = user;
    req.userId = user._id;

    // Continue to next middleware/route handler
    next();

  } catch (error) {
    console.error('Auth middleware error:', error.message);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired, please login again',
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
    });
  }
};

/**
 * Check if user has admin role
 * Must be used after auth middleware
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @example
 * router.delete('/admin/users/:id', auth, isAdmin, controller);
 */
export const isAdmin = (req, res, next) => {
  // Check if user exists (should be set by auth middleware)
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  // Check if user has admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied: Admin privileges required',
    });
  }

  next();
};

/**
 * Optional authentication middleware
 * Attaches user if token is valid, but doesn't require it
 * Useful for routes that work with or without authentication
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (user) {
        req.user = user;
        req.userId = user._id;
      }
    }

    next();
  } catch (error) {
    // Silently continue without authentication
    next();
  }
};

export default auth;

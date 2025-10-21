/**
 * Global Error Handling Middleware
 *
 * Catches and processes errors from throughout the application.
 * Provides consistent error responses to clients.
 *
 * Features:
 * - Handles different types of errors (Mongoose, JWT, Validation, etc.)
 * - Returns consistent error format
 * - Logs errors for debugging
 * - Sanitizes error messages for production
 */

/**
 * Global error handler
 *
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error';
  let errors = null;

  /**
   * Handle Mongoose validation errors
   * Returns field-specific validation messages
   */
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    message = 'Validation failed';
  }

  /**
   * Handle Mongoose duplicate key errors (E11000)
   * Occurs when trying to create document with duplicate unique field
   */
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
  }

  /**
   * Handle Mongoose CastError (invalid ObjectId)
   * Occurs when invalid ID format is provided
   */
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  /**
   * Handle JWT errors
   */
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  /**
   * Send error response
   */
  res.status(statusCode).json({
    success: false,
    message,
    errors,
    // Include stack trace in development mode
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 Not Found handler
 * Catches requests to undefined routes
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

/**
 * Async handler wrapper
 * Eliminates need for try-catch in async route handlers
 *
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Wrapped function
 *
 * @example
 * router.get('/tasks', asyncHandler(async (req, res) => {
 *   const tasks = await Task.find();
 *   res.json(tasks);
 * }));
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default errorHandler;

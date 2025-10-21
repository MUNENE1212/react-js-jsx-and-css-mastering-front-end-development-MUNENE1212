import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import postRoutes from './routes/postRoutes.js';

/**
 * Express Server Configuration
 *
 * Full-featured Express.js REST API server with:
 * - MongoDB database connection
 * - JWT authentication
 * - Security middleware
 * - Rate limiting
 * - Error handling
 * - CORS support
 */

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ========================================
// Middleware
// ========================================

/**
 * Security Middleware
 * - helmet: Sets various HTTP headers for security
 */
app.use(helmet());

/**
 * CORS Configuration
 * Allows requests from the React frontend
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

/**
 * Body Parser
 * Parse JSON request bodies
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * HTTP Request Logger
 * Use 'dev' format in development, 'combined' in production
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

/**
 * Rate Limiting
 * Prevent brute-force attacks and abuse
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all routes
app.use('/api/', limiter);

// ========================================
// Routes
// ========================================

/**
 * Health Check Route
 * Used to verify server is running
 */
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 */
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/tasks', taskRoutes); // Task CRUD routes
app.use('/api/posts', postRoutes); // Post CRUD routes

/**
 * Welcome Route
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to PLP Task Manager API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      tasks: '/api/tasks',
      posts: '/api/posts',
    },
  });
});

// ========================================
// Error Handling
// ========================================

// 404 handler (must come after all routes)
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// ========================================
// Start Server
// ========================================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📡 Listening on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log('='.repeat(50));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('💤 Process terminated');
  });
});

export default app;

import mongoose from 'mongoose';

/**
 * Task Model Schema
 *
 * Defines the structure for Task documents in MongoDB.
 * Each task belongs to a specific user and tracks completion status.
 *
 * Features:
 * - User association for multi-user support
 * - Completion tracking
 * - Timestamps for created/updated
 * - Data validation
 */

const taskSchema = new mongoose.Schema(
  {
    // Task description/text
    text: {
      type: String,
      required: [true, 'Task text is required'],
      trim: true,
      minlength: [1, 'Task text cannot be empty'],
      maxlength: [500, 'Task text cannot exceed 500 characters'],
    },

    // Completion status
    completed: {
      type: Boolean,
      default: false,
    },

    // Reference to user who owns this task
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task must belong to a user'],
    },

    // Priority level (optional future feature)
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },

    // Due date (optional)
    dueDate: {
      type: Date,
      default: null,
    },

    // Tags for categorization (optional)
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

/**
 * Index for faster queries
 * - User index for retrieving all tasks for a specific user
 * - Completed index for filtering by status
 */
taskSchema.index({ user: 1, completed: 1 });
taskSchema.index({ createdAt: -1 }); // Sort by newest first

/**
 * Instance method to toggle completion status
 *
 * @returns {Promise<Task>} - Updated task
 *
 * @example
 * await task.toggleComplete();
 */
taskSchema.methods.toggleComplete = async function () {
  this.completed = !this.completed;
  return await this.save();
};

/**
 * Static method to get user's task statistics
 *
 * @param {ObjectId} userId - User ID
 * @returns {Promise<Object>} - Task statistics
 *
 * @example
 * const stats = await Task.getStats(userId);
 * // { total: 10, completed: 5, active: 5 }
 */
taskSchema.statics.getStats = async function (userId) {
  const total = await this.countDocuments({ user: userId });
  const completed = await this.countDocuments({ user: userId, completed: true });
  const active = total - completed;

  return { total, completed, active };
};

/**
 * Virtual for task age (days since creation)
 */
taskSchema.virtual('age').get(function () {
  const now = new Date();
  const created = this.createdAt;
  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Ensure virtuals are included when converting to JSON
taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

// Create and export Task model
const Task = mongoose.model('Task', taskSchema);

export default Task;

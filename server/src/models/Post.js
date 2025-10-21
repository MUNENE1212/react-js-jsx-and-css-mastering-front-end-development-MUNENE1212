import mongoose from 'mongoose';

/**
 * Post Model Schema
 *
 * Defines the structure for Blog Post documents in MongoDB.
 * Replaces JSONPlaceholder with custom posts stored in database.
 *
 * Features:
 * - User association (author)
 * - Rich content support
 * - Pagination support
 * - Search capabilities
 * - Timestamps
 */

const postSchema = new mongoose.Schema(
  {
    // Post title
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },

    // Post body/content
    body: {
      type: String,
      required: [true, 'Post body is required'],
      trim: true,
      minlength: [10, 'Post body must be at least 10 characters long'],
      maxlength: [5000, 'Post body cannot exceed 5000 characters'],
    },

    // Reference to user who created this post
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must have an author'],
    },

    // Post category (optional)
    category: {
      type: String,
      enum: ['technology', 'lifestyle', 'education', 'business', 'other'],
      default: 'other',
    },

    // Tags for better searchability
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],

    // View count
    views: {
      type: Number,
      default: 0,
    },

    // Published status
    published: {
      type: Boolean,
      default: true,
    },

    // Featured image URL (optional)
    image: {
      type: String,
      default: null,
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

/**
 * Indexes for performance
 * - Author index for retrieving user's posts
 * - Text index for search functionality
 * - Published index for filtering
 */
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ title: 'text', body: 'text' }); // Full-text search
postSchema.index({ published: 1, createdAt: -1 });

/**
 * Instance method to increment view count
 *
 * @returns {Promise<Post>} - Updated post
 *
 * @example
 * await post.incrementViews();
 */
postSchema.methods.incrementViews = async function () {
  this.views += 1;
  return await this.save();
};

/**
 * Static method to search posts by query
 *
 * @param {string} query - Search query
 * @param {Object} options - Pagination options
 * @returns {Promise<Array>} - Matching posts
 *
 * @example
 * const posts = await Post.search('react', { limit: 10, page: 1 });
 */
postSchema.statics.search = async function (query, options = {}) {
  const { limit = 10, page = 1 } = options;
  const skip = (page - 1) * limit;

  return await this.find(
    { $text: { $search: query }, published: true },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(limit)
    .populate('author', 'name email avatar');
};

/**
 * Static method to get paginated posts
 *
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} - Posts and pagination info
 *
 * @example
 * const result = await Post.paginate({ page: 1, limit: 10 });
 */
postSchema.statics.paginate = async function (options = {}) {
  const { page = 1, limit = 10, filter = {} } = options;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    this.find({ published: true, ...filter })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email avatar'),
    this.countDocuments({ published: true, ...filter }),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasMore: skip + posts.length < total,
    },
  };
};

/**
 * Pre-save middleware to update timestamps
 */
postSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isModified('body')) {
    this.updatedAt = Date.now();
  }
  next();
});

// Create and export Post model
const Post = mongoose.model('Post', postSchema);

export default Post;

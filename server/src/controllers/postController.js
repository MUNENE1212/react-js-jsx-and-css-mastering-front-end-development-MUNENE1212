import Post from '../models/Post.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Post Controllers
 * Handle CRUD operations for blog posts
 */

/**
 * @desc    Get all posts with pagination
 * @route   GET /api/posts
 * @access  Public
 */
export const getPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  let result;

  if (search) {
    // Search posts
    const posts = await Post.search(search, {
      page: parseInt(page),
      limit: parseInt(limit),
    });
    result = { posts, pagination: { page, limit, total: posts.length } };
  } else {
    // Get paginated posts
    result = await Post.paginate({
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  res.json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Get single post
 * @route   GET /api/posts/:id
 * @access  Public
 */
export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    'author',
    'name email avatar'
  );

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found',
    });
  }

  // Increment views
  await post.incrementViews();

  res.json({
    success: true,
    data: { post },
  });
});

/**
 * @desc    Create new post
 * @route   POST /api/posts
 * @access  Private
 */
export const createPost = asyncHandler(async (req, res) => {
  const { title, body, category, tags, image } = req.body;

  const post = await Post.create({
    title,
    body,
    category,
    tags,
    image,
    author: req.userId,
  });

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: { post },
  });
});

/**
 * @desc    Update post
 * @route   PUT /api/posts/:id
 * @access  Private
 */
export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.id,
    author: req.userId,
  });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found or unauthorized',
    });
  }

  const { title, body, category, tags, image, published } = req.body;

  if (title) post.title = title;
  if (body) post.body = body;
  if (category) post.category = category;
  if (tags) post.tags = tags;
  if (image !== undefined) post.image = image;
  if (published !== undefined) post.published = published;

  await post.save();

  res.json({
    success: true,
    message: 'Post updated successfully',
    data: { post },
  });
});

/**
 * @desc    Delete post
 * @route   DELETE /api/posts/:id
 * @access  Private
 */
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    author: req.userId,
  });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found or unauthorized',
    });
  }

  res.json({
    success: true,
    message: 'Post deleted successfully',
  });
});

/**
 * @desc    Get posts by current user
 * @route   GET /api/posts/my/posts
 * @access  Private
 */
export const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.userId }).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: posts.length,
    data: { posts },
  });
});

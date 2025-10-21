import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Card from './Card';

/**
 * PostForm Component
 *
 * Form for creating and editing blog posts.
 * Handles both create and update modes.
 *
 * @param {Object} props - Component props
 * @param {Object} props.post - Existing post to edit (null for create mode)
 * @param {Function} props.onSubmit - Submit handler
 * @param {Function} props.onCancel - Cancel handler
 * @returns {JSX.Element} - PostForm component
 */
const PostForm = ({ post = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    category: 'technology',
    tags: '',
  });
  const [loading, setLoading] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        body: post.body || '',
        category: post.category || 'technology',
        tags: post.tags ? post.tags.join(', ') : '',
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      title: formData.title,
      body: formData.body,
      category: formData.category,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    };

    await onSubmit(postData);
    setLoading(false);

    // Reset form if creating new post
    if (!post) {
      setFormData({
        title: '',
        body: '',
        category: 'technology',
        tags: '',
      });
    }
  };

  return (
    <Card variant="elevated" className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {post ? 'Edit Post' : 'Create New Post'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={200}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter post title..."
          />
        </div>

        {/* Body */}
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Content
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={5000}
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
            placeholder="Write your post content..."
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
            <option value="business">Business</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="react, javascript, tutorial"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Separate multiple tags with commas
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

PostForm.propTypes = {
  post: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PostForm;

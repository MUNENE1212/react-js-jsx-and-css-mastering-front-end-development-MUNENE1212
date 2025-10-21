import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * User Model Schema
 *
 * Defines the structure and methods for User documents in MongoDB.
 * Handles authentication, password hashing, and JWT token generation.
 *
 * Features:
 * - Secure password hashing with bcrypt
 * - JWT token generation
 * - Email validation
 * - Timestamps for created/updated
 */

const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },

    // User's email (used for login)
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },

    // User's hashed password
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Don't return password in queries by default
    },

    // User role (for future authorization features)
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    // User profile picture URL (optional)
    avatar: {
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
 * Pre-save middleware to hash password before saving
 *
 * Only hashes the password if it has been modified (or is new)
 * Uses bcrypt with salt rounds of 10 for security
 */
userSchema.pre('save', async function (next) {
  // Only hash password if it has been modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Instance method to compare password for login
 *
 * @param {string} candidatePassword - Password to compare
 * @returns {Promise<boolean>} - True if passwords match
 *
 * @example
 * const isMatch = await user.comparePassword('userPassword123');
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

/**
 * Instance method to generate JWT token
 *
 * @returns {string} - Signed JWT token
 *
 * @example
 * const token = user.generateAuthToken();
 */
userSchema.methods.generateAuthToken = function () {
  // Create payload with user information
  const payload = {
    id: this._id,
    email: this.email,
    name: this.name,
    role: this.role,
  };

  // Sign and return JWT token
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Instance method to get public user profile
 * Returns user object without sensitive information
 *
 * @returns {Object} - Public user profile
 */
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

// Create and export User model
const User = mongoose.model('User', userSchema);

export default User;

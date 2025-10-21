import mongoose from 'mongoose';

/**
 * MongoDB Database Configuration
 *
 * Handles connection to MongoDB using Mongoose ODM.
 * Supports both local MongoDB and MongoDB Atlas.
 *
 * Environment Variables Required:
 * - MONGODB_URI: MongoDB connection string
 */

/**
 * Connect to MongoDB database
 *
 * Features:
 * - Automatic reconnection
 * - Connection pooling
 * - Error handling
 * - Connection event listeners
 *
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // MongoDB connection options
    const options = {
      // Use new URL parser
      useNewUrlParser: true,
      // Use new unified topology engine
      useUnifiedTopology: true,
      // Maximum number of sockets available for connection pool
      maxPoolSize: 10,
      // Server selection timeout
      serverSelectionTimeoutMS: 5000,
      // Socket timeout
      socketTimeoutMS: 45000,
    };

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('🔗 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 Mongoose disconnected from MongoDB');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🛑 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB
 * Useful for testing or graceful shutdowns
 *
 * @returns {Promise<void>}
 */
export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};

export default connectDB;

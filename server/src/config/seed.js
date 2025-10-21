import dotenv from 'dotenv';
import connectDB from './database.js';
import User from '../models/User.js';
import Task from '../models/Task.js';
import Post from '../models/Post.js';

/**
 * Database Seed Script
 *
 * Populates the database with sample data for testing.
 * Run with: npm run seed
 *
 * Creates:
 * - Sample users
 * - Sample tasks
 * - Sample blog posts
 */

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    await Post.deleteMany({});

    console.log('👤 Creating sample users...');
    // Create sample users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password123',
      },
    ]);

    console.log(`✅ Created ${users.length} users`);

    console.log('✅ Creating sample tasks...');
    // Create sample tasks
    const tasks = await Task.create([
      {
        text: 'Complete React assignment',
        completed: false,
        user: users[0]._id,
        priority: 'high',
      },
      {
        text: 'Study MongoDB',
        completed: true,
        user: users[0]._id,
        priority: 'medium',
      },
      {
        text: 'Build Express API',
        completed: false,
        user: users[0]._id,
        priority: 'high',
      },
      {
        text: 'Learn Tailwind CSS',
        completed: true,
        user: users[1]._id,
      },
      {
        text: 'Practice JavaScript',
        completed: false,
        user: users[1]._id,
      },
    ]);

    console.log(`✅ Created ${tasks.length} tasks`);

    console.log('📝 Creating sample posts...');
    // Create sample posts
    const posts = await Post.create([
      {
        title: 'Introduction to MERN Stack',
        body: 'The MERN stack is a popular web development stack consisting of MongoDB, Express.js, React, and Node.js. It allows developers to build full-stack applications using JavaScript throughout.',
        author: users[0]._id,
        category: 'technology',
        tags: ['mern', 'javascript', 'web-development'],
        published: true,
      },
      {
        title: 'Getting Started with React Hooks',
        body: 'React Hooks revolutionized how we write React components. In this post, we explore useState, useEffect, and custom hooks to build powerful functional components.',
        author: users[0]._id,
        category: 'technology',
        tags: ['react', 'hooks', 'frontend'],
        published: true,
      },
      {
        title: 'MongoDB Best Practices',
        body: 'Learn about schema design, indexing strategies, and performance optimization techniques for MongoDB databases in production applications.',
        author: users[1]._id,
        category: 'technology',
        tags: ['mongodb', 'database', 'backend'],
        published: true,
      },
      {
        title: 'Building RESTful APIs with Express',
        body: 'Express.js makes it easy to build robust RESTful APIs. This guide covers routing, middleware, error handling, and authentication patterns.',
        author: users[1]._id,
        category: 'technology',
        tags: ['express', 'api', 'nodejs'],
        published: true,
      },
      {
        title: 'Tailwind CSS Tips and Tricks',
        body: 'Discover utility-first CSS with Tailwind. Learn how to build beautiful, responsive interfaces quickly using Tailwinds powerful utility classes.',
        author: users[2]._id,
        category: 'technology',
        tags: ['tailwind', 'css', 'design'],
        published: true,
      },
      {
        title: 'Authentication with JWT',
        body: 'Implement secure authentication in your MERN applications using JSON Web Tokens. Learn about token generation, validation, and best security practices.',
        author: users[2]._id,
        category: 'technology',
        tags: ['jwt', 'authentication', 'security'],
        published: true,
      },
    ]);

    console.log(`✅ Created ${posts.length} posts`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Tasks: ${tasks.length}`);
    console.log(`   Posts: ${posts.length}`);
    console.log('\n🔐 Test Credentials:');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');
    console.log('\n   Email: jane@example.com');
    console.log('   Password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();

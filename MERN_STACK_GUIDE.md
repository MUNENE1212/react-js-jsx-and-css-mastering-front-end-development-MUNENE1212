# 🚀 MERN Stack - Complete Implementation Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [API Documentation](#api-documentation)
- [Frontend Integration](#frontend-integration)
- [Authentication Flow](#authentication-flow)
- [Testing](#testing)
- [Deployment](#deployment)

---

## 🌟 Overview

This is a **full-stack MERN application** featuring:
- **MongoDB**: NoSQL database
- **Express.js**: Backend REST API
- **React**: Frontend SPA
- **Node.js**: Runtime environment

### Key Features
✅ User authentication with JWT
✅ Task management system
✅ Blog posts with pagination
✅ Protected routes
✅ Real-time data persistence
✅ Responsive design
✅ Dark/light theme

---

## 🛠️ Tech Stack

### Backend
- **Express.js** 4.19.2 - Web framework
- **Mongoose** 8.7.3 - MongoDB ODM
- **bcryptjs** 2.4.3 - Password hashing
- **jsonwebtoken** 9.0.2 - JWT authentication
- **cors** 2.8.5 - Cross-origin resource sharing
- **helmet** 8.0.0 - Security headers
- **morgan** 1.10.0 - HTTP request logger
- **express-validator** 7.2.0 - Input validation
- **express-rate-limit** 7.4.1 - Rate limiting

### Frontend
- **React** 18.3.1
- **React Router** 7.1.3
- **Tailwind CSS** 3.4.17
- **Vite** 6.0.7

---

## 📁 Project Structure

```
.
├── server/                    # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js   # MongoDB connection
│   │   │   └── seed.js       # Database seeding
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── taskController.js
│   │   │   └── postController.js
│   │   ├── middleware/
│   │   │   ├── auth.js       # JWT verification
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Task.js
│   │   │   └── Post.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── postRoutes.js
│   │   └── server.js         # Express app
│   ├── .env                  # Environment variables
│   └── package.json
│
├── src/                       # Frontend (React)
│   ├── api/
│   │   └── backendAPI.js     # Backend API client
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── TaskManager.jsx
│   │   └── ThemeSwitcher.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx   # (To be created)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx          # (To be created)
│   │   ├── Register.jsx       # (To be created)
│   │   ├── TasksPage.jsx
│   │   └── Posts.jsx
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1. Install MongoDB

**Option A: Local MongoDB**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Update `.env` file

### 2. Configure Environment

Update `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/plp-task-manager
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### 3. Install & Run Backend

```bash
# Navigate to server directory
cd server

# Install dependencies (already done)
npm install

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

Server runs on: `http://localhost:5000`

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id", "name", "email", "role" },
    "token": "jwt-token-here"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt-token-here"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": { "user": { ... } }
}
```

### Task Endpoints (Protected)

#### Get All Tasks
```http
GET /api/tasks?filter=all
Authorization: Bearer {token}

Query params:
- filter: 'all' | 'active' | 'completed'

Response (200):
{
  "success": true,
  "count": 5,
  "data": { "tasks": [...] }
}
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Complete assignment",
  "priority": "high"
}

Response (201):
{
  "success": true,
  "data": { "task": {...} }
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer {token}

{
  "completed": true
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Task deleted"
}
```

### Post Endpoints

#### Get Posts (Public)
```http
GET /api/posts?page=1&limit=10&search=react

Query params:
- page: number (default: 1)
- limit: number (default: 10)
- search: string (optional)

Response (200):
{
  "success": true,
  "data": {
    "posts": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

#### Create Post (Protected)
```http
POST /api/posts
Authorization: Bearer {token}

{
  "title": "My Blog Post",
  "body": "Post content...",
  "category": "technology",
  "tags": ["react", "javascript"]
}
```

---

## 🔐 Authentication Flow

### 1. User Registration/Login
```
User submits credentials
    ↓
Backend validates
    ↓
Password hashed (bcrypt)
    ↓
User saved to MongoDB
    ↓
JWT token generated
    ↓
Token sent to frontend
    ↓
Frontend stores in localStorage
```

### 2. Protected Requests
```
Frontend includes token in header:
Authorization: Bearer {token}
    ↓
Backend auth middleware verifies
    ↓
User attached to req.user
    ↓
Controller accesses req.user
```

---

## 🧪 Testing

### Test Backend API

#### 1. Health Check
```bash
curl http://localhost:5000/health
```

#### 2. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"pass123"}'
```

#### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

#### 4. Get Tasks (with token)
```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Sample Credentials (from seed)
```
Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123
```

---

## 🔄 Frontend Integration

### Next Steps (To be implemented)

1. **Create AuthContext** (`src/context/AuthContext.jsx`)
   - Manage authentication state
   - Store JWT token
   - Provide login/logout functions

2. **Create Backend API Client** (`src/api/backendAPI.js`)
   - Replace JSONPlaceholder
   - Connect to Express API
   - Include JWT in requests

3. **Create Login/Register Pages**
   - Authentication forms
   - Token storage
   - Redirect after login

4. **Update TaskManager**
   - Replace localStorage with API calls
   - Create, update, delete tasks via API

5. **Update Posts Page**
   - Fetch from backend instead of JSONPlaceholder
   - Support authenticated post creation

6. **Add Protected Routes**
   - Redirect to login if not authenticated
   - Show different UI for logged-in users

---

## 📦 Quick Start Commands

### Backend
```bash
cd server
npm install          # Install dependencies
npm run seed         # Seed database
npm run dev          # Start dev server (port 5000)
npm start            # Start production server
```

### Frontend
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
```

### Full Stack
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
npm run dev
```

---

## 🚀 Deployment

### Backend (Heroku example)
```bash
cd server
heroku create plp-task-manager-api
heroku config:set MONGODB_URI="your-mongo-atlas-url"
heroku config:set JWT_SECRET="your-secret"
git push heroku main
```

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

---

## 📝 Notes

### Security Considerations
✅ Passwords hashed with bcrypt
✅ JWT tokens for stateless auth
✅ CORS configured
✅ Helmet for security headers
✅ Rate limiting enabled
✅ Input validation
✅ MongoDB injection prevention

### Database Models

**User**
- name, email, password (hashed)
- role (user/admin)
- timestamps

**Task**
- text, completed, priority
- user reference
- timestamps

**Post**
- title, body, category, tags
- author reference
- views, published
- timestamps

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ RESTful API design
- ✅ MongoDB schema modeling
- ✅ JWT authentication
- ✅ Express middleware
- ✅ Error handling
- ✅ Database relationships
- ✅ MVC architecture
- ✅ Security best practices

---

**Backend Status:** ✅ Complete
**Frontend Integration:** ⏳ In Progress
**Documentation:** ✅ Complete

---

For questions or issues, refer to the main README.md

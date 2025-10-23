# 🎯 PLP Task Manager - Full-Stack MERN Application

A comprehensive full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features JWT authentication, real-time task management, blog posts, and a responsive UI with dark/light theme support.

## 🌟 Features

### ✅ Authentication & Security
- User registration and login with JWT authentication
- Password hashing with bcrypt
- Protected routes and middleware
- Token-based session management
- Secure API endpoints with validation

### ✅ Task Management
- Create, read, update, and delete tasks
- Mark tasks as completed/incomplete
- Filter tasks (All, Active, Completed)
- Real-time data persistence with MongoDB
- User-specific task isolation

### ✅ Blog Posts
- Public post browsing with pagination
- Search functionality
- Authenticated users can create posts
- Rich content display with categories and tags

### 🎨 User Experience
- Responsive design (mobile, tablet, desktop)
- Dark/light theme toggle with persistence
- Smooth animations and transitions
- Loading states and error handling
- Intuitive navigation with React Router

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library with hooks
- **React Router 7.1.3** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first styling
- **Vite 6.0.7** - Fast build tool and dev server

### Backend
- **Node.js** with **Express.js 4.19.2** - REST API server
- **MongoDB** with **Mongoose 8.7.3** - Database and ODM
- **JWT 9.0.2** - Authentication tokens
- **bcryptjs 2.4.3** - Password hashing

### Security & Tools
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **Input Validation** - Data sanitization

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd react-js-jsx-and-css-mastering-front-end-development-MUNENE1212
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp server/.env.example server/.env
   ```

   Update `server/.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/plp-task-manager
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

5. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod

   # Or use MongoDB Atlas (cloud) - update MONGODB_URI accordingly
   ```

6. **Seed the database** (Optional - adds sample users and data)
   ```bash
   cd server
   npm run seed
   cd ..
   ```

7. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

## 🔑 Test Credentials

After seeding the database, use these credentials:

```
Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123
```

## 📱 Usage

### User Registration
1. Visit `http://localhost:3000`
2. Click "Sign Up" in the navigation
3. Fill out the registration form
4. You'll be automatically logged in and redirected to tasks

### Task Management
1. After login, navigate to `/tasks`
2. Add new tasks using the input field
3. Click tasks to mark as complete/incomplete
4. Use filter buttons (All, Active, Completed)
5. Delete tasks with the × button

### Blog Posts
1. Visit `/posts` (public access)
2. Browse posts with pagination
3. Use search to filter posts
4. Logged-in users can create new posts

### Theme Switching
- Click the theme toggle button in the navbar
- Choice persists across sessions

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)

### Tasks (Protected)
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Posts
- `GET /api/posts` - Get posts (public)
- `POST /api/posts` - Create post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)

## 🧪 Testing

### API Testing with cURL

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Frontend Testing
1. **Public Access:** Verify home and posts pages load without authentication
2. **Authentication:** Test registration and login flows
3. **Protected Routes:** Confirm `/tasks` redirects to login when not authenticated
4. **Task CRUD:** Create, update, delete tasks and verify persistence
5. **Responsive Design:** Test on different screen sizes
6. **Theme Toggle:** Verify theme switching and persistence

## 📁 Project Structure

```
├── server/                    # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── config/           # Database and seed configuration
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth and error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API route definitions
│   │   └── server.js        # Express app entry point
│   ├── .env                 # Environment variables
│   └── package.json
├── src/                      # Frontend (React)
│   ├── api/                 # API client functions
│   ├── components/          # Reusable UI components
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component
│   ├── index.css            # Global styles
│   └── main.jsx             # React entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Frontend dependencies
├── vite.config.js           # Vite configuration
└── README.md
```

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
cd server
heroku create your-app-name-api
heroku config:set MONGODB_URI="your-mongo-atlas-connection-string"
heroku config:set JWT_SECRET="your-production-jwt-secret"
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
npm run build
vercel --prod
```

Update `server/.env` CLIENT_URL to your deployed frontend URL.

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or update connection string for Atlas
- Check network connectivity for cloud databases

**401 Unauthorized:**
- Clear browser localStorage and re-login
- Verify JWT token hasn't expired

**Port Already in Use:**
```bash
# Kill process on port 3000
sudo lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
sudo lsof -ti:5000 | xargs kill -9
```

**Tasks Not Loading:**
- Confirm backend is running on port 5000
- Check browser console for errors
- Verify user is authenticated

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## 👤 Author

Built for PLP Academy Week 3 Assignment - Full-Stack MERN Implementation

## 📄 License

This project is for educational purposes as part of the PLP curriculum.
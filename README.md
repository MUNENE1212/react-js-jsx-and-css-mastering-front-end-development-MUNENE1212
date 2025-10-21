# 🎯 PLP Task Manager - React + Tailwind CSS

A modern, fully-featured task management application built with React 18, Tailwind CSS, and Vite. This project demonstrates best practices in component architecture, state management, API integration, and responsive design.

## 🌟 Features

### ✅ Task Management
- **Create Tasks**: Add new tasks with a simple, intuitive interface
- **Mark Complete**: Check off completed tasks with visual feedback
- **Delete Tasks**: Remove tasks you no longer need
- **Filter Tasks**: View All, Active, or Completed tasks
- **Persistent Storage**: Tasks automatically saved to localStorage

### 🌐 API Integration
- **JSONPlaceholder Integration**: Fetch real data from external API
- **Pagination**: Navigate through posts with page controls
- **Search Functionality**: Filter posts by title or content
- **Loading States**: Elegant loading indicators
- **Error Handling**: Graceful error messages with retry functionality

### 🎨 Theme Switching
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Persistent Preference**: Theme choice saved to localStorage
- **System-wide**: Theme applies across all components

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layout for medium screens
- **Desktop Ready**: Full-featured desktop experience
- **Responsive Navigation**: Hamburger menu on mobile

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd react-js-jsx-and-css-mastering-front-end-development-MUNENE1212
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── api/                    # API integration functions
│   └── jsonPlaceholder.js  # JSONPlaceholder API client
├── components/             # Reusable UI components
│   ├── Button.jsx          # Customizable button component
│   ├── Card.jsx            # Container card component
│   ├── Footer.jsx          # Application footer
│   ├── Layout.jsx          # Page layout wrapper
│   ├── Navbar.jsx          # Navigation bar with mobile menu
│   ├── TaskManager.jsx     # Task management component
│   └── ThemeSwitcher.jsx   # Dark/light mode toggle
├── context/                # React context providers
│   └── ThemeContext.jsx    # Theme state management
├── hooks/                  # Custom React hooks
│   └── useLocalStorage.js  # localStorage persistence hook
├── pages/                  # Page components
│   ├── Home.jsx            # Landing page
│   ├── Posts.jsx           # API posts display
│   └── TasksPage.jsx       # Task management page
├── utils/                  # Utility functions (future use)
├── App.jsx                 # Main app with routing
├── index.css               # Global styles + Tailwind
└── main.jsx                # React entry point
```

## 🛠️ Technologies Used

### Core
- **React 18.3.1** - UI library
- **Vite 6.0.7** - Build tool and dev server
- **React Router 7.1.3** - Client-side routing

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS 8.4.49** - CSS transformations
- **Autoprefixer 10.4.20** - Vendor prefix automation

### Development
- **@vitejs/plugin-react 4.3.4** - Vite React plugin
- **PropTypes 15.8.1** - Runtime type checking

## 📚 Component Documentation

### Button Component
Reusable button with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `onClick`: function
- `children`: ReactNode

**Example:**
```jsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

### Card Component
Container component for boxed content with optional header and footer.

**Props:**
- `variant`: 'default' | 'bordered' | 'elevated'
- `header`: ReactNode
- `footer`: ReactNode
- `hoverable`: boolean
- `children`: ReactNode

**Example:**
```jsx
<Card
  variant="elevated"
  header={<h2>Title</h2>}
  footer={<p>Footer content</p>}
  hoverable
>
  <p>Card content</p>
</Card>
```

### useLocalStorage Hook
Custom hook for persisting state to localStorage.

**Parameters:**
- `key`: string - localStorage key
- `initialValue`: any - default value if none exists

**Returns:**
- `[value, setValue]` - stateful value and setter (like useState)

**Example:**
```jsx
const [tasks, setTasks] = useLocalStorage('tasks', []);
```

## 🎨 Styling Guide

### Tailwind Configuration
Custom animations and dark mode configured in `tailwind.config.js`:
- `animate-fade-in` - Fade in animation
- `animate-slide-up` - Slide up animation
- `animate-slide-down` - Slide down animation
- `animate-bounce-in` - Bounce in animation

### Dark Mode
Uses class-based dark mode (`darkMode: 'class'`). Toggle with ThemeSwitcher component.

## 🔌 API Integration

### JSONPlaceholder API
Functions available in `src/api/jsonPlaceholder.js`:

- `fetchPosts(limit)` - Get all posts
- `fetchPostById(id)` - Get single post
- `fetchPostsPaginated(page, limit)` - Get paginated posts
- `searchPosts(query)` - Search posts
- `fetchUsers()` - Get all users
- `fetchCommentsByPostId(postId)` - Get post comments

**Example:**
```jsx
import { fetchPostsPaginated } from '../api/jsonPlaceholder';

const posts = await fetchPostsPaginated(1, 10);
```

## 🧪 Testing the Application

1. **Task Management**
   - Navigate to `/tasks`
   - Add, complete, and delete tasks
   - Test filtering (All, Active, Completed)
   - Refresh page to verify localStorage persistence

2. **API Integration**
   - Navigate to `/posts`
   - Test pagination controls
   - Use search feature
   - Verify loading and error states

3. **Theme Switching**
   - Toggle theme switcher in navbar
   - Verify theme persists across page refreshes
   - Check all pages render correctly in both themes

4. **Responsive Design**
   - Test on mobile viewport (< 768px)
   - Test on tablet viewport (768px - 1024px)
   - Test on desktop viewport (> 1024px)
   - Verify mobile menu works correctly

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts:
# "deploy": "gh-pages -d dist"
npm run build
npm run deploy
```

## 📝 Assignment Completion Checklist

- ✅ React project with Vite setup
- ✅ Tailwind CSS configured
- ✅ Project structure (components, pages, hooks, context, api, utils)
- ✅ React Router configured
- ✅ Reusable components (Button, Card, Navbar, Footer, Layout)
- ✅ Task Manager with add, complete, delete, filter
- ✅ useState for component state
- ✅ useEffect for side effects
- ✅ useContext for theme management
- ✅ Custom useLocalStorage hook
- ✅ API integration with JSONPlaceholder
- ✅ Loading and error states
- ✅ Pagination implementation
- ✅ Search functionality
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/light theme toggle
- ✅ Custom animations and transitions
- ✅ Well-commented code
- ✅ Comprehensive documentation

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Component-based architecture
- ✅ Props and state management
- ✅ React hooks (useState, useEffect, useContext, custom hooks)
- ✅ Context API for global state
- ✅ Client-side routing with React Router
- ✅ API integration and async operations
- ✅ localStorage for data persistence
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode implementation
- ✅ Error handling and loading states
- ✅ Code organization and best practices

## 📖 Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

## 👤 Author

Built with ❤️ for PLP Academy Week 3 Assignment

## 📄 License

This project is for educational purposes as part of the PLP curriculum.

---

## 🎉 BONUS: Full MERN Stack Implementation

This project has been **enhanced with a complete backend**! 🚀

### Backend Features
- ✅ **Express.js REST API** - Professional API server
- ✅ **MongoDB Database** - Persistent data storage
- ✅ **JWT Authentication** - Secure user authentication
- ✅ **Complete CRUD** - Tasks and Posts APIs
- ✅ **Security** - Helmet, CORS, rate limiting
- ✅ **Sample Data** - Pre-seeded with test users

### Quick Start - Full Stack

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm run seed    # Load test data
npm run dev     # Start on port 5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev     # Start on port 3000
```

### Test Credentials
```
Email: john@example.com
Password: password123
```

### 📡 API Endpoints
- POST `/api/auth/register` - Register
- POST `/api/auth/login` - Login
- GET `/api/tasks` - Get tasks (auth required)
- POST `/api/tasks` - Create task (auth required)
- GET `/api/posts?page=1&limit=10` - Get posts
- POST `/api/posts` - Create post (auth required)

### 📚 Full Documentation
See **[MERN_STACK_GUIDE.md](./MERN_STACK_GUIDE.md)** for complete API docs, authentication flow, and deployment guide.

---

**Frontend Build:** ✅ Passing
**Backend API:** ✅ Complete
**MongoDB:** ✅ Ready
**Documentation:** ✅ Comprehensive 
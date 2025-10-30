# React.js, JSX, and Tailwind CSS - Task Manager

A modern, responsive React application built with Tailwind CSS that demonstrates component architecture, state management, hooks usage, and API integration.

## Live Demo

**[View Live Application](https://week3-teal-rho.vercel.app/)**

## Features

### Task Management
- Add, complete, and delete tasks
- Filter tasks (All, Active, Completed)
- Edit task text inline
- Clear completed tasks
- Persistent storage using localStorage
- Task statistics and counts

### API Integration
- Fetch posts from JSONPlaceholder API
- Pagination with page controls
- Search functionality to filter posts
- Loading states with spinner
- Error handling with user-friendly messages
- Responsive grid layout

### Theme Switching
- Dark/Light mode toggle
- Persistent theme preference in localStorage
- Smooth transitions between themes
- System-wide theme application

### Responsive Design
- Mobile-first approach
- Adaptive layouts for mobile, tablet, and desktop
- Responsive navigation with hamburger menu
- Touch-friendly interactive elements

## Technologies

- **React 18.3.1** - UI library with hooks
- **Vite 6.0.7** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Router 7.1.3** - Client-side routing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd react-js-jsx-and-css-mastering-front-end-development-MUNENE1212
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

4. Build for production
   ```bash
   npm run build
   ```

5. Preview production build
   ```bash
   npm run preview
   ```

## Project Structure

```
├── src/
│   ├── api/
│   │   └── jsonPlaceholder.js     # API client for JSONPlaceholder
│   ├── components/
│   │   ├── Button.jsx             # Reusable button component
│   │   ├── Card.jsx               # Container card component
│   │   ├── Footer.jsx             # Footer with links
│   │   ├── Layout.jsx             # Page layout wrapper
│   │   ├── Navbar.jsx             # Responsive navigation
│   │   ├── TaskManager.jsx        # Task management component
│   │   └── ThemeSwitcher.jsx      # Dark/light mode toggle
│   ├── context/
│   │   └── ThemeContext.jsx       # Theme state management
│   ├── hooks/
│   │   └── useLocalStorage.js     # Custom localStorage hook
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── Posts.jsx              # API posts display
│   │   └── TasksPage.jsx          # Task manager page
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles with Tailwind
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies
```

## Component Documentation

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

### useLocalStorage Hook
Custom hook for persisting state to localStorage.

**Example:**
```jsx
const [tasks, setTasks] = useLocalStorage('tasks', []);
```

## Tailwind CSS Features

### Custom Animations
- `animate-fade-in` - Fade in animation
- `animate-slide-up` - Slide up animation
- `animate-slide-down` - Slide down animation
- `animate-bounce-in` - Bounce in animation

### Dark Mode
Dark mode is implemented using class-based theme switching (`darkMode: 'class'`). The theme preference is stored in localStorage.

## Assignment Completion Checklist

- ✅ **Task 1: Project Setup**
  - React app with Vite
  - Tailwind CSS configured
  - Project structure with components, pages, hooks, context, api folders
  - React Router configured

- ✅ **Task 2: Component Architecture**
  - Reusable Button component (primary, secondary, danger variants)
  - Card component for boxed layouts
  - Navbar component with responsive navigation
  - Footer component with links
  - Layout component wrapping Navbar and Footer
  - Props for customization

- ✅ **Task 3: State Management and Hooks**
  - TaskManager with add, complete, delete, filter functionality
  - `useState` for component state
  - `useEffect` for side effects
  - `useContext` for theme management
  - Custom `useLocalStorage` hook for task persistence

- ✅ **Task 4: API Integration**
  - JSONPlaceholder API integration
  - Posts displayed in grid layout
  - Loading and error states
  - Pagination implementation
  - Search feature for filtering

- ✅ **Task 5: Styling with Tailwind CSS**
  - Responsive design (mobile, tablet, desktop)
  - Theme switcher with dark/light modes
  - Tailwind utility classes throughout
  - Custom animations and transitions

## Testing the Application

1. **Task Manager** (`/tasks`)
   - Add tasks using the input form
   - Mark tasks complete/incomplete with checkbox
   - Edit tasks by clicking "Edit" button
   - Delete tasks with "Delete" button
   - Filter using All/Active/Completed buttons
   - Clear completed tasks
   - Refresh page to verify localStorage persistence

2. **API Integration** (`/posts`)
   - View posts from JSONPlaceholder
   - Use search to filter by title
   - Navigate pages using Previous/Next buttons
   - Check loading spinner on page change
   - Verify error handling

3. **Theme Switching**
   - Toggle theme using sun/moon icon
   - Verify theme persists across refreshes
   - Check all pages render correctly in both themes

4. **Responsive Design**
   - Test mobile viewport (< 768px)
   - Test tablet viewport (768px - 1024px)
   - Test desktop viewport (> 1024px)
   - Verify mobile menu works

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions on deploying to Vercel.

## Learning Outcomes

This project demonstrates:
- Component-based architecture
- Props and state management
- React hooks (useState, useEffect, useContext, custom hooks)
- Context API for global state
- Client-side routing
- API integration and async operations
- localStorage for data persistence
- Responsive design with Tailwind CSS
- Dark mode implementation
- Error handling and loading states

## Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

## Author

Built for PLP Academy Week 3 Assignment

## License

This project is for educational purposes as part of the PLP curriculum.

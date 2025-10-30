# Deployment Guide - Vercel

This guide will walk you through deploying your React + Tailwind CSS application to Vercel.

## Prerequisites

- A GitHub account
- Your project pushed to a GitHub repository
- A Vercel account (free tier works perfectly)

## Step-by-Step Deployment

### Step 1: Prepare Your Project

1. **Ensure your project is built successfully**
   ```bash
   npm run build
   ```
   This should create a `dist` folder with your production files.

2. **Test the production build locally**
   ```bash
   npm run preview
   ```
   Verify everything works correctly.

3. **Commit all changes to Git**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended for easy integration)
4. Authorize Vercel to access your GitHub account

### Step 3: Import Your Project

1. After signing in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find your repository: `react-js-jsx-and-css-mastering-front-end-development-MUNENE1212`
4. Click **"Import"** next to it

### Step 4: Configure Project Settings

Vercel will automatically detect that you're using Vite. The default settings should work:

- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (or leave as default)
- **Output Directory**: `dist` (or leave as default)
- **Install Command**: `npm install` (or leave as default)

### Step 5: Deploy

1. Click **"Deploy"** button
2. Vercel will:
   - Install dependencies (`npm install`)
   - Build your project (`npm run build`)
   - Deploy to their global CDN
3. Wait 1-2 minutes for the deployment to complete

### Step 6: Get Your Live URL

1. Once deployment is complete, you'll see: **"Congratulations! Your project has been deployed."**
2. Your app will be live at: `https://your-project-name.vercel.app`
3. Copy this URL

### Step 7: Add Deployment URL to README

1. Open your README.md file
2. Add a "Live Demo" section at the top:
   ```markdown
   ## Live Demo

   🚀 **[View Live Application](https://your-actual-url.vercel.app)**
   ```
3. Commit and push the change:
   ```bash
   git add README.md
   git commit -m "Add deployment URL to README"
   git push origin main
   ```

## Automatic Deployments

Vercel automatically redeploys your app whenever you push to your GitHub repository:

- **Push to main branch** → Production deployment
- **Push to other branches** → Preview deployment

## Custom Domain (Optional)

To use a custom domain:

1. Go to your project dashboard on Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow the DNS configuration instructions

## Environment Variables (If Needed)

If your app needs environment variables:

1. Go to **"Settings"** → **"Environment Variables"**
2. Add key-value pairs
3. Redeploy for changes to take effect

## Troubleshooting

### Build Fails

**Problem**: Build command fails on Vercel but works locally

**Solution**:
1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`, not just `devDependencies`
3. Make sure Node version matches (Vercel uses Node 18 by default)

### Blank Page After Deployment

**Problem**: App shows blank page or 404 errors

**Solution**:
1. Check browser console for errors
2. Verify the build output directory is set to `dist`
3. For routing issues, Vercel should handle this automatically for Vite projects

### Tailwind Styles Not Working

**Problem**: Styles don't appear correctly

**Solution**:
1. Ensure Tailwind CSS v4 is properly configured in `src/index.css`
2. Check that `@import "tailwindcss";` is present
3. Rebuild and redeploy

### API Calls Failing

**Problem**: JSONPlaceholder API calls don't work

**Solution**:
- The JSONPlaceholder API should work fine. Check browser console for CORS or network errors
- Verify the API URL is correct in your code

## Vercel CLI (Alternative Method)

You can also deploy using the Vercel CLI:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Support](https://vercel.com/support)

## Post-Deployment Checklist

- ✅ App loads successfully at the Vercel URL
- ✅ All pages are accessible (Home, Tasks, Posts)
- ✅ Task Manager works (add, edit, delete, filter)
- ✅ localStorage persists data across refreshes
- ✅ Posts page fetches and displays API data
- ✅ Search and pagination work on Posts page
- ✅ Theme switcher toggles between light and dark mode
- ✅ Theme preference persists in localStorage
- ✅ Mobile menu works on small screens
- ✅ All responsive breakpoints function correctly
- ✅ Deployment URL added to README.md

---

**Congratulations!** Your React + Tailwind CSS application is now live on the internet! 🎉

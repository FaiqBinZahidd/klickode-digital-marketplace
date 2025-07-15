# Netlify Deployment Guide for Klickode

## Quick Fix for Current Issue

Your site https://klickode.netlify.app is not showing anything because the build files aren't deployed properly. Here's how to fix it:

### Option 1: Manual Build & Deploy (Recommended)
1. In your local terminal, run: `npm run build`
2. This creates a `dist/public` folder with all your built files
3. Go to https://app.netlify.com/sites/klickode/deploys
4. Drag and drop the entire `dist/public` folder onto the deploy area
5. Your site will be live in 1-2 minutes

### Option 2: Connect to Git Repository
1. Go to https://app.netlify.com/sites/klickode/settings/deploys
2. Click "Link to Git repository"
3. Connect your GitHub/GitLab repo
4. Set build command: `node simple-build.js`
5. Set publish directory: `dist/public`
6. Add environment variables (see below)

## Environment Variables for Netlify

Add these in your Netlify site settings under Environment Variables:

### Required Variables:
```
DATABASE_URL=your_neon_database_url_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### Optional Variables (if using Supabase):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Neon Database Connection

### Step 1: Get Your Neon Database URL
1. Go to your Neon dashboard at https://console.neon.tech
2. Select your project
3. Go to "Connection Details" 
4. Copy the connection string that looks like:
   ```
   postgresql://username:password@ep-xxx.aws.neon.tech/database?sslmode=require
   ```

### Step 2: Add to Netlify Environment Variables
1. Go to https://app.netlify.com/sites/klickode/settings/environment-variables
2. Add new variable:
   - Key: `DATABASE_URL`
   - Value: Your Neon connection string

### Step 3: Deploy Database Schema
After setting up the environment variables, your database tables will be automatically created when the app starts.

## Troubleshooting

### If site still shows nothing:
1. Check build logs in Netlify dashboard
2. Make sure `dist/public` folder was created locally
3. Ensure all environment variables are set correctly

### If database connection fails:
1. Verify your Neon database is running
2. Check that the connection string includes `?sslmode=require`
3. Ensure your Neon database allows connections from Netlify

## Quick Deploy Command
```bash
# Build and get ready for deployment
npm run build
# Then drag dist/public to Netlify deploy area
```
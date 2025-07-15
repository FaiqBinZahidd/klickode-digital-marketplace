# Netlify Deployment Guide for Klickode

## Project Structure for Static Hosting

This project has been configured for Netlify static hosting with the following setup:

### Files Created/Modified:
- `netlify.toml` - Netlify configuration file
- `build-static.js` - Static build script
- `netlify/functions/api.js` - Serverless function for API endpoints
- `client/public/_redirects` - URL redirect rules
- Updated `client/src/lib/queryClient.ts` - Static hosting compatibility

### Deployment Steps:

1. **Connect to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings:**
   - Build command: `node build-static.js`
   - Publish directory: `dist/public`
   - Node version: 18

3. **Environment Variables:**
   Set these in Netlify's environment variables section:
   - `GEMINI_API_KEY` (for AI features)
   - `DATABASE_URL` (for database connection)
   - `VITE_SUPABASE_URL` (if using Supabase)
   - `VITE_SUPABASE_ANON_KEY` (if using Supabase)

4. **Features Available in Static Mode:**
   - ✅ Full UI/UX with responsive design
   - ✅ Browse assets with mock data
   - ✅ AI tools with mock responses
   - ✅ Learn section with mock content
   - ✅ All pages and navigation
   - ⚠️ Limited backend functionality (uses serverless functions)

5. **Manual Build (Optional):**
   ```bash
   node build-static.js
   ```
   This creates a `dist/public` folder ready for deployment.

### Notes:
- The static version uses mock data for demo purposes
- Real database functionality requires backend hosting
- AI features will need API keys configured in Netlify
- All routing is handled client-side with fallback to index.html

### Production Considerations:
For a fully functional version, consider:
- Using Netlify Functions for backend logic
- Connecting to a cloud database (Supabase, PlanetScale, etc.)
- Setting up authentication with Netlify Identity
- Configuring proper API endpoints for production use
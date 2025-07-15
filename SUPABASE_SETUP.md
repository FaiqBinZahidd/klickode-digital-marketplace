# Complete Supabase Setup Guide for Klickode

## Fresh Supabase Project Setup

### Step 1: Create New Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and fill details:
   - **Name**: `klickode-marketplace`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project"

### Step 2: Get Connection Details
1. In Supabase dashboard, go to **Settings** → **Database**
2. Copy the **Connection string** (URI format):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
   ```
3. Go to **Settings** → **API**
4. Copy your **Project URL** and **anon public** key

### Step 3: Configure Environment Variables
Add these to your Replit Secrets or `.env` file:

```bash
# Database
DATABASE_URL=postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres

# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Other required variables
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
PORT=5000
```

### Step 4: Run Database Schema
1. Open Supabase **SQL Editor**
2. Copy the entire content from `supabase-setup.sql`
3. Paste and run it
4. Verify all tables are created in **Table Editor**

### Step 5: Configure Authentication
1. Go to **Authentication** → **Settings**
2. Set **Site URL**: `https://your-repl-url.replit.dev`
3. Add **Redirect URLs**:
   - `https://your-repl-url.replit.dev/auth/callback`
   - `http://localhost:5000/auth/callback` (for development)

### Step 6: Set Up Google OAuth (Optional)
1. Go to **Authentication** → **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials
4. Set authorized redirect URIs in Google Console

### Step 7: Verify Storage Setup
1. Go to **Storage**
2. You should see 4 buckets: `avatars`, `assets`, `thumbnails`, `previews`
3. All buckets should be public with proper policies

## Database Schema Overview

### Tables Created:
- **users**: User profiles linked to Supabase auth
- **categories**: Asset categories (6 default categories)
- **assets**: Digital products for sale
- **purchases**: Transaction records
- **reviews**: User reviews and ratings
- **likes**: User favorites

### Storage Buckets:
- **avatars**: User profile pictures
- **assets**: Downloadable digital assets
- **thumbnails**: Asset preview images
- **previews**: Asset preview files

### Security Features:
- Row Level Security (RLS) enabled on all tables
- Proper authentication policies
- File upload restrictions
- User-specific data access

## Testing the Setup

1. Start your application: Click the **Run** button
2. Visit `/register` to create a test account
3. Check that user is created in `users` table
4. Test file uploads in dashboard
5. Verify storage policies work correctly

## Troubleshooting

### Common Issues:
- **Connection errors**: Check DATABASE_URL format
- **Auth issues**: Verify SUPABASE_URL and ANON_KEY
- **Storage errors**: Check if buckets exist and policies are applied
- **RLS errors**: Ensure user is authenticated

### Debug Steps:
1. Check Supabase logs in dashboard
2. Verify environment variables
3. Test database connection
4. Check authentication state
5. Verify storage bucket policies

## Production Checklist

- [ ] Database schema deployed
- [ ] Environment variables configured
- [ ] Authentication working
- [ ] Storage buckets created
- [ ] RLS policies active
- [ ] File uploads functional
- [ ] Google OAuth configured (if needed)
- [ ] Backup and monitoring set up
# Klickode Authentication Setup Guide

## Overview
Klickode now uses Supabase authentication with Google OAuth integration. This provides a secure, scalable authentication system with user roles and permissions.

## Features Implemented

### 1. Authentication System
- **Supabase Auth**: Complete authentication backend
- **Google OAuth**: One-click Google sign-in
- **Email/Password**: Traditional email registration and login
- **User Roles**: buyer, seller, admin with different permissions

### 2. User Management
- **Profile Management**: Users can update their profile information
- **Role-based Access**: Different dashboards for buyers, sellers, and admins
- **Protected Routes**: Secure pages that require authentication

### 3. Database Schema
- **Users Table**: Profile information linked to Supabase auth
- **Row Level Security**: Database-level security policies
- **Automatic User Creation**: New users automatically added to database

## Setup Instructions

### 1. Supabase Configuration
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Copy your project URL and anon key to Replit Secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### 2. Database Setup
1. Open Supabase SQL Editor
2. Run the SQL script in `supabase-setup.sql`
3. This creates all necessary tables and security policies

### 3. Google OAuth Setup
1. Go to Authentication → Providers in Supabase
2. Enable Google provider
3. Add your Google OAuth credentials
4. Set redirect URL to: `https://your-app.replit.dev/auth/callback`

## User Roles & Permissions

### Buyer (Default)
- Browse and purchase digital assets
- Access AI tools and learning features
- Manage personal dashboard
- Option to upgrade to seller

### Seller
- All buyer permissions
- Upload and manage digital assets
- Access seller dashboard with analytics
- Receive payments through Stripe

### Admin
- All seller permissions
- Moderate content and users
- Access admin panel
- Manage platform settings

## Routes & Pages

### Public Routes
- `/` - Homepage
- `/browse` - Browse assets
- `/ai-tools` - AI development tools
- `/learn` - Learning platform
- `/playground` - Code editor
- `/reviews` - Reviews and widgets
- `/login` - Sign in page
- `/register` - Sign up page
- `/auth/callback` - OAuth callback

### Protected Routes
- `/dashboard` - User profile and settings
- `/seller-dashboard` - Seller management (sellers only)

## Components

### Authentication Components
- `useAuth` hook - Authentication state management
- `Login` page - Sign in with Google or email
- `Register` page - Sign up with Google or email
- `Dashboard` page - User profile management
- `ProtectedRoute` component - Route protection

### Navigation Updates
- User avatar dropdown when logged in
- Sign In/Sign Up buttons when logged out
- Role-based navigation items
- Sign out functionality

## Security Features

### Row Level Security (RLS)
- Users can only access their own data
- Assets are filtered by publication status
- Purchases are private to the buyer
- Reviews and likes are publicly viewable

### Authentication Policies
- JWT tokens for secure API access
- Automatic token refresh
- Session persistence across browser refreshes
- Secure logout with token invalidation

## Integration Points

### Frontend
- Supabase client configured in `client/src/lib/supabase.ts`
- Authentication hook in `client/src/hooks/useAuth.ts`
- Protected routes in `client/src/App.tsx`

### Backend
- User data stored in Supabase
- Real-time subscriptions for user updates
- Server-side authentication verification

## Next Steps

1. Run the SQL script in Supabase SQL Editor
2. Configure Google OAuth in Supabase
3. Test authentication flow
4. Add Stripe integration for payments
5. Implement asset upload functionality

## Testing

### Authentication Flow
1. Visit `/login` to test sign in
2. Visit `/register` to test sign up  
3. Test Google OAuth integration
4. Verify protected routes redirect to login
5. Test user profile updates in dashboard

### Database Verification
1. Check users table is populated after signup
2. Verify RLS policies are working
3. Test role-based access control
4. Confirm user data is secure

## Troubleshooting

### Common Issues
- Environment variables not set correctly
- Google OAuth redirect URL mismatch
- Database connection issues
- RLS policies too restrictive

### Debug Steps
1. Check browser console for errors
2. Verify Supabase credentials
3. Test database connection
4. Check authentication state in React DevTools
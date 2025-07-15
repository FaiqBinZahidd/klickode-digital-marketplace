
# Test Users Setup for Klickode

## Overview
This document provides instructions for creating test users with different roles in your Supabase database.

## Test User Credentials

### 1. Buyer User
- **Email**: `buyer@klickode.com`
- **Password**: `BuyerTest123!`
- **Role**: buyer
- **Name**: John Buyer
- **ID**: `550e8400-e29b-41d4-a716-446655440001`

### 2. Seller User
- **Email**: `seller@klickode.com`
- **Password**: `SellerTest123!`
- **Role**: seller
- **Name**: Jane Seller
- **ID**: `550e8400-e29b-41d4-a716-446655440002`

### 3. Admin User
- **Email**: `admin@klickode.com`
- **Password**: `AdminTest123!`
- **Role**: admin
- **Name**: Admin User
- **ID**: `550e8400-e29b-41d4-a716-446655440003`

## Setup Instructions

### Step 1: Create Auth Users in Supabase
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** for each test user:

#### For Buyer User:
- Email: `buyer@klickode.com`
- Password: `BuyerTest123!`
- User ID: `550e8400-e29b-41d4-a716-446655440001`
- Email Confirm: ✓ (check this)

#### For Seller User:
- Email: `seller@klickode.com`
- Password: `SellerTest123!`
- User ID: `550e8400-e29b-41d4-a716-446655440002`
- Email Confirm: ✓ (check this)

#### For Admin User:
- Email: `admin@klickode.com`
- Password: `AdminTest123!`
- User ID: `550e8400-e29b-41d4-a716-446655440003`
- Email Confirm: ✓ (check this)

### Step 2: Run Sample Data Script
1. Open Supabase **SQL Editor**
2. Copy and paste the content from `sample-users.sql`
3. Run the script to populate user profiles and sample data

### Step 3: Verify Setup
1. Check **Authentication** → **Users** to see the 3 test users
2. Check **Table Editor** → **users** to see the profile data
3. Check **Table Editor** → **assets** to see sample assets
4. Check **Table Editor** → **purchases** to see sample purchases

## Testing Different Roles

### Buyer Role Testing
- Login with: `buyer@klickode.com` / `BuyerTest123!`
- Can browse and purchase assets
- Can leave reviews and likes
- Cannot upload assets
- Cannot access seller dashboard

### Seller Role Testing
- Login with: `seller@klickode.com` / `SellerTest123!`
- Can upload and manage assets
- Can view sales analytics
- Can access seller dashboard
- Can also purchase assets (dual role)

### Admin Role Testing
- Login with: `admin@klickode.com` / `AdminTest123!`
- Can access admin dashboard
- Can manage all users and assets
- Can view all analytics
- Full system access

## Alternative: Create via API

You can also create these users programmatically using the Supabase Auth API:

```javascript
// Run this in your browser console or Node.js script
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_SERVICE_ROLE_KEY' // Use service role key, not anon key
)

// Create buyer user
await supabase.auth.admin.createUser({
  email: 'buyer@klickode.com',
  password: 'BuyerTest123!',
  user_id: '550e8400-e29b-41d4-a716-446655440001',
  email_confirm: true,
  user_metadata: {
    first_name: 'John',
    last_name: 'Buyer'
  }
})

// Create seller user
await supabase.auth.admin.createUser({
  email: 'seller@klickode.com',
  password: 'SellerTest123!',
  user_id: '550e8400-e29b-41d4-a716-446655440002',
  email_confirm: true,
  user_metadata: {
    first_name: 'Jane',
    last_name: 'Seller'
  }
})

// Create admin user
await supabase.auth.admin.createUser({
  email: 'admin@klickode.com',
  password: 'AdminTest123!',
  user_id: '550e8400-e29b-41d4-a716-446655440003',
  email_confirm: true,
  user_metadata: {
    first_name: 'Admin',
    last_name: 'User'
  }
})
```

## Security Notes

- These are test accounts for development only
- Use strong passwords in production
- Delete test accounts before going live
- Consider using environment variables for test credentials
- Always verify user roles before granting access to features

## Troubleshooting

If users aren't created properly:
1. Check that UUIDs are valid and unique
2. Verify email format is correct
3. Ensure passwords meet Supabase requirements
4. Check that RLS policies allow the operations
5. Verify the trigger function is working for automatic user creation

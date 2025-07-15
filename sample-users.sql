
-- Sample users for testing different roles
-- IMPORTANT: You must create these users in Supabase Auth FIRST before running this SQL

-- METHOD 1: Create users through Supabase Dashboard
-- 1. Go to Authentication > Users in your Supabase dashboard
-- 2. Click "Add user" and create these users manually:
--    - Email: buyer@klickode.com, Password: BuyerTest123!
--    - Email: seller@klickode.com, Password: SellerTest123!  
--    - Email: admin@klickode.com, Password: AdminTest123!

-- METHOD 2: Create users programmatically (requires service role key)
-- Use this JavaScript code in your browser console or Node.js:
/*
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_SERVICE_ROLE_KEY' // Use service role key from Settings > API
)

// Create users in auth.users first
const users = [
  {
    email: 'buyer@klickode.com',
    password: 'BuyerTest123!',
    user_metadata: { first_name: 'John', last_name: 'Buyer' }
  },
  {
    email: 'seller@klickode.com', 
    password: 'SellerTest123!',
    user_metadata: { first_name: 'Jane', last_name: 'Seller' }
  },
  {
    email: 'admin@klickode.com',
    password: 'AdminTest123!', 
    user_metadata: { first_name: 'Admin', last_name: 'User' }
  }
]

for (const user of users) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: user.email,
    password: user.password,
    email_confirm: true,
    user_metadata: user.user_metadata
  })
  console.log(data?.user?.id || error)
}
*/

-- After creating auth users, run this SQL to add additional profile data:

-- Update user profiles with roles and additional data
-- Note: These users should now exist in auth.users via the trigger function

UPDATE public.users 
SET 
  role = 'buyer',
  bio = 'I love buying digital assets and tools for my projects.',
  is_verified = true,
  is_active = true
WHERE email = 'buyer@klickode.com';

UPDATE public.users 
SET 
  role = 'seller', 
  bio = 'Professional developer selling high-quality digital assets.',
  is_verified = true,
  is_active = true
WHERE email = 'seller@klickode.com';

UPDATE public.users 
SET 
  role = 'admin',
  bio = 'System administrator managing the Klickode marketplace.',
  is_verified = true,
  is_active = true  
WHERE email = 'admin@klickode.com';

-- Get user IDs for sample data (run this to see the actual UUIDs)
-- SELECT id, email, first_name, last_name, role FROM public.users;

-- Add sample assets (update seller_id with actual UUID from above query)
INSERT INTO public.assets (
  title,
  description, 
  price,
  category_id,
  seller_id,
  status,
  tags,
  featured
) VALUES (
  'Modern React Dashboard Template',
  'A beautiful and responsive dashboard template built with React and Tailwind CSS.',
  29.99,
  1, -- Web Templates category
  (SELECT id FROM public.users WHERE email = 'seller@klickode.com'),
  'published',
  '["react", "dashboard", "tailwind", "typescript"]'::jsonb,
  true
),
(
  'UI Component Library', 
  'A comprehensive set of reusable UI components for modern web applications.',
  19.99,
  2, -- UI Components category
  (SELECT id FROM public.users WHERE email = 'seller@klickode.com'),
  'published',
  '["components", "ui", "library", "react"]'::jsonb,
  false
),
(
  'Icon Pack - Development Tools',
  'A collection of 100+ high-quality icons for development and coding applications.',
  9.99,
  3, -- Icons & Graphics category  
  (SELECT id FROM public.users WHERE email = 'seller@klickode.com'),
  'published',
  '["icons", "development", "tools", "svg"]'::jsonb,
  false
);

-- Add sample purchases
INSERT INTO public.purchases (
  buyer_id,
  asset_id,
  amount,
  status
) VALUES (
  (SELECT id FROM public.users WHERE email = 'buyer@klickode.com'),
  1, -- Modern React Dashboard Template
  29.99,
  'completed'
),
(
  (SELECT id FROM public.users WHERE email = 'buyer@klickode.com'),
  2, -- UI Component Library  
  19.99,
  'completed'
);

-- Add sample reviews
INSERT INTO public.reviews (
  asset_id,
  user_id,
  rating,
  comment
) VALUES (
  1, -- Modern React Dashboard Template
  (SELECT id FROM public.users WHERE email = 'buyer@klickode.com'),
  5,
  'Excellent template! Very well structured and easy to customize.'
),
(
  2, -- UI Component Library
  (SELECT id FROM public.users WHERE email = 'buyer@klickode.com'), 
  4,
  'Good quality components, saved me a lot of time.'
);

-- Add sample likes
INSERT INTO public.likes (
  asset_id,
  user_id
) VALUES (
  1, -- Modern React Dashboard Template
  (SELECT id FROM public.users WHERE email = 'buyer@klickode.com')
),
(
  2, -- UI Component Library
  (SELECT id FROM public.users WHERE email = 'buyer@klickode.com')
),
(
  3, -- Icon Pack  
  (SELECT id FROM public.users WHERE email = 'buyer@klickode.com')
);

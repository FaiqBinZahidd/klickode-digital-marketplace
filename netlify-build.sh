#!/bin/bash

echo "Building Klickode for Netlify deployment..."

# Set production environment
export NODE_ENV=production

# Build the frontend
echo "Building frontend..."
npm run build:client

# Copy redirects file
echo "Setting up redirects..."
cp client/public/_redirects dist/public/_redirects

# Copy netlify functions
echo "Setting up serverless functions..."
cp -r netlify dist/

echo "Build completed successfully!"
echo "Deploy the 'dist/public' folder to Netlify"
echo "Make sure to set these environment variables in Netlify:"
echo "- GEMINI_API_KEY"
echo "- DATABASE_URL"
echo "- VITE_SUPABASE_URL"
echo "- VITE_SUPABASE_ANON_KEY"
#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building static version for Netlify...');

// Set environment to production
process.env.NODE_ENV = 'production';

try {
  // Build the client
  console.log('Building client...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Copy redirects file to build output
  const redirectsSource = path.join(process.cwd(), 'public', '_redirects');
  const redirectsTarget = path.join(process.cwd(), 'dist', 'public', '_redirects');
  
  if (fs.existsSync(redirectsSource)) {
    fs.copyFileSync(redirectsSource, redirectsTarget);
    console.log('Copied _redirects file to build output');
  }
  
  // Create a simple package.json for netlify functions
  const netlifyPackage = {
    "name": "netlify-functions",
    "version": "1.0.0",
    "dependencies": {
      "express": "^4.18.2",
      "serverless-http": "^3.2.0"
    }
  };
  
  fs.writeFileSync(
    path.join(process.cwd(), 'netlify', 'functions', 'package.json'),
    JSON.stringify(netlifyPackage, null, 2)
  );
  
  console.log('Static build completed successfully!');
  console.log('Output directory: dist/public');
  
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
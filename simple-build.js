#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building minimal static version...');

// Set environment to production
process.env.NODE_ENV = 'production';

try {
  // Remove dist directory if it exists
  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true });
  }
  
  // Create dist directories
  fs.mkdirSync('./dist/public', { recursive: true });
  
  // Build with minimal configuration
  console.log('Building client with minimal config...');
  execSync('vite build --minify false --sourcemap false', { stdio: 'inherit' });
  
  // Copy redirects file
  const redirectsSource = path.join(process.cwd(), 'public', '_redirects');
  const redirectsTarget = path.join(process.cwd(), 'dist', 'public', '_redirects');
  
  if (fs.existsSync(redirectsSource)) {
    fs.copyFileSync(redirectsSource, redirectsTarget);
    console.log('Copied _redirects file');
  }
  
  console.log('Minimal static build completed!');
  console.log('Files in dist/public:');
  execSync('ls -la dist/public/', { stdio: 'inherit' });
  
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
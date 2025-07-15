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
  execSync('npx vite build --minify false --sourcemap false', { stdio: 'inherit' });
  
  // Copy redirects file
  const redirectsSource = path.join(process.cwd(), 'public', '_redirects');
  const redirectsTarget = path.join(process.cwd(), 'dist', 'public', '_redirects');
  
  if (fs.existsSync(redirectsSource)) {
    fs.copyFileSync(redirectsSource, redirectsTarget);
    console.log('Copied _redirects file');
  }
  
  // Copy netlify functions
  console.log('Copying netlify functions...');
  const netlifySource = path.join(process.cwd(), 'netlify');
  const netlifyTarget = path.join(process.cwd(), 'dist', 'netlify');
  
  if (fs.existsSync(netlifySource)) {
    // Create netlify directory in dist
    fs.mkdirSync(netlifyTarget, { recursive: true });
    
    // Copy the entire netlify directory
    execSync(`cp -r ${netlifySource}/* ${netlifyTarget}/`, { stdio: 'inherit' });
    console.log('Copied netlify functions');
    
    // Install function dependencies
    console.log('Installing function dependencies...');
    const functionsDir = path.join(netlifyTarget, 'functions');
    if (fs.existsSync(functionsDir) && fs.existsSync(path.join(functionsDir, 'package.json'))) {
      try {
        execSync('npm install', { 
          cwd: functionsDir, 
          stdio: 'inherit' 
        });
        console.log('Function dependencies installed successfully');
      } catch (error) {
        console.warn('Warning: Could not install function dependencies:', error.message);
      }
    }
  }
  
  console.log('Minimal static build completed!');
  console.log('Files in dist/public:');
  execSync('ls -la dist/public/', { stdio: 'inherit' });
  
  console.log('\nFiles in dist/netlify:');
  execSync('ls -la dist/netlify/', { stdio: 'inherit' });
  
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
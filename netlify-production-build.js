#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting Netlify Production Build...');

// Set environment to production
process.env.NODE_ENV = 'production';

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true });
  }
  
  // Create dist directories
  fs.mkdirSync('./dist/public', { recursive: true });
  fs.mkdirSync('./dist/netlify/functions', { recursive: true });
  
  // Build React application
  console.log('⚛️ Building React application...');
  execSync('npx vite build --minify --sourcemap false', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  // Copy essential files
  console.log('📁 Copying essential files...');
  
  // Copy _redirects from public directory
  const redirectsSource = path.join(process.cwd(), 'public', '_redirects');
  const redirectsTarget = path.join(process.cwd(), 'dist', 'public', '_redirects');
  
  if (fs.existsSync(redirectsSource)) {
    fs.copyFileSync(redirectsSource, redirectsTarget);
    console.log('✅ Copied _redirects file');
  }
  
  // Copy _redirects from client/public as backup
  const clientRedirectsSource = path.join(process.cwd(), 'client', 'public', '_redirects');
  if (fs.existsSync(clientRedirectsSource) && !fs.existsSync(redirectsTarget)) {
    fs.copyFileSync(clientRedirectsSource, redirectsTarget);
    console.log('✅ Copied _redirects from client/public');
  }
  
  // Copy netlify functions
  console.log('⚡ Setting up serverless functions...');
  const netlifySource = path.join(process.cwd(), 'netlify');
  const netlifyTarget = path.join(process.cwd(), 'dist', 'netlify');
  
  if (fs.existsSync(netlifySource)) {
    // Copy functions
    execSync(`cp -r ${netlifySource}/* ${netlifyTarget}/`, { stdio: 'inherit' });
    console.log('✅ Copied netlify functions');
    
    // Install function dependencies
    const functionsDir = path.join(netlifyTarget, 'functions');
    if (fs.existsSync(functionsDir) && fs.existsSync(path.join(functionsDir, 'package.json'))) {
      console.log('📦 Installing function dependencies...');
      try {
        execSync('npm install --production --no-audit --no-fund', { 
          cwd: functionsDir, 
          stdio: 'inherit' 
        });
        console.log('✅ Function dependencies installed');
      } catch (error) {
        console.warn('⚠️ Warning: Function dependency installation failed:', error.message);
        console.log('🔧 Netlify will handle this with the functions plugin');
      }
    }
  }
  
  // Verify build output
  console.log('\n📊 Build Summary:');
  console.log('==================');
  
  // Check public files
  if (fs.existsSync('./dist/public')) {
    const publicFiles = fs.readdirSync('./dist/public');
    console.log(`📁 Public files (${publicFiles.length}):`, publicFiles.join(', '));
    
    // Check assets
    const assetsDir = path.join('./dist/public', 'assets');
    if (fs.existsSync(assetsDir)) {
      const assetFiles = fs.readdirSync(assetsDir);
      console.log(`🎨 Asset files (${assetFiles.length}):`, assetFiles.join(', '));
    }
  }
  
  // Check functions
  if (fs.existsSync('./dist/netlify/functions')) {
    const functionFiles = fs.readdirSync('./dist/netlify/functions');
    console.log(`⚡ Function files (${functionFiles.length}):`, functionFiles.join(', '));
  }
  
  // Final verification
  const requiredFiles = [
    './dist/public/index.html',
    './dist/public/_redirects',
    './dist/netlify/functions/api.js',
    './dist/netlify/functions/package.json'
  ];
  
  console.log('\n🔍 Verification:');
  console.log('================');
  
  let allFilesPresent = true;
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      console.log(`✅ ${file} (${stats.size} bytes)`);
    } else {
      console.log(`❌ ${file} - MISSING!`);
      allFilesPresent = false;
    }
  });
  
  if (allFilesPresent) {
    console.log('\n🎉 Build completed successfully!');
    console.log('📤 Ready for Netlify deployment');
    console.log('\n💡 Next steps:');
    console.log('1. Commit and push changes to trigger auto-deploy');
    console.log('2. Or drag & drop the dist folder to Netlify dashboard');
  } else {
    console.log('\n❌ Build completed with missing files!');
    process.exit(1);
  }
  
} catch (error) {
  console.error('\n💥 Build failed:', error.message);
  console.error('\n🔧 Troubleshooting tips:');
  console.error('1. Ensure all dependencies are installed: npm install');
  console.error('2. Check that vite is available: npx vite --version');
  console.error('3. Verify netlify functions exist in ./netlify/functions/');
  process.exit(1);
}

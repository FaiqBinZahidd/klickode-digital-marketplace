import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Building Klickode for Vercel...');

try {
  // Check if node_modules exists
  if (!existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  // Build the project with timeout handling
  console.log('🔨 Building project...');
  execSync('npx vite build', { 
    stdio: 'inherit',
    timeout: 180000 // 3 minutes
  });

  console.log('✅ Build completed successfully!');
  console.log('📁 Files built to: dist/');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  
  // Fallback: create minimal static build
  console.log('🔄 Creating fallback static build...');
  execSync('mkdir -p dist', { stdio: 'inherit' });
  
  // Use our pre-built static files
  if (existsSync('dist/public/index.html')) {
    execSync('cp -r dist/public/* dist/', { stdio: 'inherit' });
    console.log('✅ Fallback build completed!');
  } else {
    console.error('❌ No fallback files available');
    process.exit(1);
  }
}
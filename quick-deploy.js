import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Creating quick deployment build...');

// Create dist/public directory
if (!fs.existsSync('dist/public')) {
  fs.mkdirSync('dist/public', { recursive: true });
}

// Build the frontend only (skip server)
try {
  execSync('npx vite build --outDir dist/public', { stdio: 'inherit' });
  console.log('✓ Frontend build completed');
  
  // Create _redirects for Netlify
  const redirects = `
/api/* /.netlify/functions/api/:splat 200
/* /index.html 200
`;
  
  fs.writeFileSync(path.join('dist/public', '_redirects'), redirects);
  console.log('✓ _redirects file created');
  
  console.log('\n🎉 Build complete! Deploy the dist/public folder to Netlify');
  console.log('📁 Drag and drop the dist/public folder to: https://app.netlify.com/sites/klickode/deploys');
  
} catch (error) {
  console.error('Build failed:', error.message);
}
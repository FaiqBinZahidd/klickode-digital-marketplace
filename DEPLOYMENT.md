# Deployment Guide

This guide covers different deployment options for Klickode marketplace platform.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Production Build](#production-build)
- [Deployment Options](#deployment-options)
- [Database Setup](#database-setup)
- [Monitoring](#monitoring)

## Prerequisites

- Node.js 18.0 or higher
- PostgreSQL database (Neon Database recommended)
- Google Gemini API key
- Domain name (optional)

## Environment Setup

### Required Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# AI Integration
GEMINI_API_KEY=your_google_gemini_api_key

# Environment
NODE_ENV=production

# Optional: Database connection details
PGDATABASE=your_database_name
PGHOST=your_database_host
PGUSER=your_database_user
PGPASSWORD=your_database_password
PGPORT=5432
```

### Getting API Keys

1. **Google Gemini API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Create a new project or select existing
   - Generate API key from the API section
   - Copy the key to your environment variables

2. **Database URL**:
   - For Neon Database: Visit [Neon Console](https://console.neon.tech/)
   - Create a database and copy the connection string
   - For local PostgreSQL: Use `postgresql://username:password@localhost:5432/database`

## Production Build

### Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Build Verification

```bash
# Check build output
ls -la dist/
# Should contain: index.js, public/

# Test production build locally
NODE_ENV=production npm start
```

## Deployment Options

### 1. Netlify (Recommended for Static)

The project includes Netlify configuration for static deployment:

```bash
# Build for Netlify
npm run build

# Deploy to Netlify
# Upload dist/public folder to Netlify
```

**Configuration files included**:
- `netlify.toml` - Build configuration
- `netlify/functions/api.js` - Serverless function
- `_redirects` - Routing configuration

### 2. Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### 3. Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy to Railway
railway deploy
```

### 4. Heroku

```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set DATABASE_URL=your_database_url
heroku config:set GEMINI_API_KEY=your_api_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### 5. Digital Ocean App Platform

1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Configure build settings:
   - Build command: `npm run build`
   - Run command: `npm start`

### 6. AWS EC2 (Self-hosted)

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-server-ip

# Install Node.js and dependencies
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/yourusername/klickode-marketplace.git
cd klickode-marketplace

# Install dependencies and build
npm install
npm run build

# Install PM2 for process management
sudo npm install -g pm2

# Start application
pm2 start dist/index.js --name klickode
pm2 startup
pm2 save
```

## Database Setup

### Neon Database (Recommended)

1. Create account at [Neon](https://neon.tech/)
2. Create a new database
3. Copy connection string
4. Run migrations:
   ```bash
   npm run db:push
   ```

### Self-hosted PostgreSQL

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb klickode

# Create user
sudo -u postgres psql
CREATE USER klickode_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE klickode TO klickode_user;

# Run migrations
npm run db:push
```

## Performance Optimization

### Frontend Optimization

```bash
# Build with optimization
npm run build

# Analyze bundle size
npm run build:analyze
```

### Backend Optimization

1. **Database Indexing**: Ensure proper indexes on frequently queried columns
2. **Connection Pooling**: Configure appropriate connection pool size
3. **Caching**: Implement Redis for session storage and caching
4. **CDN**: Use CloudFlare or AWS CloudFront for static assets

## Monitoring

### Application Monitoring

```bash
# Install monitoring tools
npm install @sentry/node @sentry/react

# Set up error tracking
# Add Sentry DSN to environment variables
```

### Database Monitoring

- Monitor connection pool usage
- Track query performance
- Set up alerts for slow queries
- Regular backup schedules

### Server Monitoring

- CPU and memory usage
- Disk space monitoring
- Network performance
- SSL certificate expiration

## SSL/HTTPS Setup

### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### CloudFlare (Recommended)

1. Add domain to CloudFlare
2. Update nameservers
3. Enable SSL/TLS encryption
4. Configure page rules for optimization

## Backup Strategy

### Database Backups

```bash
# Manual backup
pg_dump $DATABASE_URL > backup.sql

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > "backup_$DATE.sql"
```

### File Backups

```bash
# Backup uploaded files
tar -czf assets_backup.tar.gz public/assets/

# Sync to cloud storage
aws s3 sync public/assets/ s3://your-bucket/assets/
```

## Rollback Strategy

### Database Rollback

```bash
# Restore from backup
psql $DATABASE_URL < backup.sql
```

### Application Rollback

```bash
# Using PM2
pm2 restart klickode --update-env

# Using Docker
docker-compose down
docker-compose pull
docker-compose up -d
```

## Health Checks

### Endpoint Health Check

```bash
# Check application health
curl -f http://your-domain.com/health || exit 1

# Check database connection
curl -f http://your-domain.com/api/health/db || exit 1
```

### Monitoring Dashboard

Set up monitoring dashboard with:
- Application uptime
- Response times
- Error rates
- Database performance
- User activity

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Rotate keys regularly
3. **Database**: Use connection pooling and prepared statements
4. **HTTPS**: Always use SSL in production
5. **Headers**: Set security headers (CORS, CSP, etc.)
6. **Updates**: Keep dependencies updated

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change port in production
2. **Database connection**: Verify connection string
3. **API limits**: Monitor Gemini API usage
4. **Memory issues**: Increase server memory allocation
5. **Build failures**: Check Node.js version compatibility

### Debugging

```bash
# Check logs
npm run logs

# Debug mode
NODE_ENV=development npm start

# Database connection test
npm run db:check
```

## Support

For deployment issues:
- Check GitHub Issues
- Review deployment logs
- Contact support team
- Community forum discussions

---

This deployment guide covers the most common deployment scenarios for the Klickode marketplace platform. Choose the option that best fits your infrastructure and requirements.
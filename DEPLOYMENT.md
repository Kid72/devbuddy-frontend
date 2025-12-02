# DevHub Deployment Guide

## Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Vercel/Netlify account (recommended) or any Node.js hosting

## Environment Variables

Create a `.env.local` file (or configure in your hosting platform):

```bash
# API Backend URL (update with your backend URL)
NEXT_PUBLIC_API_URL=http://localhost:8082

# For production, use your deployed backend URL:
# NEXT_PUBLIC_API_URL=https://api.devhub.com
```

### Optional Environment Variables

```bash
# Node environment (set automatically by hosting platforms)
NODE_ENV=production

# Port (for self-hosted deployments)
PORT=3000
```

## Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Development server will start at:
# http://localhost:3000 (or next available port)
```

## Build and Test Locally

```bash
# Create production build
pnpm build

# Test production build locally
pnpm start

# Production server will start at:
# http://localhost:3000
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   pnpm add -g vercel

   # Deploy
   vercel
   ```

2. **Configure via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub/GitLab repository
   - Framework: Next.js
   - Root Directory: `devbuddy-frontend`
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

3. **Set Environment Variables**
   - Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL` with your backend URL

4. **Deploy**
   - Push to main branch for automatic deployments
   - Or use `vercel --prod` for manual deployment

### Option 2: Netlify

1. **Create `netlify.toml`** (already configured if present)
   ```toml
   [build]
     command = "pnpm build"
     publish = ".next"

   [build.environment]
     NODE_VERSION = "18"
   ```

2. **Deploy via Netlify CLI**
   ```bash
   # Install Netlify CLI
   pnpm add -g netlify-cli

   # Deploy
   netlify deploy --prod
   ```

3. **Or Deploy via Netlify Dashboard**
   - Import repository from GitHub
   - Build command: `pnpm build`
   - Publish directory: `.next`
   - Add environment variable: `NEXT_PUBLIC_API_URL`

### Option 3: Docker

1. **Create Dockerfile** (if not present)
   ```dockerfile
   FROM node:18-alpine AS base

   # Install pnpm
   RUN npm install -g pnpm

   # Dependencies
   FROM base AS deps
   WORKDIR /app
   COPY package.json pnpm-lock.yaml ./
   RUN pnpm install --frozen-lockfile

   # Builder
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   ENV NEXT_TELEMETRY_DISABLED 1
   RUN pnpm build

   # Runner
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   ENV NEXT_TELEMETRY_DISABLED 1

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs

   EXPOSE 3000

   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   # Build image
   docker build -t devhub-frontend .

   # Run container
   docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.devhub.com devhub-frontend
   ```

### Option 4: Self-Hosted (VPS/Server)

1. **Install Dependencies on Server**
   ```bash
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install pnpm
   npm install -g pnpm
   ```

2. **Clone and Build**
   ```bash
   # Clone repository
   git clone <your-repo-url>
   cd devbuddy/devbuddy-frontend

   # Install dependencies
   pnpm install

   # Create .env.local
   echo "NEXT_PUBLIC_API_URL=https://api.yourdomain.com" > .env.local

   # Build
   pnpm build
   ```

3. **Run with PM2** (recommended for production)
   ```bash
   # Install PM2
   npm install -g pm2

   # Start application
   pm2 start npm --name "devhub-frontend" -- start

   # Save PM2 configuration
   pm2 save

   # Setup PM2 to start on boot
   pm2 startup
   ```

4. **Configure Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name devhub.com www.devhub.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **SSL with Certbot**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d devhub.com -d www.devhub.com
   ```

## Post-Deployment Checklist

### 1. Verify Core Functionality
- [ ] Home page loads
- [ ] Jobs board displays 18 jobs
- [ ] Multi-select filters work
- [ ] Global search functions
- [ ] Saved jobs persist (localStorage)
- [ ] Job detail pages load
- [ ] Learn section accessible
- [ ] Interview Q&A accessible
- [ ] Navigation works across all pages

### 2. Test Error Handling
- [ ] Visit `/jobs/invalid-id` - shows custom error page
- [ ] Visit `/nonexistent-route` - shows 404 page
- [ ] Check browser console - no critical errors

### 3. Performance Testing
- [ ] Run Lighthouse audit (target: >90 performance)
- [ ] Check mobile responsiveness
- [ ] Test on 4G connection (throttled)
- [ ] Verify images load efficiently

### 4. SEO Verification
- [ ] View page source - meta tags present
- [ ] Test with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verify robots.txt accessible
- [ ] Submit sitemap to Google Search Console

### 5. Security
- [ ] Check for exposed API keys (should only be `NEXT_PUBLIC_*`)
- [ ] Verify HTTPS enabled
- [ ] Test CORS settings with backend
- [ ] Review security headers

### 6. Monitoring Setup (Recommended)
```bash
# Install Sentry (error tracking)
pnpm add @sentry/nextjs

# Install analytics
pnpm add @vercel/analytics
# or
pnpm add react-ga4  # Google Analytics
```

## Environment-Specific Configurations

### Development
```bash
NEXT_PUBLIC_API_URL=http://localhost:8082
NODE_ENV=development
```

### Staging
```bash
NEXT_PUBLIC_API_URL=https://staging-api.devhub.com
NODE_ENV=production
```

### Production
```bash
NEXT_PUBLIC_API_URL=https://api.devhub.com
NODE_ENV=production
```

## Troubleshooting

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Try building again
pnpm build
```

### Port Already in Use
```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 pnpm start
```

### Slow Build Times
```bash
# Use Turbopack (Next.js 16)
pnpm dev --turbo

# For production, ensure using latest Next.js
pnpm add next@latest
```

### localStorage Not Working
- Check if deployed site uses HTTPS
- Verify browser allows localStorage (not in incognito mode)
- Check browser console for quota exceeded errors

## Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install
        working-directory: ./devbuddy-frontend

      - name: Build
        run: pnpm build
        working-directory: ./devbuddy-frontend
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
        working-directory: ./devbuddy-frontend
```

## Rollback Procedure

### Vercel
```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback <deployment-url>
```

### PM2 (Self-Hosted)
```bash
# Stop current version
pm2 stop devhub-frontend

# Checkout previous version
git checkout <previous-commit>

# Rebuild
pnpm install
pnpm build

# Restart
pm2 restart devhub-frontend
```

## Support

For deployment issues:
1. Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
2. Check [Vercel Docs](https://vercel.com/docs)
3. Review `TESTING.md` for known issues
4. Check application logs for errors

## Scaling Considerations

### CDN Configuration
- Static assets served via CDN (automatic on Vercel/Netlify)
- Enable image optimization
- Configure cache headers

### Database (When Backend Connected)
- Connection pooling
- Read replicas for scaling
- Caching layer (Redis)

### Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure alerting for errors
- Monitor API response times
- Track Core Web Vitals

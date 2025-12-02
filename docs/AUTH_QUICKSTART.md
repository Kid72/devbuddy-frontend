# Authentication Quick Start Guide

Get Supabase authentication running in 5 minutes!

## 1. Install Dependencies (Already Done ✓)

```bash
npm install @supabase/supabase-js @supabase/ssr @supabase/auth-ui-react @supabase/auth-ui-shared
```

## 2. Create Supabase Project

1. Visit https://app.supabase.com
2. Click "New Project"
3. Fill in project details and create
4. Wait ~2 minutes for setup

## 3. Get Your Credentials

In Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`

## 4. Update Environment Variables

Edit `/Users/raufaliyev/IdeaProjects/devbuddy/devbuddy-frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8082

# Add these lines:
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-project-ref` and `your-anon-key-here` with actual values from step 3.

## 5. Set Up Google OAuth (5 mins)

1. Go to https://console.cloud.google.com
2. Create OAuth Client ID (Web application)
3. Set redirect URI: `https://your-project-ref.supabase.co/auth/v1/callback`
4. Copy Client ID and Secret

In Supabase:
1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Paste Client ID and Secret
4. Save

## 6. Set Up GitHub OAuth (3 mins)

1. Go to https://github.com/settings/developers
2. Create new OAuth App
3. Set callback: `https://your-project-ref.supabase.co/auth/v1/callback`
4. Copy Client ID and generate Client Secret

In Supabase:
1. Go to **Authentication** → **Providers**
2. Enable **GitHub**
3. Paste Client ID and Secret
4. Save

## 7. Configure URLs in Supabase

In Supabase dashboard → **Authentication** → **URL Configuration**:

1. Set **Site URL**: `http://localhost:3000`
2. Add **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/**
   ```

## 8. Test It!

```bash
npm run dev
```

Visit http://localhost:3000/login

Try logging in with Google or GitHub!

## Troubleshooting

### "Invalid Redirect URI"
- Double-check the redirect URI matches exactly in both provider and Supabase
- No trailing slashes!

### "Failed to get session"
- Restart `npm run dev` after changing `.env.local`
- Check environment variables are correct

### Still stuck?
See detailed guide: `/Users/raufaliyev/IdeaProjects/devbuddy/devbuddy-frontend/docs/SUPABASE_SETUP.md`

## What Works Now

- ✅ Google OAuth login
- ✅ GitHub OAuth login
- ✅ User menu in navigation
- ✅ Protected `/cv` routes
- ✅ JWT tokens in API calls
- ✅ Auto-redirect to login when needed
- ✅ Session persistence
- ✅ Logout functionality

## Next: Backend Integration

Your backend needs to validate the JWT tokens sent in API requests:

```javascript
// Example: Validate Supabase JWT
const token = request.headers.authorization?.replace('Bearer ', '');
// Use Supabase Admin SDK or JWT library to verify
```

User ID is available in the JWT claims as `sub`.

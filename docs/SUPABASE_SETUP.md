# Supabase Authentication Setup Guide

This guide explains how to set up Supabase authentication for the DevBuddy frontend with Google and GitHub OAuth providers.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Google Cloud Console account (for Google OAuth)
- GitHub account (for GitHub OAuth)

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - Project name: `devbuddy` (or your preferred name)
   - Database password: Generate a strong password
   - Region: Choose closest to your users
4. Click "Create new project"
5. Wait for the project to be created (takes ~2 minutes)

## Step 2: Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy these values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (long JWT token)

3. Update your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Configure Google OAuth

### 3.1 Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Configure OAuth consent screen if prompted:
   - User Type: External
   - App name: DevBuddy
   - User support email: Your email
   - Developer contact: Your email
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: DevBuddy Web
   - Authorized redirect URIs: `https://your-project-ref.supabase.co/auth/v1/callback`
7. Copy the **Client ID** and **Client Secret**

### 3.2 Enable Google Provider in Supabase

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Find **Google** and click to expand
3. Enable the provider
4. Paste your Google OAuth credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console
5. Click **Save**

## Step 4: Configure GitHub OAuth

### 4.1 Create GitHub OAuth App

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** > **New OAuth App**
3. Fill in the form:
   - Application name: DevBuddy
   - Homepage URL: `http://localhost:3000` (for development)
   - Authorization callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
4. Click **Register application**
5. Click **Generate a new client secret**
6. Copy the **Client ID** and **Client secret**

### 4.2 Enable GitHub Provider in Supabase

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Find **GitHub** and click to expand
3. Enable the provider
4. Paste your GitHub OAuth credentials:
   - **Client ID**: From GitHub OAuth App
   - **Client Secret**: From GitHub OAuth App
5. Click **Save**

## Step 5: Configure Site URL and Redirect URLs

1. In Supabase dashboard, go to **Authentication** > **URL Configuration**
2. Set **Site URL**:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
3. Add **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/**
   https://yourdomain.com/auth/callback
   https://yourdomain.com/**
   ```
4. Click **Save**

## Step 6: Test Authentication

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Click "Continue with Google" or "Continue with GitHub"

4. Complete the OAuth flow

5. You should be redirected back to `/cv` page as an authenticated user

## Troubleshooting

### Error: "Invalid Redirect URI"
- Ensure the redirect URI in your OAuth provider matches exactly: `https://your-project-ref.supabase.co/auth/v1/callback`
- Check for trailing slashes

### Error: "Failed to get session"
- Verify your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Restart your Next.js dev server after changing environment variables

### User can't access protected routes
- Check that middleware is running: Look for `middleware.ts` in your project root
- Verify the `matcher` config in middleware includes the routes you want to protect

### Session not persisting
- Check browser cookies are enabled
- Ensure you're not blocking third-party cookies
- Verify the Supabase client is created correctly in both browser and server contexts

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Rotate secrets regularly** in production
3. **Use environment-specific OAuth apps** (separate for dev/staging/prod)
4. **Enable email confirmations** in Supabase Auth settings for production
5. **Configure proper CORS** settings in Supabase
6. **Add rate limiting** for auth endpoints in production

## Production Deployment

When deploying to production:

1. Update OAuth provider redirect URIs to your production domain
2. Update Supabase Site URL to your production domain
3. Add production redirect URLs to Supabase
4. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
5. Test all OAuth flows thoroughly

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Supabase Integration](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [OAuth 2.0 Best Practices](https://oauth.net/2/)

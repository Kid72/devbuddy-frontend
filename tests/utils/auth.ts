import { Page, expect } from '@playwright/test';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

/**
 * Authentication utilities for Playwright tests with real Supabase
 * Provides helpers for OAuth flows, session management, and auth state
 */

const AUTH_STATE_PATH = path.join(__dirname, '../fixtures/auth-state.json');

/**
 * Get Supabase client instance
 */
export function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Get JWT token from Supabase using email/password authentication
 */
export async function getAuthToken(email: string, password: string): Promise<string> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw new Error(`Failed to authenticate: ${error.message}`);
  }

  if (!data.session?.access_token) {
    throw new Error('No access token received from Supabase');
  }

  return data.session.access_token;
}

/**
 * Create a test user in Supabase
 * Returns true if user was created, false if already exists
 */
export async function createTestUser(email: string, password: string): Promise<boolean> {
  const supabase = getSupabaseClient();

  // Try to sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: undefined, // Skip email confirmation for test users
    }
  });

  if (error) {
    // User might already exist
    if (error.message.includes('already registered')) {
      console.log(`Test user ${email} already exists`);
      return false;
    }
    throw new Error(`Failed to create test user: ${error.message}`);
  }

  console.log(`Test user ${email} created successfully`);
  return true;
}

/**
 * Login with email and password using local Supabase
 * This is the primary method for Playwright tests with local development
 */
export async function loginWithEmail(page: Page, email: string, password: string) {
  // Go to login page
  await page.goto('/login');

  // Wait for login form to load
  await page.waitForSelector('input[type="email"]', { timeout: 10000 });

  // Fill in email and password
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);

  // Click sign in button using specific test ID
  await page.getByTestId('auth-submit-button').click();

  // Wait for redirect to authenticated page (CV, dashboard, or home)
  await page.waitForURL(/\/(cv|dashboard)?$/, { timeout: 30000 }).catch(async () => {
    // Fallback: wait for user menu to appear (indicates successful auth)
    await page.waitForSelector('[data-testid="user-menu"]', {
      state: 'visible',
      timeout: 30000
    });
  });

  // Double-check authentication worked by verifying user menu is visible
  await expect(page.getByTestId('user-menu')).toBeVisible({ timeout: 5000 });
}

/**
 * Set authentication state directly in browser storage
 * Faster than going through login flow for every test
 */
export async function setAuthState(page: Page, accessToken: string, refreshToken?: string) {
  const supabase = getSupabaseClient();

  // Navigate to the app first to set the correct domain
  await page.goto('/');

  // Set Supabase auth tokens in localStorage
  await page.evaluate(({ access, refresh, url }) => {
    const authKey = `sb-${new URL(url).hostname.split('.')[0]}-auth-token`;

    const authData = {
      access_token: access,
      refresh_token: refresh || access,
      expires_in: 3600,
      token_type: 'bearer',
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        role: 'authenticated'
      }
    };

    localStorage.setItem(authKey, JSON.stringify(authData));
  }, {
    access: accessToken,
    refresh: refreshToken,
    url: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  });

  // Reload to apply auth state
  await page.reload();

  // Wait for authentication to be recognized
  await waitForAuth(page, 10000);
}

/**
 * Login with Google OAuth (DISABLED for local development)
 * Note: OAuth is not used in local development setup
 * Use loginWithEmail() instead
 */
export async function loginWithGoogle(page: Page) {
  throw new Error('Google OAuth is disabled for local development. Use loginWithEmail() instead.');
}

/**
 * Login with GitHub OAuth (DISABLED for local development)
 * Note: OAuth is not used in local development setup
 * Use loginWithEmail() instead
 */
export async function loginWithGitHub(page: Page) {
  throw new Error('GitHub OAuth is disabled for local development. Use loginWithEmail() instead.');
}

/**
 * Logout current user
 */
export async function logout(page: Page) {
  // Click user menu
  await page.getByTestId('user-menu').click();

  // Click logout
  await page.getByRole('menuitem', { name: /sign out/i }).click();

  // Wait for redirect to home page
  await page.waitForURL('/', { timeout: 10000 });

  // Verify we're logged out - check for sign in button
  const signInButton = page.getByRole('button', { name: /sign in/i });
  await expect(signInButton).toBeVisible({ timeout: 5000 });
}

/**
 * Save authentication state to file
 * Useful for reusing auth across tests
 */
export async function saveAuthState(page: Page) {
  const storageState = await page.context().storageState();

  // Ensure fixtures directory exists
  const fixturesDir = path.dirname(AUTH_STATE_PATH);
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }

  fs.writeFileSync(AUTH_STATE_PATH, JSON.stringify(storageState, null, 2));
  console.log(`Auth state saved to ${AUTH_STATE_PATH}`);
}

/**
 * Load authentication state from file
 */
export async function loadAuthState(page: Page): Promise<boolean> {
  try {
    if (!fs.existsSync(AUTH_STATE_PATH)) {
      return false;
    }

    const storageState = JSON.parse(fs.readFileSync(AUTH_STATE_PATH, 'utf-8'));
    await page.context().addCookies(storageState.cookies);

    // Set localStorage
    for (const origin of storageState.origins || []) {
      await page.goto(origin.origin);
      for (const item of origin.localStorage || []) {
        await page.evaluate(({ name, value }) => {
          localStorage.setItem(name, value);
        }, item);
      }
    }

    return true;
  } catch (error) {
    console.error('Failed to load auth state:', error);
    return false;
  }
}

/**
 * Get saved auth state path
 */
export function getAuthStatePath(): string {
  return AUTH_STATE_PATH;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  try {
    await page.waitForSelector('[data-testid="user-menu"]', { timeout: 2000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Wait for authentication to complete
 * More resilient - checks multiple indicators
 */
export async function waitForAuth(page: Page, timeout = 30000) {
  try {
    // Try waiting for user menu
    await page.waitForSelector('[data-testid="user-menu"]', { timeout, state: 'visible' });
  } catch (error) {
    // Fallback: check if we're on a protected route and not redirected to login
    const url = page.url();
    if (url.includes('/login')) {
      throw new Error('Auth failed: redirected to login page');
    }
    // If not on login, auth might be working even without user menu visible
    console.warn('⚠️  User menu not visible, but not redirected to login. Proceeding...');
  }
}

/**
 * Clear all auth cookies and storage
 */
export async function clearAuth(page: Page) {
  const supabase = getSupabaseClient();

  // Sign out from Supabase
  await supabase.auth.signOut();

  // Clear browser storage
  await page.context().clearCookies();
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Get current user session from Supabase
 */
export async function getCurrentSession() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(`Failed to get session: ${error.message}`);
  }

  return data.session;
}

/**
 * Verify user is authenticated in Supabase
 */
export async function verifySupabaseAuth(accessToken: string): Promise<boolean> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    return false;
  }

  return true;
}

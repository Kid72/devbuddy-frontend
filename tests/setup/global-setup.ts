import { chromium, FullConfig } from '@playwright/test';
import { createTestUser, getAuthToken, setAuthState, saveAuthState } from '../utils/auth';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

/**
 * Global setup for Playwright tests
 * Runs once before all tests to prepare the test environment
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Running global test setup...');

  // Load environment variables
  loadEnvironmentVariables();

  // Verify required environment variables
  verifyEnvironmentVariables();

  // Create test user in Supabase if doesn't exist
  await setupTestUser();

  // Setup authentication state
  await setupAuthState(config);

  // Verify backend API is running (optional)
  await verifyBackendApi();

  console.log('✅ Global setup completed successfully');
}

/**
 * Load environment variables from multiple sources
 */
function loadEnvironmentVariables() {
  const envFiles = [
    path.resolve(__dirname, '../.env.test'),
    path.resolve(__dirname, '../../.env.local'),
    path.resolve(__dirname, '../../.env'),
  ];

  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      console.log(`📄 Loading environment from: ${envFile}`);
      dotenv.config({ path: envFile });
    }
  }

  // Also load from playwright.env as template
  const playwrightEnv = path.resolve(__dirname, '../playwright.env');
  if (fs.existsSync(playwrightEnv)) {
    dotenv.config({ path: playwrightEnv });
  }
}

/**
 * Verify all required environment variables are set
 */
function verifyEnvironmentVariables() {
  const required = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'TEST_USER_EMAIL',
    'TEST_USER_PASSWORD',
  ];

  const missing: string[] = [];

  for (const varName of required) {
    const value = process.env[varName] || process.env[`NEXT_PUBLIC_${varName}`];
    if (!value) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error('\n💡 Copy tests/playwright.env to tests/.env.test and fill in your values');
    throw new Error('Missing required environment variables');
  }

  console.log('✅ All required environment variables are set');
}

/**
 * Create test user in Supabase if doesn't exist
 */
async function setupTestUser() {
  const email = process.env.TEST_USER_EMAIL!;
  const password = process.env.TEST_USER_PASSWORD!;

  console.log(`👤 Setting up test user: ${email}`);

  try {
    const wasCreated = await createTestUser(email, password);

    if (wasCreated) {
      console.log('✅ Test user created successfully');
    } else {
      console.log('✅ Test user already exists');
    }

    // Verify we can authenticate
    const token = await getAuthToken(email, password);
    if (!token) {
      throw new Error('Failed to get auth token for test user');
    }

    console.log('✅ Test user authentication verified');
  } catch (error) {
    console.error('❌ Failed to setup test user:', error);
    throw error;
  }
}

/**
 * Setup authentication state for tests
 * Creates a saved auth state file that tests can reuse
 */
async function setupAuthState(config: FullConfig) {
  const email = process.env.TEST_USER_EMAIL!;
  const password = process.env.TEST_USER_PASSWORD!;
  const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL || config.projects[0]?.use?.baseURL || 'http://localhost:3000';

  console.log('🔐 Setting up authentication state...');

  try {
    // Get auth token
    const token = await getAuthToken(email, password);

    // Launch browser to set auth state
    const browser = await chromium.launch();
    const context = await browser.newContext({
      baseURL,
    });
    const page = await context.newPage();

    // Set authentication state
    await setAuthState(page, token);

    // Navigate to dashboard to verify auth works
    await page.goto('/dashboard');

    // Wait a bit for any redirects or auth checks
    await page.waitForTimeout(2000);

    // Check if we're authenticated
    const isAuth = await page.locator('[data-testid="user-menu"]').isVisible().catch(() => false);

    if (!isAuth) {
      console.warn('⚠️  Authentication state may not be properly set');
    } else {
      console.log('✅ Authentication state verified');
    }

    // Save auth state to file
    await saveAuthState(page);

    // Cleanup
    await context.close();
    await browser.close();

    console.log('✅ Authentication state saved');
  } catch (error) {
    console.error('❌ Failed to setup auth state:', error);
    // Don't throw - tests can still run by logging in manually
    console.warn('⚠️  Tests will need to authenticate manually');
  }
}

/**
 * Verify backend API is running (if applicable)
 */
async function verifyBackendApi() {
  const apiUrl = process.env.API_BASE_URL;

  if (!apiUrl) {
    console.log('ℹ️  No API_BASE_URL set, skipping backend verification');
    return;
  }

  console.log(`🔍 Verifying backend API at: ${apiUrl}`);

  try {
    const response = await fetch(`${apiUrl}/health`).catch(() => null);

    if (response && response.ok) {
      console.log('✅ Backend API is running');
    } else {
      console.warn('⚠️  Backend API health check failed');
      console.warn('   Tests may fail if they depend on backend endpoints');
    }
  } catch (error) {
    console.warn('⚠️  Could not verify backend API:', error);
  }
}

export default globalSetup;

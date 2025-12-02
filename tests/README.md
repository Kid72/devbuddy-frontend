# DevBuddy E2E Tests

Comprehensive end-to-end test suite for DevBuddy application using Playwright.

## 🎯 Test Coverage

### Authentication Tests (`auth.spec.ts`)
- ✅ Redirect to login when not authenticated
- ✅ Login with Google OAuth (mocked)
- ✅ Login with GitHub OAuth (mocked)
- ✅ Logout and clear session
- ✅ Session persistence across page refreshes
- ✅ User info display in navigation
- ✅ OAuth error handling

### Protected Routes Tests (`protected-routes.spec.ts`)
- ✅ Redirect unauthenticated users from protected routes
- ✅ CV upload protection
- ✅ Job alerts protection
- ✅ Direct URL access attempts
- ✅ Redirect URL preservation
- ✅ Authenticated access to protected routes
- ✅ Session expiration handling

### Public Features Tests (`public-features.spec.ts`)
- ✅ News articles access without auth
- ✅ Browse and read news articles
- ✅ Filter news by category
- ✅ Search news articles
- ✅ Learning platform access without auth
- ✅ Browse programming languages and topics
- ✅ View learning content and code examples
- ✅ Interview questions access without auth
- ✅ Filter questions by category and difficulty
- ✅ Read interview questions and answers
- ✅ Homepage functionality
- ✅ Mobile responsiveness

### CV Workflow Tests (`cv-workflow.spec.ts`)
- ✅ Upload CV file
- ✅ View AI improvements
- ✅ Accept/reject AI suggestions
- ✅ Download CV as DOCX
- ✅ Download CV as PDF
- ✅ Upload progress indication
- ✅ Upload error handling
- ✅ List uploaded CVs
- ✅ Delete CV

### Jobs Tests (`jobs.spec.ts`)
- ✅ Browse jobs without authentication
- ✅ View job details
- ✅ Filter jobs by location
- ✅ Search jobs by keyword
- ✅ Create job alert (requires auth)
- ✅ List user job alerts
- ✅ Edit job alert
- ✅ Delete job alert
- ✅ Toggle alert active status
- ✅ Alert notifications
- ✅ Save jobs for later
- ✅ View saved jobs

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

### Run Specific Tests

```bash
# Run only auth tests
npx playwright test auth.spec.ts

# Run only on Chromium
npx playwright test --project=chromium

# Run specific test
npx playwright test -g "should login with Google"
```

## 📁 Project Structure

```
tests/
├── auth.spec.ts              # Authentication flow tests
├── protected-routes.spec.ts  # Route protection tests
├── public-features.spec.ts   # Public access tests
├── cv-workflow.spec.ts       # CV features tests
├── jobs.spec.ts              # Jobs features tests
├── utils/
│   ├── auth.ts              # Authentication utilities
│   └── fixtures.ts          # Custom test fixtures
├── fixtures/
│   ├── sample-cv.pdf        # Test CV file
│   └── auth-state.json      # Saved auth state
└── README.md                # This file
```

## 🛠️ Test Utilities

### Authentication Helpers

```typescript
import { loginWithGoogle, loginWithGitHub, logout } from './utils/auth';

// Login with Google
await loginWithGoogle(page);

// Login with GitHub
await loginWithGitHub(page);

// Logout
await logout(page);

// Check auth status
const isAuth = await isAuthenticated(page);

// Mock OAuth callback
await mockOAuthCallback(page, 'google');
```

### Custom Fixtures

```typescript
import { test, expect } from './utils/fixtures';

// Use authenticated page
test('my test', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/dashboard');
});

// Use unauthenticated page
test('my test', async ({ unauthenticatedPage }) => {
  await unauthenticatedPage.goto('/');
});
```

### Test Data

```typescript
import { testData } from './utils/fixtures';

// Use predefined test data
await page.fill('[name="email"]', testData.users.validUser.email);
```

## 🎨 Best Practices

### 1. Use Test IDs

Add data-testid attributes to key elements:

```tsx
<button data-testid="user-menu">Menu</button>
```

Access in tests:

```typescript
await page.getByTestId('user-menu').click();
```

### 2. Wait for Network Requests

```typescript
import { helpers } from './utils/fixtures';

// Wait for specific API call
await helpers.waitForApiResponse(page, '/api/cv/upload');

// Wait for network idle
await helpers.waitForNetworkIdle(page);
```

### 3. Mock API Responses

```typescript
await page.route('**/api/cv/**', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ id: '123', status: 'success' })
  });
});
```

### 4. Use Page Object Pattern (Optional)

For complex pages, create page objects:

```typescript
class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.fill('[name="email"]', email);
    await this.page.fill('[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
```

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

Key configurations:
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Workers**: Parallel execution (1 on CI)
- **Retries**: 2 on CI, 0 locally
- **Screenshots**: On failure
- **Videos**: Retain on failure
- **Traces**: On first retry

### Environment Variables

Create `.env.test` for test-specific config:

```bash
PLAYWRIGHT_TEST_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-test-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-test-key
```

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npm run test:e2e:report
```

Reports include:
- Test results by browser
- Screenshots of failures
- Videos of failed tests
- Traces for debugging

## 🐛 Debugging

### Debug Mode

```bash
# Run in debug mode
npm run test:e2e:debug

# Debug specific test
npx playwright test auth.spec.ts --debug
```

### UI Mode

```bash
# Interactive UI mode
npm run test:e2e:ui
```

### Screenshots

Take manual screenshots:

```typescript
import { helpers } from './utils/fixtures';

await helpers.takeTimestampedScreenshot(page, 'my-test');
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📝 Writing New Tests

### Template

```typescript
import { test, expect } from './utils/fixtures';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/feature');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
    await page.click('button');
    await expect(page.locator('.result')).toBeVisible();
  });

  test('should handle errors', async ({ page }) => {
    // Mock error
    await page.route('**/api/**', route => route.abort());

    // Test error handling
    await page.click('button');
    await expect(page.locator('.error')).toBeVisible();
  });
});
```

## 🤝 Contributing

When adding new tests:

1. Follow the existing test structure
2. Use descriptive test names
3. Add data-testid attributes to components
4. Mock external API calls
5. Include both happy path and error cases
6. Update this README

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Test Patterns](https://playwright.dev/docs/test-patterns)
- [API Reference](https://playwright.dev/docs/api/class-test)

## 🎯 Test Metrics

Target metrics:
- **Coverage**: >80% of critical user flows
- **Speed**: All tests <5 minutes
- **Reliability**: >95% pass rate
- **Maintenance**: Tests updated with features

## 🔐 Real Supabase Authentication

### Setup Instructions

1. **Create Test Environment File**

```bash
cd tests
cp playwright.env .env.test
```

2. **Configure Supabase Credentials**

Edit `tests/.env.test` and add your Supabase credentials:

```bash
# Required
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
TEST_USER_EMAIL=playwright-test@example.com
TEST_USER_PASSWORD=PlaywrightTest123!@#

# Optional: For real OAuth testing
GOOGLE_TEST_EMAIL=test@gmail.com
GOOGLE_TEST_PASSWORD=YourSecurePassword
GITHUB_TEST_USERNAME=your-test-user
GITHUB_TEST_PASSWORD=YourSecurePassword
```

3. **Create Test User in Supabase**

The global setup will automatically create the test user. Alternatively, create manually:

```bash
# The user will be created automatically on first test run
npm run test:e2e
```

Or create via Supabase Dashboard:
- Go to Authentication > Users
- Click "Add User"
- Email: `playwright-test@example.com`
- Password: `PlaywrightTest123!@#`
- Auto-confirm user: Yes

### Running Tests with Real Supabase

```bash
# Run all tests (will use real Supabase auth)
npm run test:e2e

# Run specific test file
npx playwright test auth.spec.ts

# Run in UI mode for debugging
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug
```

### How It Works

1. **Global Setup** (`tests/setup/global-setup.ts`):
   - Loads environment variables
   - Creates test user in Supabase if doesn't exist
   - Generates authentication token
   - Saves auth state to file for reuse
   - Verifies backend API is running

2. **Auth Utilities** (`tests/utils/auth.ts`):
   - `loginWithEmail()` - Login with email/password
   - `getAuthToken()` - Get JWT token from Supabase
   - `setAuthState()` - Set auth state directly (faster)
   - `saveAuthState()` - Save auth state to file
   - `loadAuthState()` - Load auth state from file
   - `loginWithGoogle()` - Real Google OAuth flow
   - `loginWithGitHub()` - Real GitHub OAuth flow

3. **Test Execution**:
   - Tests can load saved auth state for speed
   - Or login fresh for each test
   - Auth state persists across test runs

### Authentication Patterns

#### Fast: Use Saved Auth State
```typescript
import { test } from '@playwright/test';
import { loadAuthState } from './utils/auth';

test('my protected feature', async ({ page }) => {
  // Load pre-authenticated state
  await loadAuthState(page);
  await page.goto('/dashboard');

  // Test authenticated features
});
```

#### Fresh: Login for Each Test
```typescript
import { test } from '@playwright/test';
import { loginWithEmail } from './utils/auth';

test('my test', async ({ page }) => {
  await loginWithEmail(
    page,
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!
  );

  // Test authenticated features
});
```

#### Real OAuth Testing
```typescript
import { test } from '@playwright/test';
import { loginWithGoogle } from './utils/auth';

test('Google OAuth', async ({ page }) => {
  // Requires GOOGLE_TEST_EMAIL and GOOGLE_TEST_PASSWORD
  await loginWithGoogle(page);

  // Test OAuth features
});
```

### Troubleshooting

#### Test User Not Created
```bash
# Check Supabase credentials
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# Verify credentials in .env.test
cat tests/.env.test

# Check Supabase Dashboard > Authentication > Users
# Manually create user if needed
```

#### Authentication Fails
```bash
# Clear saved auth state
rm tests/fixtures/auth-state.json

# Run tests again to regenerate
npm run test:e2e

# Check Supabase logs in Dashboard
```

#### Tests Timeout
```bash
# Increase timeouts in tests/.env.test
TEST_TIMEOUT=60000
ACTION_TIMEOUT=15000

# Or in playwright.config.ts
```

#### OAuth Tests Fail
```bash
# Ensure OAuth credentials are set
echo $GOOGLE_TEST_EMAIL
echo $GITHUB_TEST_USERNAME

# OAuth tests require real provider accounts
# Consider using email/password tests instead for CI
```

### CI/CD Configuration

For GitHub Actions or other CI platforms:

```yaml
env:
  SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
  TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
  TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
```

Add these as repository secrets in your CI platform.

### Best Practices

1. **Use Saved Auth State**: Faster test execution
2. **Separate Test Supabase Project**: Don't use production
3. **Auto-confirm Test Users**: Skip email verification
4. **Clean Test Data**: Reset between test runs if needed
5. **Monitor Rate Limits**: Supabase has API rate limits

### Example Commands

```bash
# Setup tests for first time
cp tests/playwright.env tests/.env.test
# Edit .env.test with your credentials
npm run test:e2e

# Run specific test suite
npx playwright test auth.spec.ts

# Debug specific test
npx playwright test auth.spec.ts --debug

# Run with specific browser
npx playwright test --project=chromium

# View test report
npm run test:e2e:report

# Clean and restart
rm tests/fixtures/auth-state.json
npm run test:e2e
```

---

**Last Updated**: 2025-11-20
**Playwright Version**: 1.56.1
**Node Version**: 18+
**Supabase Integration**: Real authentication with JWT tokens

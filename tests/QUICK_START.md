# Quick Start Guide - Playwright E2E Tests

Get up and running with DevBuddy E2E tests in 5 minutes.

## ✅ Prerequisites

- Node.js 18+ installed
- DevBuddy frontend project cloned
- Dependencies installed (`npm install`)

## 🚀 Quick Setup

### 1. Install Playwright (Already Done!)

```bash
npm install -D @playwright/test
npx playwright install
```

✅ **Status**: Playwright and browsers are installed!

### 2. Run Your First Test

```bash
# Run all tests
npm run test:e2e
```

### 3. View Tests Interactively

```bash
# Launch Playwright UI
npm run test:e2e:ui
```

## 📋 Available Test Suites

| Test Suite | Description | # Tests |
|-----------|-------------|---------|
| `auth.spec.ts` | Authentication flows | 10 |
| `protected-routes.spec.ts` | Route protection | 15 |
| `public-features.spec.ts` | Public features | 20 |
| `cv-workflow.spec.ts` | CV upload & improvements | 11 |
| `jobs.spec.ts` | Job browsing & alerts | 15 |

**Total**: 71+ comprehensive tests

## 🎯 Common Commands

```bash
# Run all tests
npm run test:e2e

# Run specific test file
npx playwright test auth.spec.ts

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests with inspector
npm run test:e2e:debug

# Run only Chromium tests
npx playwright test --project=chromium

# Run specific test by name
npx playwright test -g "should login with Google"

# View last test report
npm run test:e2e:report
```

## 🔍 Test by Feature

### Test Authentication
```bash
npx playwright test auth.spec.ts
```

### Test Protected Routes
```bash
npx playwright test protected-routes.spec.ts
```

### Test Public Features
```bash
npx playwright test public-features.spec.ts
```

### Test CV Workflow
```bash
npx playwright test cv-workflow.spec.ts
```

### Test Jobs
```bash
npx playwright test jobs.spec.ts
```

## 🐛 Debugging Failed Tests

### 1. Run in Debug Mode
```bash
npm run test:e2e:debug
```

### 2. View Trace
```bash
npx playwright show-trace trace.zip
```

### 3. Check Screenshots
Failed tests automatically save screenshots to `test-results/`

### 4. Use UI Mode
```bash
npm run test:e2e:ui
```

## 🎨 Test Structure

```typescript
import { test, expect } from './utils/fixtures';

test.describe('Feature Name', () => {
  // Runs before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/feature');
  });

  // Test case
  test('should do something', async ({ page }) => {
    await page.click('button');
    await expect(page.locator('.result')).toBeVisible();
  });
});
```

## 🔐 Authentication in Tests

### Use Authenticated Page
```typescript
test('protected feature', async ({ authenticatedPage }) => {
  // Already logged in!
  await authenticatedPage.goto('/dashboard');
});
```

### Use Unauthenticated Page
```typescript
test('public feature', async ({ unauthenticatedPage }) => {
  await unauthenticatedPage.goto('/');
});
```

### Mock OAuth
```typescript
import { mockOAuthCallback } from './utils/auth';

await mockOAuthCallback(page, 'google');
await page.goto('/');
await page.click('button[name="sign-in"]');
```

## 📊 Understanding Test Results

### Pass ✅
```
✓ tests/auth.spec.ts:15:7 › should login with Google (2.1s)
```

### Fail ❌
```
✗ tests/auth.spec.ts:25:7 › should logout (1.5s)
  Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
```

### Skip ⊘
```
⊘ tests/auth.spec.ts:35:7 › should reset password
```

## 🎯 Test Coverage Areas

### ✅ Covered Features
- ✓ Google OAuth login
- ✓ GitHub OAuth login
- ✓ Protected route access
- ✓ CV upload and improvements
- ✓ Job browsing and alerts
- ✓ Public content access
- ✓ Session management
- ✓ Error handling

### 🚧 To Be Added
- Real OAuth integration tests
- Performance tests
- Visual regression tests
- Accessibility tests

## 🔧 Configuration

### Base URL
Default: `http://localhost:3000`

Override in `.env.test`:
```bash
PLAYWRIGHT_TEST_BASE_URL=http://localhost:3001
```

### Browsers
Tests run on:
- ✓ Chromium (Desktop)
- ✓ Firefox (Desktop)
- ✓ WebKit (Safari)
- ✓ Mobile Chrome
- ✓ Mobile Safari

### Parallel Execution
- **Local**: Full parallelization
- **CI**: Sequential execution

## 📝 Adding New Tests

### Step 1: Create Test File
```bash
touch tests/my-feature.spec.ts
```

### Step 2: Write Test
```typescript
import { test, expect } from './utils/fixtures';

test.describe('My Feature', () => {
  test('should work', async ({ page }) => {
    await page.goto('/my-feature');
    await expect(page).toHaveTitle(/My Feature/);
  });
});
```

### Step 3: Run Test
```bash
npx playwright test my-feature.spec.ts
```

## 🎓 Learning Resources

### Official Docs
- [Playwright Docs](https://playwright.dev)
- [Test API](https://playwright.dev/docs/api/class-test)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)

### Video Tutorials
- [Playwright Tutorial Series](https://www.youtube.com/playlist?list=PLhW3qG5bs-L9sJKoT1LC5grGT77sfW0Z8)

### Best Practices
- [Testing Best Practices](https://playwright.dev/docs/best-practices)

## 💡 Tips & Tricks

### 1. Use Test IDs
```tsx
<button data-testid="submit-button">Submit</button>
```
```typescript
await page.getByTestId('submit-button').click();
```

### 2. Wait for API Calls
```typescript
await page.waitForResponse(response =>
  response.url().includes('/api/data')
);
```

### 3. Mock API Responses
```typescript
await page.route('**/api/**', route =>
  route.fulfill({ body: JSON.stringify({ success: true }) })
);
```

### 4. Take Screenshots
```typescript
await page.screenshot({ path: 'screenshot.png' });
```

### 5. Retry Flaky Tests
```typescript
test('flaky test', async ({ page }) => {
  // Auto-retried on failure
});
```

## 🚨 Troubleshooting

### Problem: Tests timeout
**Solution**: Increase timeout in config
```typescript
use: { actionTimeout: 30000 }
```

### Problem: Element not found
**Solution**: Use better locators
```typescript
// ❌ Bad
await page.click('.button');

// ✅ Good
await page.getByRole('button', { name: 'Submit' }).click();
```

### Problem: Tests fail on CI
**Solution**: Check CI-specific config
```typescript
workers: process.env.CI ? 1 : undefined
```

### Problem: Browsers not installed
**Solution**: Reinstall browsers
```bash
npx playwright install --force
```

## 📞 Getting Help

1. Check test logs in `test-results/`
2. View HTML report: `npm run test:e2e:report`
3. Run in debug mode: `npm run test:e2e:debug`
4. Check [Playwright Discord](https://discord.gg/playwright)

## ✨ Next Steps

1. ✅ Run all tests: `npm run test:e2e`
2. ✅ Explore UI mode: `npm run test:e2e:ui`
3. ✅ Review test report: `npm run test:e2e:report`
4. 🚀 Add your own tests!

---

**Happy Testing!** 🎭

For detailed documentation, see [README.md](./README.md)

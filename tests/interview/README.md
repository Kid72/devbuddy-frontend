# Interview Feature E2E Tests

Comprehensive Playwright test suite for the Interview Preparation feature.

## Test Coverage

### 72 Total Tests Across 8 Suites:

1. **Landing Page** (8 tests)
   - Page title and question count display
   - Language category cards
   - Navigation to language-specific pages
   - Empty data handling
   - Keyboard accessibility

2. **Questions List** (9 tests)
   - Page metadata display
   - Question card rendering
   - Difficulty filtering
   - Search functionality
   - Filter clearing
   - Navigation to question detail
   - Pagination
   - Partial data handling
   - Back navigation

3. **Question Detail** (7 tests)
   - Question header with all metadata
   - Answer section toggle
   - Video section display
   - Previous/next navigation
   - Back to list navigation
   - Navigation controls

4. **Loading & Error Handling** (7 tests)
   - Loading states (list and detail pages)
   - 500 server errors
   - 404 not found
   - Empty data scenarios
   - Retry on error
   - Network timeout handling

5. **Component Tests** (18 tests)
   - SearchBar: input, clear button, filtering
   - Pagination: display, navigation, button states
   - QuestionCard: metadata display, video indicator, navigation
   - AnswerSection: toggle, markdown rendering
   - VideoEmbed: display, YouTube links

6. **Responsive Design** (6 tests)
   - Mobile layout (375x667)
   - Tablet layout (768x1024)
   - Desktop layout (1920x1080)
   - Touch targets
   - Orientation changes
   - Small screens (320x568)

7. **Edge Cases** (8 tests)
   - Single question handling
   - Very long titles
   - Many tags
   - Special characters in search
   - Rapid filter changes
   - Browser back button
   - Empty search results
   - Invalid question IDs

8. **Accessibility** (9 tests)
   - Keyboard navigation (landing, list, detail)
   - Heading hierarchy
   - Descriptive button text
   - Color contrast
   - Screen reader navigation
   - Dynamic content announcements
   - Focus management

## Running Tests

### Run All Interview Tests
```bash
npm run test:e2e:interview
# or
npx playwright test --config=playwright.interview.config.ts
```

### Run Specific Suite
```bash
npx playwright test tests/interview/landing-page.spec.ts --config=playwright.interview.config.ts
npx playwright test tests/interview/questions-list.spec.ts --config=playwright.interview.config.ts
```

### Run in Specific Browser
```bash
npx playwright test --config=playwright.interview.config.ts --project=chromium
npx playwright test --config=playwright.interview.config.ts --project=firefox
npx playwright test --config=playwright.interview.config.ts --project=webkit
```

### Run in Headed Mode (see browser)
```bash
npx playwright test --config=playwright.interview.config.ts --headed
```

### Debug Tests
```bash
npx playwright test --config=playwright.interview.config.ts --debug
```

### View Test Report
```bash
npx playwright show-report test-results/interview-report
```

## Test Infrastructure

### Mock Data (`tests/fixtures/interview-data.ts`)
- 45 realistic interview questions (20 Java, 25 Go)
- Full markdown answers with code examples
- Mock statistics and categories
- Helper functions for filtering and searching

### API Mocks (`tests/utils/interview-mocks.ts`)
- `mockAllInterviewAPIs()` - Mock all endpoints
- `mockSlowAPI()` - Simulate network delay
- `mockAPIError()` - Simulate errors
- `mockFlakyAPI()` - Simulate unreliable network
- `mockEmptyData()` - Test with no data
- `mockPartialData()` - Test with limited data
- `simulateNetworkCondition()` - Different network speeds

### Test IDs
All components include `data-testid` attributes for reliable selectors:
- `page-title`, `total-questions-badge`
- `language-card-{slug}`, `question-card`
- `search-input`, `search-clear`
- `difficulty-filter`, `clear-filters`
- `question-header`, `answer-section`, `video-section`
- `loading-state`, `error-state`

## Configuration

The interview tests use a separate configuration (`playwright.interview.config.ts`) that:
- Skips global setup (no Supabase connection needed)
- Uses API mocking for all backend calls
- Runs tests independently without authentication
- Tests across 5 browser configurations (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)

## Notes

- Tests use API mocking, so no backend connection required
- Dev server (port 3000) starts automatically
- Tests run in parallel by default
- Screenshots/videos captured on failure
- HTML report generated after each run

/**
 * Mock data for the TestForge dashboard demo.
 * In production, replace with TestForgeClient calls.
 */
import type {
  Project,
  TestSuite,
  TestRun,
  TestCaseResult,
  DashboardStats,
  StepSuggestion,
} from '../types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'E-Commerce Platform',
    description: 'Full checkout and inventory flow tests',
    repositoryUrl: 'https://github.com/acme/ecommerce',
    defaultBranch: 'main',
    environments: ['staging', 'production'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-10T14:30:00Z',
  },
  {
    id: 'proj-2',
    name: 'Payment Gateway API',
    description: 'REST API contract tests for payment processing',
    repositoryUrl: 'https://github.com/acme/payments',
    defaultBranch: 'main',
    environments: ['dev', 'staging'],
    createdAt: '2024-02-20T09:00:00Z',
    updatedAt: '2024-06-09T11:15:00Z',
  },
  {
    id: 'proj-3',
    name: 'Mobile App (iOS/Android)',
    description: 'Cross-platform UI flows',
    repositoryUrl: 'https://github.com/acme/mobile',
    defaultBranch: 'develop',
    environments: ['staging'],
    createdAt: '2024-03-01T08:00:00Z',
    updatedAt: '2024-06-08T16:45:00Z',
  },
];

export const MOCK_SUITES: TestSuite[] = [
  { id: 'suite-1', name: 'Login & Auth', description: 'Authentication flows', projectId: 'proj-1', tags: ['auth', 'critical'], caseCount: 12, createdAt: '2024-01-20T10:00:00Z', updatedAt: '2024-06-01T10:00:00Z' },
  { id: 'suite-2', name: 'Checkout Flow', description: 'End-to-end cart and payment', projectId: 'proj-1', tags: ['e2e', 'payment'], caseCount: 8, createdAt: '2024-01-22T10:00:00Z', updatedAt: '2024-06-02T10:00:00Z' },
  { id: 'suite-3', name: 'Product Search', description: 'Search and filter tests', projectId: 'proj-1', tags: ['search'], caseCount: 15, createdAt: '2024-02-01T10:00:00Z', updatedAt: '2024-06-03T10:00:00Z' },
  { id: 'suite-4', name: 'Payment Endpoints', description: 'REST contract tests', projectId: 'proj-2', tags: ['api', 'critical'], caseCount: 20, createdAt: '2024-02-25T10:00:00Z', updatedAt: '2024-06-04T10:00:00Z' },
  { id: 'suite-5', name: 'Onboarding Flow', description: 'New user onboarding', projectId: 'proj-3', tags: ['mobile', 'onboarding'], caseCount: 6, createdAt: '2024-03-05T10:00:00Z', updatedAt: '2024-06-05T10:00:00Z' },
];

export const MOCK_RUNS: TestRun[] = [
  { id: 'run-1', projectId: 'proj-1', projectName: 'E-Commerce Platform', branch: 'main', commitSha: 'a1b2c3d', status: 'passed', passRate: 1.0, totalCases: 20, passedCases: 20, failedCases: 0, duration: 145000, startedAt: '2024-06-10T14:00:00Z', finishedAt: '2024-06-10T14:02:25Z', triggeredBy: 'github-push' },
  { id: 'run-2', projectId: 'proj-1', projectName: 'E-Commerce Platform', branch: 'feature/new-checkout', commitSha: 'e4f5g6h', status: 'failed', passRate: 0.75, totalCases: 20, passedCases: 15, failedCases: 5, duration: 130000, startedAt: '2024-06-10T12:00:00Z', finishedAt: '2024-06-10T12:02:10Z', triggeredBy: 'github-pr' },
  { id: 'run-3', projectId: 'proj-2', projectName: 'Payment Gateway API', branch: 'main', commitSha: 'i7j8k9l', status: 'passed', passRate: 1.0, totalCases: 20, passedCases: 20, failedCases: 0, duration: 45000, startedAt: '2024-06-10T11:00:00Z', finishedAt: '2024-06-10T11:00:45Z', triggeredBy: 'github-push' },
  { id: 'run-4', projectId: 'proj-3', projectName: 'Mobile App (iOS/Android)', branch: 'develop', status: 'running', passRate: 0.5, totalCases: 6, passedCases: 3, failedCases: 0, duration: 0, startedAt: '2024-06-10T14:30:00Z', triggeredBy: 'manual' },
  { id: 'run-5', projectId: 'proj-1', projectName: 'E-Commerce Platform', branch: 'main', commitSha: 'z9y8x7w', status: 'passed', passRate: 0.95, totalCases: 20, passedCases: 19, failedCases: 1, duration: 150000, startedAt: '2024-06-09T18:00:00Z', finishedAt: '2024-06-09T18:02:30Z', triggeredBy: 'schedule' },
  { id: 'run-6', projectId: 'proj-2', projectName: 'Payment Gateway API', branch: 'hotfix/timeout', commitSha: 'v6u5t4s', status: 'aborted', passRate: 0.3, totalCases: 20, passedCases: 6, failedCases: 4, duration: 30000, startedAt: '2024-06-09T15:00:00Z', finishedAt: '2024-06-09T15:00:30Z', triggeredBy: 'github-push' },
];

export const MOCK_RUN_RESULTS: Record<string, TestCaseResult[]> = {
  'run-1': [
    { caseId: 'case-1', caseName: 'User can log in with valid credentials', runId: 'run-1', status: 'passed', duration: 3200, steps: [
      { stepId: 's1', order: 1, type: 'ui', command: 'navigate', status: 'passed', duration: 800, locatorUsed: '#email' },
      { stepId: 's2', order: 2, type: 'ui', command: 'fill', status: 'passed', duration: 200, locatorUsed: '#email' },
      { stepId: 's3', order: 3, type: 'ui', command: 'fill', status: 'passed', duration: 150, locatorUsed: '#password' },
      { stepId: 's4', order: 4, type: 'ui', command: 'click', status: 'passed', duration: 1200, locatorUsed: '[data-testid="login-btn"]' },
      { stepId: 's5', order: 5, type: 'assertion', command: 'assert_url_contains', status: 'passed', duration: 850 },
    ] },
    { caseId: 'case-2', caseName: 'User can add item to cart', runId: 'run-1', status: 'passed', duration: 5100, steps: [
      { stepId: 's6', order: 1, type: 'ui', command: 'click', status: 'passed', duration: 1100, locatorUsed: '.product-card:first-child .add-to-cart' },
      { stepId: 's7', order: 2, type: 'assertion', command: 'assert_text', status: 'passed', duration: 400, locatorUsed: '.cart-count' },
    ] },
  ],
  'run-2': [
    { caseId: 'case-1', caseName: 'User can log in with valid credentials', runId: 'run-2', status: 'passed', duration: 3300, steps: [
      { stepId: 's1', order: 1, type: 'ui', command: 'navigate', status: 'passed', duration: 900 },
      { stepId: 's2', order: 2, type: 'ui', command: 'fill', status: 'passed', duration: 200 },
      { stepId: 's3', order: 3, type: 'ui', command: 'click', status: 'passed', duration: 1100 },
    ] },
    { caseId: 'case-3', caseName: 'Checkout completes with Stripe', runId: 'run-2', status: 'failed', duration: 8400, error: { message: 'Element [data-testid="pay-now"] not found after 5000ms', type: 'LocatorNotFoundError' }, steps: [
      { stepId: 's8', order: 1, type: 'ui', command: 'navigate', status: 'passed', duration: 1000 },
      { stepId: 's9', order: 2, type: 'ui', command: 'click', status: 'passed', duration: 800 },
      { stepId: 's10', order: 3, type: 'ui', command: 'click', status: 'failed', duration: 5000, locatorUsed: '[data-testid="pay-now"]', error: { message: 'Element not found after 5000ms', type: 'LocatorNotFoundError' } },
    ] },
  ],
};

export const MOCK_STATS: DashboardStats = {
  totalProjects: 3,
  totalRuns: 47,
  passRate: 0.84,
  activeRuns: 1,
  recentRuns: MOCK_RUNS.slice(0, 5),
  runsByStatus: { queued: 0, running: 1, passed: 32, failed: 8, aborted: 4, skipped: 2 },
};

export const MOCK_SUGGESTIONS: StepSuggestion[] = [
  { id: 'sug-1', type: 'ui', command: 'click', description: 'Click the "Login" button', confidence: 0.97, parameters: { selector: '[data-testid="login-btn"]', strategy: 'test-id' } },
  { id: 'sug-2', type: 'assertion', command: 'assert_url_contains', description: 'Assert URL contains "/dashboard"', confidence: 0.92, parameters: { value: '/dashboard' } },
  { id: 'sug-3', type: 'ui', command: 'fill', description: 'Fill the email input field', confidence: 0.88, parameters: { selector: '#email', value: '{{user.email}}' } },
];

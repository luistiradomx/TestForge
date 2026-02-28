# TestForge — Motor Unificado de Automatización UI/API

> **Enterprise SaaS platform for unified UI + API test automation** — Web & Mobile.
> Lowcode + Code, AI-assisted by context, semantic multi-candidate localization, deterministic execution, advanced trace viewer, visual regression AI, test impact analysis, GitHub & Azure DevOps integration, multi-branch/multi-environment support, and an extensible plugin architecture.

---

## Architecture

TestForge is a **TypeScript monorepo** using npm workspaces. Each capability is an independent package with clear interfaces, enabling teams to extend, replace, or augment any subsystem via plugins.

```
testforge/
├── packages/
│   ├── core/               # Domain models + interfaces (zero runtime deps)
│   ├── locator-engine/     # Semantic multi-candidate localization + AI scoring
│   ├── execution-engine/   # Deterministic execution state machine
│   ├── trace-viewer/       # Advanced trace recorder, player, and store
│   ├── visual-regression/  # Baseline management + AI diff analysis
│   ├── tia/                # Test Impact Analysis — code change → affected tests
│   ├── ai-assistant/       # AI context-assisted step suggestion (NOT click recorder)
│   ├── plugin-sdk/         # Plugin registry + base classes for extensions
│   ├── api/                # Lightweight Node.js REST backend
│   └── frontend/           # React SaaS dashboard, state management, API client
├── plugins/
│   ├── github-integration/       # GitHub Checks API integration
│   └── azure-devops-integration/ # Azure Pipelines test results integration
├── tsconfig.base.json
└── package.json            # npm workspaces root
```

---

## Key Features

| Feature | Package | Description |
|---------|---------|-------------|
| **Semantic Multi-Candidate Localization** | `locator-engine` | Generates multiple locator candidates (CSS, XPath, ARIA, test-id, text, visual) and ranks them by confidence score using strategy weights, uniqueness, visibility, and resilience factors |
| **AI-Assisted Context (not click recorder)** | `ai-assistant` | Interprets natural-language user intent + accessibility tree context to suggest typed `TestStep` objects. Pluggable `IAIProvider` interface for OpenAI, Azure OpenAI, Anthropic, or local models |
| **Deterministic Execution by State** | `execution-engine` | `ExecutionStateMachine` with 8 explicit states and a transition table — no implicit state changes. Each test run gets an isolated state machine instance |
| **Advanced Trace Viewer** | `trace-viewer` | `TraceRecorder` captures per-step DOM snapshots, network events, and console logs. `TracePlayer` replays at configurable speed with per-step callbacks |
| **Visual Regression AI** | `visual-regression` | `BaselineManager` + `DiffAnalyzer` — pluggable diff engine (pixel diff, SSIM, AI model). Classifies regions by severity. First run auto-registers baseline |
| **Test Impact Analysis (TIA)** | `tia` | `DependencyGraph` with reverse transitive traversal — maps changed files → affected tests. `TestImpactAnalyzer` returns affected/skipped sets with confidence score |
| **GitHub Integration** | `plugins/github-integration` | Posts to GitHub Checks API. Token referenced via `tokenRef` (secrets vault), never stored |
| **Azure DevOps Integration** | `plugins/azure-devops-integration` | Publishes to Azure Pipelines Test Runs API. PAT referenced via `patRef` (secrets vault) |
| **Extensible Plugin Architecture** | `plugin-sdk` | `PluginRegistry`, `BasePlugin`, `BaseCIPlugin` — implement `IPlugin`, `IRunLifecyclePlugin`, `ICIIntegrationPlugin`, or `ILocatorPlugin` |
| **Multi-Branch / Multi-Environment** | `core` | `TestRun.branch`, `EnvironmentConfig` with per-environment variables and credential references |

---

## Quick Start

```bash
# Install all dependencies
npm install

# Run all tests
npm test

# Build all packages
npm run build
```

---

## Plugin Development

```typescript
import { BasePlugin } from '@testforge/plugin-sdk';
import { IRunLifecyclePlugin, TestRun, TestCaseResult } from '@testforge/core';

export class MySlackPlugin extends BasePlugin implements IRunLifecyclePlugin {
  readonly id = 'slack-notifier';
  readonly name = 'Slack Notifier';
  readonly version = '1.0.0';
  readonly description = 'Sends test results to Slack';

  async onRunEnd(run: TestRun, results: TestCaseResult[]): Promise<void> {
    // Post to Slack webhook
  }
}

// Register
import { PluginRegistry } from '@testforge/plugin-sdk';
const registry = new PluginRegistry();
const plugin = new MySlackPlugin();
await plugin.initialize({ webhookRef: 'SLACK_WEBHOOK' });
registry.register(plugin);
```

---

## AI-Assisted Test Generation

```typescript
import { StepSuggestionEngine } from '@testforge/ai-assistant';

const engine = new StepSuggestionEngine();
const suggestions = engine.suggest({
  intent: 'click the login button',
  context: { url: 'https://app.example.com/login', accessibilityTree: '...' },
});
// Returns typed TestStep suggestions ranked by confidence
```

---

## Security

- Credentials (GitHub tokens, Azure PATs) are **never stored** — only `*Ref` keys pointing to a secrets vault
- `EnvironmentCredentials` fields are documented as secret references only
- No dynamic code execution (no `eval`, no `Function()`)
- All packages have zero production dependencies on external HTTP clients (network calls are stubs designed to be completed at integration time)

---

## Test Coverage

77 tests across 11 packages — all passing.

| Package | Tests |
|---------|-------|
| `core` | 4 |
| `locator-engine` | 10 |
| `execution-engine` | 10 |
| `trace-viewer` | 5 |
| `visual-regression` | 5 |
| `tia` | 6 |
| `ai-assistant` | 9 |
| `plugin-sdk` | 6 |
| `api` | 4 |
| `frontend` | 13 |
| `plugin-github` | 3 |
| `plugin-azure-devops` | 2 |

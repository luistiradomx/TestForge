import { useState } from 'react';
import { MOCK_SUGGESTIONS } from '../types/mock-data';
import type { StepSuggestion } from '../types';
import './AIAssistant.css';

const EXAMPLES = [
  'click the login button',
  'fill the email field with test@example.com',
  'assert the page title is "Dashboard"',
  'wait for the spinner to disappear',
  'submit the checkout form',
];

export function AIAssistant() {
  const [intent, setIntent] = useState('');
  const [context, setContext] = useState('https://app.example.com');
  const [suggestions, setSuggestions] = useState<StepSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedSteps, setCopiedSteps] = useState<Set<string>>(new Set());

  function handleGenerate() {
    if (!intent.trim()) return;
    setLoading(true);
    // Simulate async AI call
    setTimeout(() => {
      setSuggestions(MOCK_SUGGESTIONS);
      setLoading(false);
    }, 900);
  }

  function handleExampleClick(example: string) {
    setIntent(example);
  }

  function handleCopy(sug: StepSuggestion) {
    const code = JSON.stringify({ type: sug.type, command: sug.command, parameters: sug.parameters }, null, 2);
    navigator.clipboard.writeText(code).catch(() => undefined);
    setCopiedSteps(prev => new Set(prev).add(sug.id));
    setTimeout(() => {
      setCopiedSteps(prev => { const next = new Set(prev); next.delete(sug.id); return next; });
    }, 2000);
  }

  return (
    <div className="page-content">
      <header className="page-header">
        <div>
          <h1 className="page-title">AI Assistant</h1>
          <span className="page-subtitle">Generate test steps from natural language intent</span>
        </div>
      </header>

      <div className="ai-layout">
        {/* Input panel */}
        <div className="ai-input-panel">
          <div className="card">
            <div className="card__section">
              <label className="form-label">Intent</label>
              <textarea
                className="form-textarea"
                placeholder="Describe what the test should do…"
                value={intent}
                onChange={e => setIntent(e.target.value)}
                rows={3}
              />
              <div className="examples">
                <span className="examples__label">Try:</span>
                {EXAMPLES.map(ex => (
                  <button key={ex} className="example-pill" onClick={() => handleExampleClick(ex)}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <div className="card__section">
              <label className="form-label">Context URL</label>
              <input
                className="form-input"
                type="text"
                value={context}
                onChange={e => setContext(e.target.value)}
                placeholder="https://app.example.com"
              />
            </div>

            <div className="card__section card__section--footer">
              <button
                className="btn btn--primary btn--full"
                onClick={handleGenerate}
                disabled={loading || !intent.trim()}
              >
                {loading ? (
                  <><span className="spinner" /> Generating…</>
                ) : (
                  '✦ Generate Steps'
                )}
              </button>
            </div>
          </div>

          {/* How it works */}
          <div className="how-it-works">
            <h3 className="how-it-works__title">How it works</h3>
            <ol className="how-it-works__list">
              <li>Describe the action in plain language</li>
              <li>The engine maps intent + accessibility tree → typed <code>TestStep</code> objects</li>
              <li>Ranked candidates by confidence score</li>
              <li>Plug in OpenAI, Azure OpenAI, or a local model via <code>IAIProvider</code></li>
            </ol>
          </div>
        </div>

        {/* Suggestions panel */}
        <div className="ai-results-panel">
          {suggestions.length === 0 && !loading && (
            <div className="ai-empty">
              <div className="ai-empty__icon">✦</div>
              <p className="ai-empty__text">Enter an intent and click "Generate Steps"</p>
              <p className="ai-empty__sub">The AI will suggest ranked <code>TestStep</code> objects</p>
            </div>
          )}

          {loading && (
            <div className="ai-loading">
              <div className="ai-loading__bars">
                <span /><span /><span />
              </div>
              <p>Analyzing intent with AI provider…</p>
            </div>
          )}

          {!loading && suggestions.length > 0 && (
            <>
              <h2 className="section-title">Suggestions for "{intent}"</h2>
              <div className="suggestions-list">
                {suggestions.map((sug, idx) => (
                  <div key={sug.id} className="suggestion-card">
                    <div className="suggestion-card__header">
                      <div className="suggestion-rank">#{idx + 1}</div>
                      <div className="suggestion-info">
                        <span className="suggestion-desc">{sug.description}</span>
                        <div className="suggestion-meta">
                          <span className={`step-type-badge step-type-badge--${sug.type}`}>{sug.type}</span>
                          <span className="suggestion-command">{sug.command}</span>
                        </div>
                      </div>
                      <div className="confidence-badge" title="AI confidence score">
                        <div
                          className="confidence-arc"
                          style={{ '--pct': sug.confidence } as React.CSSProperties}
                        />
                        <span className="confidence-value">{Math.round(sug.confidence * 100)}%</span>
                      </div>
                    </div>

                    <div className="suggestion-params">
                      {Object.entries(sug.parameters).map(([k, v]) => (
                        <div key={k} className="param-row">
                          <span className="param-key">{k}</span>
                          <code className="param-val">{String(v)}</code>
                        </div>
                      ))}
                    </div>

                    <div className="suggestion-actions">
                      <button className="action-btn action-btn--primary">
                        + Add to Suite
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => handleCopy(sug)}
                      >
                        {copiedSteps.has(sug.id) ? '✓ Copied' : '⎘ Copy JSON'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

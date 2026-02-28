import './Settings.css';

export function Settings() {
  return (
    <div className="page-content">
      <header className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <span className="page-subtitle">Platform configuration</span>
        </div>
      </header>

      <div className="settings-grid">
        {/* API section */}
        <div className="settings-card">
          <h2 className="settings-card__title">API Connection</h2>
          <div className="settings-form">
            <div className="form-group">
              <label className="form-label">Backend URL</label>
              <input className="form-input" type="text" defaultValue="http://localhost:3000" />
            </div>
            <div className="form-group">
              <label className="form-label">API Version</label>
              <input className="form-input" type="text" defaultValue="v1" readOnly />
            </div>
          </div>
        </div>

        {/* AI section */}
        <div className="settings-card">
          <h2 className="settings-card__title">AI Provider</h2>
          <div className="settings-form">
            <div className="form-group">
              <label className="form-label">Provider</label>
              <select className="form-select">
                <option value="null">NullAIProvider (demo)</option>
                <option value="openai">OpenAI</option>
                <option value="azure">Azure OpenAI</option>
                <option value="local">Local Model</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Model</label>
              <input className="form-input" type="text" defaultValue="gpt-4o" />
            </div>
            <div className="form-group">
              <label className="form-label">API Key Ref (secrets vault)</label>
              <input className="form-input" type="text" placeholder="vault:openai/api-key" />
              <span className="form-hint">Keys are resolved from a secrets vault at runtime — never stored in config.</span>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="settings-card">
          <h2 className="settings-card__title">CI Integrations</h2>
          <div className="integration-list">
            {[
              { name: 'GitHub', icon: '⬡', status: 'connected', desc: 'Reports results to GitHub Checks API' },
              { name: 'Azure DevOps', icon: '⬡', status: 'disconnected', desc: 'Publishes to Azure Pipelines Test Runs' },
              { name: 'Slack', icon: '⬡', status: 'disconnected', desc: 'Run notifications via webhook' },
            ].map(int => (
              <div key={int.name} className="integration-row">
                <div className="integration-icon">{int.icon}</div>
                <div className="integration-info">
                  <span className="integration-name">{int.name}</span>
                  <span className="integration-desc">{int.desc}</span>
                </div>
                <span className={`integration-status integration-status--${int.status}`}>
                  {int.status}
                </span>
                <button className="action-btn">Configure</button>
              </div>
            ))}
          </div>
        </div>

        {/* Locator engine */}
        <div className="settings-card">
          <h2 className="settings-card__title">Locator Engine</h2>
          <div className="settings-form">
            <div className="form-group">
              <label className="form-label">Default Strategy</label>
              <select className="form-select">
                <option>test-id</option>
                <option>aria-label</option>
                <option>css</option>
                <option>xpath</option>
                <option>semantic</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Min Confidence Threshold</label>
              <input className="form-input" type="number" defaultValue="0.7" min="0" max="1" step="0.05" />
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn btn--primary">Save Changes</button>
        <button className="btn btn--ghost">Reset to Defaults</button>
      </div>
    </div>
  );
}

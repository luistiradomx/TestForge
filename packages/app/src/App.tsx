import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Runs } from './pages/Runs';
import { RunDetail } from './pages/RunDetail';
import { Suites } from './pages/Suites';
import { AIAssistant } from './pages/AIAssistant';
import { Settings } from './pages/Settings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          <Routes>
            <Route path="/"          element={<Dashboard />} />
            <Route path="/projects"  element={<Projects />} />
            <Route path="/runs"      element={<Runs />} />
            <Route path="/runs/:runId" element={<RunDetail />} />
            <Route path="/suites"    element={<Suites />} />
            <Route path="/ai"        element={<AIAssistant />} />
            <Route path="/settings"  element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

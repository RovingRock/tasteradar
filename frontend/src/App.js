import React, { useState } from 'react';
import Dashboard from './Dashboard';
import InnovationLab from './InnovationLab';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="App">
      {/* Tabs */}
      <div style={{ background: 'white', borderBottom: '2px solid #e5e7eb', padding: '0 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '0' }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '16px 24px',
              background: activeTab === 'dashboard' ? '#eff6ff' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'dashboard' ? '3px solid #2563eb' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              color: activeTab === 'dashboard' ? '#2563eb' : '#6b7280'
            }}
          >
            📊 Market Overview
          </button>
          <button
            onClick={() => setActiveTab('innovation')}
            style={{
              padding: '16px 24px',
              background: activeTab === 'innovation' ? '#eff6ff' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'innovation' ? '3px solid #2563eb' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              color: activeTab === 'innovation' ? '#2563eb' : '#6b7280'
            }}
          >
            💡 Innovation Lab
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && <Dashboard onLogout={() => {}} />}
      {activeTab === 'innovation' && <InnovationLab />}
    </div>
  );
}

export default App;

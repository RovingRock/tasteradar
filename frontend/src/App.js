import React from 'react';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  // Skip login entirely - go straight to dashboard
  return (
    <div className="App">
      <Dashboard onLogout={() => {}} />
    </div>
  );
}

export default App;
